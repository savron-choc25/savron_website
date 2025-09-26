import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadImageToCloudinary(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER || 'products',
          resource_type: file.type.startsWith('video/') ? 'video' : 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result!.secure_url)
          }
        }
      ).end(buffer)
    })
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}
