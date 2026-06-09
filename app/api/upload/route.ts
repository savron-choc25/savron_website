import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      )
    }

    // Images up to 20MB accepted (auto-compressed to max 2000x2000 on upload)
    const maxImageSize = 20 * 1024 * 1024 // 20MB
    const maxVideoSize = 10 * 1024 * 1024 // 10MB
    const maxSize = file.type.startsWith('video/') ? maxVideoSize : maxImageSize
    const isImage = file.type.startsWith('image/')
    
    if (file.size > maxSize) {
      const sizeLimit = isImage ? '20MB' : '10MB'
      return NextResponse.json(
        { error: `File too large. Maximum size is ${sizeLimit}.` },
        { status: 400 }
      )
    }

    const imageUrl = await uploadImageToCloudinary(file)
    
    return NextResponse.json(
      { 
        message: 'File uploaded successfully',
        imageUrl,
        fileType: file.type.startsWith('video/') ? 'video' : 'image'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
