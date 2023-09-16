import cloudinary, { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadImage = async (image) => {  
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result:UploadApiResponse = await cloudinary.v2.uploader.upload(image.path, options);
    return result.url;
  } catch (error) {
    console.error(error, 'in pic upload err');
    return error
  }
};