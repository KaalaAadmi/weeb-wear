"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
// import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { ProductType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { colors, PRODUCT_CATEGORIES, subCategories } from "@/config";
import { cn } from "@/lib/utils";

type ImageType = {
  key: string;
  url: string;
};
const EditProduct = () => {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [images, setImages] = useState<ImageType[] | undefined>(
    product?.imageUrls
  );
  const [files, setFiles] = useState<File[]>([]);
  //   const { toast } = useToast();
  const router = useRouter();
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpen();
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/${params.slug}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log("data", data);
      if (response.ok) {
        setProduct(data);
        setImages(data.imageUrls);
      }
    };
    fetchProduct();
  }, []);
  console.log(typeof product?.colors);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    // console.log(files);
  };
  console.log("Images: ", images);
  console.log("Product: ", product);
  const description = product
    ? product.descriptionPara1 +
      "\n\n" +
      product.descriptionPara2 +
      "\n\n" +
      product.descriptionPara3 +
      "\n\n"
    : null;
  const highlights = product
    ? product.highlights.map((highlight) => highlight).join("\n\n")
    : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<{
    name: string;
    description: string;
    price: number;
    imageUrls: { key: string; url: string }[];
    highlights: string;
    category: string;
    featured: boolean;
    colors: string[];
  }>();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", description || "");
      setValue("price", product.price);
      setValue("imageUrls", product.imageUrls);
      setValue("highlights", highlights || "");
      setValue("category", product.category);
      setValue("featured", product.featured ?? false);
      setValue("colors", Object.values(product.colors) || []);
    }
  }, [product, setValue]);

  const onSubmit = async (data: {
    name: string | Blob;
    description: string | Blob;
    price: string | number | Blob;
    imageUrls: { key: string; url: string }[];
    highlights: string | Blob;
    featured: boolean;
    category: string;
  }) => {
    const formData = new FormData();

    // Append product fields to formData
    if (product?._id) {
      formData.append("productId", product._id); // Ensure the product ID is passed
    }

    const updates = [];
    // Check if each field has been changed and append to formData and updates array
    if (product && data.name !== product.name) {
      formData.append("name", data.name);
      updates.push(`Name: ${data.name}`);
    }
    const dataDescription =
      typeof data.description === "string"
        ? data.description.split("\n\n")
        : [];
    if (product && dataDescription[0] !== product.descriptionPara1) {
      formData.append("descriptionPara1", dataDescription[0]);
      updates.push(`DescriptionPara1: ${dataDescription[0]}`);
    }
    if (product && dataDescription[1] !== product.descriptionPara2) {
      formData.append("descriptionPara2", dataDescription[1]);
      updates.push(`DescriptionPara2: ${dataDescription[1]}`);
    }
    if (product && dataDescription[2] !== product.descriptionPara3) {
      formData.append("descriptionPara3", dataDescription[2]);
      updates.push(`DescriptionPara3: ${dataDescription[2]}`);
    }
    // if (product && data.description !== description) {
    //       formData.append("description", data.description);
    //       updates.push(`Description: ${data.description}`);
    //     }
    // TODO: FIX THIS -> CHECK THE TYPE FIRST AND THEN FIX
    const dataHighlights =
      typeof data.highlights === "string" ? data.highlights.split("\n\n") : [];
    if (product && dataHighlights !== product.highlights) {
      dataHighlights.forEach((highlight) => {
        formData.append("highlights", highlight);
      });
      updates.push(`Highlights: ${dataHighlights}`);
    }
    // formData.append("highlights", dataHighlights);
    // updates.push(`Highlights: ${dataHighlights}`);
    // }
    if (product && data.price !== product.price) {
      formData.append("price", data.price.toString());
      updates.push(`Price: $${data.price}`);
    }

    // Append new image files if any
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("image", file);
        updates.push(`Image(s) uploaded`); // Indicate new images uploaded
      });
    }
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("price", data.price);

    // // Append new image files if any
    // if (files && files.length > 0) {
    //   files.forEach((file) => {
    //     formData.append("image", file);
    //   });
    // }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    formData.append("category", data.category);
    formData.append("featured", data.featured.toString());

    try {
      // Send PUT request to update product
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/update`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Product updated successfully:", result);
        // Update the images state with the new URLs
        if (result.product && result.product.imageUrls) {
          setImages(result.product.imageUrls);
        }
        // Create a detailed description for the toast message
        const updateDescription =
          updates.length > 0 ? updates.join(", ") : "No changes made.";
        toast.success("Product updated successfully", {
          description: updateDescription,
        });
      } else {
        console.error("Error updating product:", result.message);
        toast.error("Error updating product", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteImage = async (imageAssetId: string, productId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/remove-image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageAssetId, productId }),
        }
      );

      const dataResponse = await response.json();
      if (response.ok) {
        console.log(dataResponse); // Success message

        // Instead of setting images from the response, filter out the deleted image from the current images
        const updatedImages = images?.filter(
          (image) => image.key !== imageAssetId
        );
        setImages(updatedImages); // Update the state without re-adding

        // Optionally reset files after successful submission
        setFiles([]);
        toast.success("Image deleted successfully", {
          description: "Image deleted successfully",
        });
      } else {
        console.error(dataResponse.message); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="form">
      {" "}
      {/* Container */}{" "}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {" "}
        {/* Component{" "} */}
        <h2 className="text-3xl font-bold md:text-5xl">Edit Product</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam,purus sit amet luctus magna fringilla urna{" "}
        </p>{" "}
        {/* Form */}{" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          // name="wf-form-name"
          method="post"
          className="mx-auto mb-4 text-left sm:px-4 md:px-20"
        >
          <div className="mb-4">
            <label htmlFor="name" className="mb-1 font-medium">
              {" "}
              Product Name{" "}
            </label>
            <input
              id="name"
              // value={product.name}
              placeholder="Product Name"
              {...register("name", { required: "Product name is required" })}
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="desc" className="mb-1 font-medium">
              {" "}
              Description{" "}
            </label>
            <textarea
              // value={product.description}
              id="desc"
              placeholder="Description"
              maxLength={3000}
              className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              {...register("description", {
                validate: {
                  pattern: (value) => !/[!]/.test(value),
                },
              })}
            />
          </div>
          <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="high" className="mb-1 font-medium">
              {" "}
              Highlights{" "}
            </label>
            <textarea
              // value={product.description}
              id="high"
              placeholder="Highlights"
              maxLength={3000}
              className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              {...register("highlights", {
                validate: {
                  pattern: (value) => !/[!]/.test(value),
                },
              })}
            />
          </div>
          {/* <div>
            <label htmlFor="price" className="mb-1 font-medium">
              {" "}
              Price{" "}
            </label>
            <input
              id="price"
              // value={product.price}
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              required={true}
            />
          </div> */}
          <div className="flex items-center justify-between gap-2">
            <div className="mb-4 flex-1">
              <label htmlFor="price" className="mb-4 font-medium">
                {" "}
                Price{" "}
              </label>
              <input
                id="price"
                placeholder="Price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                type="number"
                className={cn(
                  "block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black",
                  { "border-red-500": errors.price }
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-xs ml-0.5 font-medium">
                  {errors.price.message as string}
                </p>
              )}
            </div>
            <div className="mb-4 flex-1">
              <label htmlFor="category" className="mb-4 font-medium">
                {" "}
                Category{" "}
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={cn(
                  "block h-12 w-full rounded-md border border-solid border-black px-3 py-2 my-1 text-sm text-black",
                  { "border-red-500": errors.category }
                )}
              >
                {subCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.value}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs ml-0.5 font-medium">
                  {errors.category.message as string}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col items-center justify-center flex-2">
              <label htmlFor="featured" className="mb-4 font-medium">
                {" "}
                Featured{" "}
              </label>
              <input
                type="checkbox"
                defaultChecked={false}
                // onChange={}
                {...register("featured")}
                className="w-6 h-6"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col items-center justify-center flex-2">
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("colors", { required: "Colors are required" })}
                  value={field.value || []}
                  items={colors}
                  placeholder="Select Colors"
                  scrollShadowProps={{
                    isEnabled: true,
                  }}
                  selectionMode="multiple"
                  errorMessage={errors.colors?.message}
                  fullWidth={true}
                  isRequired={true}
                  disableAnimation={false}
                  // className={"aspect-1"}
                  className={
                    "flex justify-between items-center border border-black border-solid rounded-md"
                  }
                  popoverProps={{
                    className:
                      "bg-white rounded-md shadow-md border-black border border-solid",
                  }}
                >
                  {(colors) => (
                    <SelectItem key={colors.name}>{colors.name}</SelectItem>
                  )}
                </Select>
              )}
              name={"colors"}
              control={control}
              rules={{ required: "Colors are required" }}
            />

            {errors.colors && (
              <p className="text-red-500 text-xs ml-0.5 font-medium">
                {errors.colors.message as string}
              </p>
            )}
          </div>
          <div className="my-6 w-full mx-auto h-4/6 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2">
              {images?.map((image, idx) => (
                <div key={idx} className="relative h-40 sm:h-60 lg:h-80 group">
                  {/* <p>{image.url}</p> */}
                  <Image
                    src={image.url}
                    alt=""
                    className="rounded-lg object-cover aspect-square"
                    fill // Use fill to make the image fill the container
                  />
                  {/* Overlay when hovered */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg group-hover:opacity-40 transition-opacity"></div>
                  {/* "Change" text visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="link"
                      className="w-full"
                      onClick={() =>
                        product?._id &&
                        handleDeleteImage(image.key, product._id)
                      }
                    >
                      <Trash className="h-14 w-14 aspect-square text-white" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center pt-6">
              <Button
                className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
                onClick={handleOpenModal}
              >
                Add Images
              </Button>
            </div>
            <Modal
              placement="center"
              backdrop="blur"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              className="aspect-square bg-white shadow-lg w-1/2 rounded-lg"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Upload Images
                    </ModalHeader>
                    <ModalBody>
                      <div className="relative w-full mt-10 max-w-xl mx-auto">
                        <FileUpload
                          files={files}
                          setFiles={setFiles}
                          onChange={handleFileUpload}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="destructive" onClick={onClose}>
                        Close
                      </Button>
                      {/* TODO: add onclick and make api call to upload image and get secure_url(s) to add in mongodb */}
                      {/* <Button color="primary">Upload</Button> */}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          {/* <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5"></div> */}
          <div className="flex w-full gap-2">
            <Button
              variant="destructive"
              className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
              // onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              // variant="outline"
              className=" w-full rounded-md flex items-center cursor-pointer bg-black px-6 py-6 text-center font-semibold text-white"
              // onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
