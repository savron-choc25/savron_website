export function getOptimizedImageUrl(
  url: string,
  options?: { width?: number; height?: number; fit?: 'cover' | 'contain' }
) {
  if (!url?.includes('res.cloudinary.com') || url.includes('/video/upload/')) {
    return url
  }

  const width = options?.width ?? 800
  const height = options?.height ?? 800
  const crop = options?.fit === 'cover' ? 'c_fill' : 'c_limit'

  return url.replace(
    '/upload/',
    `/upload/${crop},w_${width},h_${height},q_auto:good,f_auto/`
  )
}
