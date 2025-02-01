import payload, { CollectionConfig, FieldHook, PayloadRequest } from "payload";
// import commerceKit from "commerce-kit/stripe";
// import * as Commerce from "commerce-kit";
// import { formatMoney } from "commerce-kit/currencies";
import Stripe from "stripe";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-/]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string") {
      return format(value);
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }

    return value;
  };

// Initialize Stripe client using commerce-kit
// const stripe = commerceKit({ apiKey: process.env.STRIPE_SECRET_KEY });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const Product: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "descriptionPara1",
      label: "Description Paragraph 1",
      type: "textarea",
      required: true,
    },
    {
      name: "descriptionPara2",
      label: "Description Paragraph 2",
      type: "textarea",
    },
    {
      name: "descriptionPara3",
      label: "Description Paragraph 3",
      type: "textarea",
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        "tshirt",
        "poster",
        "hoodie",
        "mug",
        "sticker",
        "phone-case",
        "hat",
        "bag",
        "inner",
      ],
      required: true,
    },
    {
      name: "images",
      label: "Images",
      type: "array",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "sizes",
      label: "Sizes",
      type: "select",
      hasMany: true,
      options: ["XS", "S", "M", "L", "XL", "XXL", "5x7", "A2", "A1"],
    },
    {
      name: "colors",
      label: "Colors",
      type: "select",
      hasMany: true,
      options: [
        "White",
        "Black",
        "Blue",
        "Brown",
        "Green",
        "Purple",
        "Navy",
        "Red",
        "Teal",
        "Maroon",
      ],
    },
    {
      name: "highlights",
      label: "Highlights",
      type: "array",
      fields: [
        {
          name: "highlight",
          label: "Highlight",
          type: "text",
        },
      ],
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: { beforeValidate: [formatSlug("name")] },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "stripeProductId",
      label: "Stripe Product ID",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === "create") {
          try {
            // Extract the first image's Cloudinary URL
            const images = data.images || [];
            let firstImageUrl = "";

            if (images.length > 0) {
              // Fetch the image details from the media collection
              const firstImage = await req.payload.findByID({
                collection: "media",
                id: images[0].image, // Assuming `image` stores the ID
              });

              if (firstImage && firstImage.cloudinaryUrl) {
                firstImageUrl = firstImage.cloudinaryUrl;
              }
            }

            // Create a product in Stripe
            const stripeProduct = await stripe.products.create({
              name: data.name,
              description: data.descriptionPara1,
              metadata: {
                category: data.category,
                slug: data.slug,
              },
              images: firstImageUrl ? [firstImageUrl] : [], // Set the first image if available
              default_price_data: {
                currency: "usd",
                unit_amount: data.price * 100, // Convert to cents
              },
            });

            // Attach the Stripe product ID to the Payload product
            data.stripeProductId = stripeProduct.id;

            console.log(`Stripe product created with ID: ${stripeProduct.id}`);
          } catch (error) {
            console.error("Error creating Stripe product:", error);
            throw new Error("Failed to create product in Stripe.");
          }
        }
      },
    ],
    afterRead: [
      async ({ doc, req }) => {
        try {
          // Use a flag to prevent infinite loop
          if (doc.reviewsFetched) {
            return doc; // If reviews are already fetched, skip processing
          }

          console.log("Fetching reviews for product:", doc.id);

          // Fetch reviews with minimal depth to avoid circular references
          const reviews = await req.payload.find({
            collection: "reviews",
            where: {
              product: {
                equals: doc.id, // Match the product ID
              },
            },
            depth: 0, // Limit depth to prevent nested product data
          });

          // Attach reviews and add a flag
          doc.reviews = reviews.docs || [];
          doc.reviewsFetched = true; // Add a flag to prevent recursion

          return doc;
        } catch (error) {
          console.error("Error in afterRead hook:", error);
          doc.reviews = []; // Ensure the product loads even if review fetching fails
          return doc;
        }
      },
    ],
  },
  endpoints: [
    {
      path: "/related-products",
      method: "get",
      handler: async (req: PayloadRequest) => {
        try {
          if (!req.url) {
            return new Response(
              JSON.stringify({ error: "Request URL is missing" }),
              {
                status: 400,
              }
            );
          }
          const url = new URL(req.url);
          const productId = url.searchParams.get("productId");
          console.log("PRODUCT ID: ", productId);
          console.log("Finding product with ID:", productId);
          if (!productId) {
            return new Response(
              JSON.stringify({ error: "Product ID is required" }),
              {
                status: 400,
              }
            );
          }
          const product = await payload.findByID({
            collection: "products",
            id: productId,
          });
          console.log("Product found:", product);

          if (!productId) {
            return new Response(
              JSON.stringify({ error: "Product ID is required" }),
              {
                status: 400,
              }
            );
          }

          // Fetch the current product
          const currentProduct = await payload.findByID({
            collection: "products",
            id: productId,
          });

          if (!currentProduct) {
            return new Response(
              JSON.stringify({ error: "Product not found" }),
              { status: 404 }
            );
          }

          // Fetch related products based on category or tags
          const relatedProducts = await payload.find({
            collection: "products",
            where: {
              id: { not_equals: productId }, // Exclude the current product
              or: [
                { category: { equals: currentProduct.category } },
                {
                  tags: {
                    contains: currentProduct.tags || [],
                  },
                },
              ],
            },
            limit: 5, // Limit the number of related products
          });

          return new Response(JSON.stringify(relatedProducts), { status: 200 });
        } catch (error) {
          console.log(error);
          return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
          });
        }
      },
    },
  ],
};
