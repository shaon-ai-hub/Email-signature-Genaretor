import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions to match the desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the image with the crop coordinates
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return the cropped image as a data URL
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

const ImageCropper = ({ image, onCropComplete, onCancel, type }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Default aspect ratio based on type
  const getAspectRatio = () => {
    switch(type) {
      case 'headshot':
        return 1; // 1:1 for headshot
      case 'logo':
        return 16/9; // 16:9 for logo
      default:
        return 1;
    }
  };
  
  const [aspectRatio, setAspectRatio] = useState(getAspectRatio());

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const onAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const onCropCompleteHandler = useCallback(
    async (_, croppedPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const saveCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Crop {type === 'headshot' ? 'Headshot' : 'Logo'}</h2>
        </div>
        
        <div className="p-4">
          <div className="relative h-96 overflow-hidden rounded-lg">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropCompleteHandler}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Zoom</label>
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={onZoomChange}
            />
          </div>
          
          {type === 'logo' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md ${aspectRatio === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => onAspectRatioChange(1)}
                >
                  1:1
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${aspectRatio === 16/9 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => onAspectRatioChange(16/9)}
                >
                  16:9
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${aspectRatio === 4/3 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => onAspectRatioChange(4/3)}
                >
                  4:3
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${aspectRatio === 3/2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => onAspectRatioChange(3/2)}
                >
                  3:2
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            onClick={saveCroppedImage}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
