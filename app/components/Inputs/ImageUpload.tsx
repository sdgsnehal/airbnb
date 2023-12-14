'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image"
import { useCallback } from 'react';
import {TbPhotoPlus} from "react-icons/tb"
declare global{
  var cloudinary:any;
}
interface ImaageUploadProps{
  onChange:(value:string)=>void;
  value:string
}
const ImageUpload:React.FC<ImaageUploadProps> = ({onChange,value}) => {
  const handleUpload = useCallback((result:any)=>{
    onChange(result.info.secure_url)
  },[])

  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload