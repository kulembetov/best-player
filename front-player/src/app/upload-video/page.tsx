"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "@/app/upload-video/types";

export default function UploadVideoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("video", data.video[0]);

    try {
      const response = await fetch("http://localhost:4200/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Video uploaded successfully");
        router.push("/upload-video");
      } else {
        console.error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-gray-800 shadow rounded-xl"
    >
      <div className="flex flex-col gap-3 text-center">
        {errors.video && (
          <span className="text-red-500">{errors.video.message}</span>
        )}
        <label className="flex items-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-3xl hoverSecondary w-fit mx-auto">
          {isLoading ? "Uploading..." : "Choose File"}
          <input
            type="file"
            accept="video/*"
            {...register("video", {
              required: "Please select a video",
            })}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-4 py-2 w-fit bg-primary rounded-3xl hoverSecondary mx-auto"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
}
