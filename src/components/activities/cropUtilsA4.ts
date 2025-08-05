// src/components/activities/cropUtilsA4.ts
/**
 * Utilitaire de génération du crop réel (base64)
 * Inspiré de l’exemple officiel react-easy-crop
 */
export default async function getCroppedImg(imageSrc: string, crop: any): Promise<string | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  ctx.drawImage(
    image,
    crop.x, crop.y, crop.width, crop.height, // source
    0, 0, crop.width, crop.height // destination
  )
  return canvas.toDataURL('image/jpeg')
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // pour CORS
    image.src = url
  })
}
