import axios from "axios";
import { API_URL } from "./config";

/****************************************/
/*** Upload Image to AWS S3  *************/
/****************************************/

export interface UploadImageAWSProps {
  image: any;
}

export const uploadImageAWS = async (props: UploadImageAWSProps) => {
  const res = await axios.post(API_URL + "/upload-image", { ...props });
  return res;
};

/****************************************/
/*****        Upload Image  ************/
/****************************************/

export interface UploadImageProps {
  original_image: string;
}

export const uploadImage = async (props: UploadImageProps) => {
  const res = await axios.post(API_URL + "/save-original-uploaded-image", { ...props });
  return res;
};

export const getAllUploadedImage = async () => {
  const res = await axios.get(API_URL + "/get-all-uploaded-image");
  return res;
};

export const deleteUploadedImage = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-uploaded-image/" + id);
  return res;
};

/****************************************/
/*****        Thumbnail      ************/
/****************************************/

export interface ReduceImageSizeProps {
  url: string;
}

export const reduceImageSize = async (props: ReduceImageSizeProps) => {
  const res = await axios.post(API_URL + "/reduce-image-size", { ...props });
  return res;
};

export interface CreateThumbnailProps {
  thumbnail: string;
}

export const createThumbnail = async (props: CreateThumbnailProps) => {
  const res = await axios.post(API_URL + "/create-thumbnail", { ...props });
  return res;
};

export const getAllThumbnails = async () => {
  const res = await axios.get(API_URL + "/get-allThumbnails");
  return res;
};

export const deleteThumbnail = async (id: string) => {
  const res = await axios.delete(API_URL + "/delete-thumbnail/" + id);
  return res;
};
