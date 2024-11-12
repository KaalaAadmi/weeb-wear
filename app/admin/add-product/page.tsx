"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { colors, sizes, subCategories } from "@/config";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";

import makeAnimated from "react-select/animated";

const AddProductForm = () => {
  const animatedComponents = makeAnimated();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  // const options =
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<FormData>({ mode: "onTouched" });

  // console.log(watch("featured"));

  interface FormData {
    name: string;
    description: string;
    highlights: string;
    price: number;
    category: string;
    featured?: boolean;
    colors: string[];
    sizes: string[];
  }

  interface ApiResponse {
    message: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      // Append form data fields to FormData object
      formData.append("name", data.name);
      const desc = data.description.split("\n\n");
      desc.forEach((d, idx) => {
        formData.append(`descriptionPara${idx + 1}`, d);
      });
      const dataHighlights = data.highlights.split("\n\n");
      dataHighlights.forEach((highlight) => {
        if (highlight.trim() !== "") {
          formData.append("highlight", highlight);
        }
      });

      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("featured", data.featured ? "true" : "false");

      files.forEach((file) => {
        formData.append("image", file);
      });

      formData.append("colors", JSON.stringify(data.colors));
      console.log(typeof data.sizes);
      // Check if sizes is an array before using forEach
      const sizes = Array.isArray(data.sizes) ? data.sizes : [data.sizes];
      formData.append("sizes", JSON.stringify(sizes));

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result: ApiResponse = await response.json();
        toast.success("Product added successfully", { description: "success" });
        console.log("Product added successfully");
        console.log(result);
        router.push("/admin/products");
      } else {
        const error: ApiResponse = await response.json();
        console.log("Error adding product: ", error.message);
        toast.error("Error adding product", { description: "error" });
      }
    } catch (error) {
      console.log("Error adding product: ", error);
      toast.error("Error adding product", { description: "error" });
    }
  };

  // const watch = (field: keyof FormData) => {
  //     return control._formValues[field];
  // };
  // @ts-ignore
  return (
    <section id="form">
      {" "}
      {/* Container */}{" "}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {" "}
        {/* Component{" "} */}
        <h2 className="text-3xl font-bold md:text-5xl">Add Product</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam,purus sit amet luctus magna fringilla urna{" "}
        </p>{" "}
        {/* <div className="flex justify-end">
          <Button onClick={() => setActive(<ProductList />)}></Button>
        </div> */}
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
              placeholder="Product Name"
              {...register("name", { required: "Product name is required" })}
              type="text"
              className={cn(
                "block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black",
                {
                  "border-red-500": errors.name,
                }
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-xs ml-0.5 font-medium">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="desc" className="mb-1 font-medium">
              {" "}
              Description{" "}
            </label>
            <textarea
              id="desc"
              placeholder="Description"
              maxLength={10000}
              className={cn(
                "block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black",
                { "border-red-500": errors?.description }
              )}
              {...register("description", {
                // validate: {
                //   pattern: (value) => !/[!]/.test(value),
                // },
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs ml-0.5 font-medium">
                {errors.description.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 flex-1">
            <label htmlFor="high" className="mb-1 font-medium">
              {" "}
              Highlights{" "}
            </label>
            <textarea
              id="high"
              placeholder="Highlights"
              maxLength={3000}
              className={cn(
                "block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black",
                { "border-red-500": errors.highlights }
              )}
              {...register("highlights", {
                validate: {
                  pattern: (value) => !/!/.test(value),
                },
                required: "Highlights is required",
              })}
            />
            {errors.highlights && (
              <p className="text-red-500 text-xs ml-0.5 font-medium">
                {errors.highlights.message as string}
              </p>
            )}
          </div>
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
                // value={PRODUCT_CATEGORIES[0].value}

                {...register("category", { required: "Category is required" })}
                className={cn(
                  "h-12 w-full rounded-md border border-solid border-black px-3 py-2 my-1 text-md text-black",
                  { "border-red-500": errors.category }
                )}
              >
                {subCategories.map((category, idx) => (
                  <option key={idx} value={category.value}>
                    {category.name}
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
          {watch("category") !== "poster" && (
            <div className="mb-4 flex flex-col items-center justify-center flex-2">
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    {...register("colors", { required: "Colors are required" })}
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
          )}
          <div className="mb-4 flex flex-col items-center justify-center flex-2">
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("sizes", { required: "Sizes are required" })}
                  items={sizes}
                  placeholder="Select sizes"
                  scrollShadowProps={{
                    isEnabled: true,
                  }}
                  selectionMode="multiple"
                  errorMessage={errors.sizes?.message}
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
                  {(item) => (
                    <SelectItem key={item.name}>{item.value}</SelectItem>
                  )}
                </Select>
              )}
              name={"sizes"}
              control={control}
              rules={{ required: "Sizes are required" }}
            />

            {errors.colors && (
              <p className="text-red-500 text-xs ml-0.5 font-medium">
                {errors.sizes?.message as string}
              </p>
            )}
          </div>
          <div className="-z-10 my-6 w-full mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload
              files={files}
              setFiles={setFiles}
              onChange={handleFileUpload}
            />
            {files.length === 0 && (
              <p className="text-xs text-red-500 ml-0.5 font-medium">
                At least one product image is required
              </p>
            )}
          </div>

          {/* <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5"></div> */}
          <div className="flex w-full gap-2">
            {/* <Button
              variant="destructive"
              className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
              // onClick={onCancel}
            >
              Cancel
            </Button> */}
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

export default AddProductForm;
