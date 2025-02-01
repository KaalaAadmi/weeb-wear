// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Product } from "./collections/Product";
import { Reviews } from "./collections/Review";
import { Newsletter } from "./collections/Newsletter";
import { Cart } from "./collections/Cart";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [Users, Media, Product, Reviews, Newsletter, Cart],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
    connectOptions: {
      dbName: process.env.DATABASE_NAME || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: process.env.ADMIN_USER || "",
      password: process.env.ADMIN_PASSWORD || "",
      prefillOnly: true,
    },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: process.env.ADMIN_USER || "",
          password: process.env.ADMIN_PASSWORD || "",
          role: "admin",
          name: process.env.ADMIN_NAME || "",
        },
      });
    }
  },
});
