"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
declare global {
  var cloudinary: any;
}
interface ImaageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImageUpload: React.FC<ImaageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="mhsbjbct"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
          relative
          bottom-2
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          gap-4
          border-dashed
          border-neutral-300
          p-20
          text-neutral-600
          transition
          hover:opacity-20"
          >
            <TbPhotoPlus size={50}/>
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {value && (
              <div
              className="absolute inset-0 w-full h-full">
                <Image
                alt="upload"
                fill
                style={{objectFit:'cover'}}
                src={value}/>

              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
