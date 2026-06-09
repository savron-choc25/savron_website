const MAX_DIMENSION = 2000
const MAX_BYTES = 3.5 * 1024 * 1024 // Stay under Vercel's ~4.5MB request limit

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error(`Could not read image: ${file.name}`))
    }

    img.src = url
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality)
  })
}

export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file
  }

  if (file.type === 'image/gif') {
    if (file.size > MAX_BYTES) {
      throw new Error(`${file.name} is too large. GIFs must be under 3.5MB.`)
    }
    return file
  }

  const img = await loadImageElement(file)

  let width = img.naturalWidth
  let height = img.naturalHeight

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error(`Could not process ${file.name}`)
  }

  ctx.drawImage(img, 0, 0, width, height)

  const outputType = file.type === 'image/png' ? 'image/webp' : 'image/jpeg'
  const extension = outputType === 'image/webp' ? '.webp' : '.jpg'
  const baseName = file.name.replace(/\.[^.]+$/, '')

  let quality = 0.88
  let blob: Blob | null = null

  while (quality >= 0.45) {
    blob = await canvasToBlob(canvas, outputType, quality)
    if (blob && blob.size <= MAX_BYTES) {
      break
    }
    quality -= 0.08
  }

  if (!blob || blob.size > MAX_BYTES) {
    throw new Error(
      `${file.name} is too large even after compression. Try a smaller or simpler image.`
    )
  }

  if (blob.size >= file.size && file.size <= MAX_BYTES) {
    return file
  }

  return new File([blob], `${baseName}${extension}`, {
    type: outputType,
    lastModified: Date.now(),
  })
}

export async function prepareFileForUpload(file: File): Promise<File> {
  if (file.type.startsWith('video/')) {
    const maxVideoBytes = 3.5 * 1024 * 1024
    if (file.size > maxVideoBytes) {
      throw new Error(
        `${file.name} is too large for upload. Videos must be under 3.5MB on this server.`
      )
    }
    return file
  }

  return compressImageFile(file)
}
