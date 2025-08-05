// src/components/activities/ImageCropperA4.tsx
/**
 * Composant réutilisable pour recadrage d'image au format A4 (ratio 1:1.414).
 * Utilise react-easy-crop pour permettre à l'utilisateur de zoomer/déplacer son image.
 * Props : 
 * - imageSrc : string (chemin ou base64 de l’image à éditer)
 * - onCropComplete : (croppedImage: string) => void (retourne le base64 du crop)
 */
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

interface ImageCropperA4Props {
  imageSrc: string
  onCropComplete: (croppedImage: string) => void
}

import getCroppedImg from './cropUtilsA4' // utilitaire pour générer le crop (ajouté juste après)

const ImageCropperA4: React.FC<ImageCropperA4Props> = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [showCrop, setShowCrop] = useState(true)

  const onCropChange = (c: any) => setCrop(c)
  const onZoomChange = (z: number) => setZoom(z)

  const onCropAreaComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropValidate = async () => {
    if (!croppedAreaPixels) return
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    onCropComplete(croppedImage as string)
    setShowCrop(false)
  }

  if (!showCrop) return null

  return (
    <div className="relative w-full h-[400px] bg-black">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1.414} // Ratio A4
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropAreaComplete}
        cropShape="rect"
        showGrid={false}
      />
      {/* Contrôles zoom + validation */}
      <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center z-10">
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-2/3"
        />
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded shadow"
          onClick={handleCropValidate}
        >
          Valider le cadrage
        </button>
      </div>
    </div>
  )
}

export default ImageCropperA4
