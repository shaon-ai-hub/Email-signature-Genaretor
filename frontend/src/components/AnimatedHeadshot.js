import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

// Animation options for headshots
const headshotAnimations = [
  { id: 'none', name: 'None', description: 'No animation' },
  { id: 'fade', name: 'Fade In', description: 'Smooth fade in effect' },
  { id: 'bounce', name: 'Bounce', description: 'Subtle bounce animation' },
  { id: 'pulse', name: 'Pulse', description: 'Gentle pulsing effect' },
  { id: 'flip', name: 'Flip', description: 'Circular flip effect' },
  { id: 'roll', name: 'Roll In', description: 'Rolling entrance' },
  { id: 'zoom', name: 'Zoom', description: 'Zooming effect' },
  { id: 'swing', name: 'Swing', description: 'Swinging motion' },
];

// Border style options
const borderStyles = [
  { id: 'none', name: 'None', description: 'No border' },
  { id: 'thin', name: 'Thin', description: 'Simple thin border' },
  { id: 'thick', name: 'Thick', description: 'Bold thick border' },
  { id: 'double', name: 'Double', description: 'Double-line border' },
  { id: 'shadow', name: 'Shadow', description: 'Soft shadow effect' },
  { id: 'glow', name: 'Glow', description: 'Glowing border effect' },
  { id: 'gradient', name: 'Gradient', description: 'Gradient border' },
  { id: 'dashed', name: 'Dashed', description: 'Dashed line border' },
];

// Shape options
const shapeOptions = [
  { id: 'square', name: 'Square', description: 'Regular square shape' },
  { id: 'rounded', name: 'Rounded', description: 'Rounded corners' },
  { id: 'circle', name: 'Circle', description: 'Perfect circle' },
  { id: 'oval', name: 'Oval', description: 'Oval/elliptical shape' },
  { id: 'hexagon', name: 'Hexagon', description: 'Six-sided shape' },
  { id: 'diamond', name: 'Diamond', description: 'Diamond shape' },
];

const AnimatedHeadshot = ({
  headshot,
  animation,
  onSelectAnimation,
  borderStyle,
  onSelectBorderStyle,
  borderColor,
  onBorderColorChange,
  shape,
  onSelectShape,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('animation');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Customize Headshot</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'animation'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('animation')}
            >
              Animation
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'border'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('border')}
            >
              Border
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'shape'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('shape')}
            >
              Shape
            </button>
          </nav>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-170px)]">
          {/* Preview Section */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={headshot}
                alt="Headshot preview"
                className={`
                  h-28 w-28 object-cover 
                  ${shape === 'circle' ? 'rounded-full' : ''} 
                  ${shape === 'rounded' ? 'rounded-xl' : ''} 
                  ${shape === 'hexagon' ? 'clip-path-hexagon' : ''} 
                  ${shape === 'diamond' ? 'clip-path-diamond' : ''} 
                  ${shape === 'oval' ? 'rounded-full h-28 w-36' : ''}
                  ${borderStyle === 'thin' ? `border-2` : ''}
                  ${borderStyle === 'thick' ? `border-4` : ''}
                  ${borderStyle === 'double' ? `border-double border-4` : ''}
                  ${borderStyle === 'shadow' ? `shadow-lg` : ''}
                  ${borderStyle === 'glow' ? `filter drop-shadow-lg` : ''}
                  ${borderStyle === 'dashed' ? `border-2 border-dashed` : ''}
                  ${borderStyle !== 'none' && borderStyle !== 'shadow' && borderStyle !== 'glow' ? `border-[${borderColor}]` : ''}
                  ${animation !== 'none' ? `animate__animated animate__${animation}` : ''}
                `}
                style={{
                  borderColor: borderStyle !== 'none' && borderStyle !== 'shadow' && borderStyle !== 'glow' ? borderColor : undefined,
                  boxShadow: borderStyle === 'glow' ? `0 0 10px ${borderColor}` : undefined,
                }}
              />
            </div>
          </div>

          {/* Animation Selection */}
          {activeTab === 'animation' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {headshotAnimations.map((anim) => (
                <div
                  key={anim.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    animation === anim.id
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onSelectAnimation(anim.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{anim.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{anim.description}</p>
                    </div>
                    {animation === anim.id && <CheckIcon className="h-5 w-5 text-teal-600" />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Border Style Selection */}
          {activeTab === 'border' && (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Border Style</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {borderStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                        borderStyle === style.id
                          ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onSelectBorderStyle(style.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{style.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                        </div>
                        {borderStyle === style.id && <CheckIcon className="h-5 w-5 text-teal-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Border Color</h3>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => onBorderColorChange(e.target.value)}
                    className="h-10 w-10 rounded-md border-gray-300 mr-3"
                  />
                  <input
                    type="text"
                    value={borderColor}
                    onChange={(e) => onBorderColorChange(e.target.value)}
                    className="block rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preset Colors</h3>
                <div className="grid grid-cols-8 gap-2">
                  {[
                    '#000000', '#FFFFFF', '#F44336', '#E91E63', '#9C27B0', '#673AB7',
                    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
                    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
                    '#795548', '#607D8B'
                  ].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border ${color === '#FFFFFF' ? 'border-gray-300' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => onBorderColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shape Selection */}
          {activeTab === 'shape' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {shapeOptions.map((shapeOption) => (
                <div
                  key={shapeOption.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    shape === shapeOption.id
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onSelectShape(shapeOption.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{shapeOption.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{shapeOption.description}</p>
                    </div>
                    {shape === shapeOption.id && <CheckIcon className="h-5 w-5 text-teal-600" />}
                  </div>
                  
                  {/* Shape preview */}
                  <div className="mt-3 flex justify-center">
                    <div 
                      className={`
                        h-12 w-12 bg-gray-200 flex items-center justify-center text-gray-500 text-xs
                        ${shapeOption.id === 'circle' ? 'rounded-full' : ''}
                        ${shapeOption.id === 'rounded' ? 'rounded-xl' : ''}
                        ${shapeOption.id === 'hexagon' ? 'clip-path-hexagon' : ''}
                        ${shapeOption.id === 'diamond' ? 'clip-path-diamond' : ''}
                        ${shapeOption.id === 'oval' ? 'rounded-full h-8 w-12' : ''}
                      `}
                    >
                      Shape
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            onClick={onClose}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeadshot;
