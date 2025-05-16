import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

// Icon style sets
const iconSets = [
  { id: 'flat', name: 'Flat', description: 'Simple flat design icons' },
  { id: 'colored', name: 'Colored', description: 'Vibrant colored icons' },
  { id: 'monochrome', name: 'Monochrome', description: 'Clean black & white icons' },
  { id: 'outlined', name: 'Outlined', description: 'Minimalist outline style' },
  { id: 'rounded', name: 'Rounded', description: 'Soft rounded corners' },
  { id: 'square', name: 'Square', description: 'Sharp square style' },
  { id: 'gradient', name: 'Gradient', description: 'Modern gradient effect' },
  { id: '3d', name: '3D', description: 'Dimensional look and feel' }
];

// Animation options
const animationOptions = [
  { id: 'none', name: 'None', description: 'No animation' },
  { id: 'pulse', name: 'Pulse', description: 'Gentle pulsing effect' },
  { id: 'bounce', name: 'Bounce', description: 'Bouncing animation' },
  { id: 'fade', name: 'Fade', description: 'Fade in/out effect' },
  { id: 'spin', name: 'Spin', description: 'Rotating animation' },
  { id: 'flip', name: 'Flip', description: 'Flipping effect' },
  { id: 'shake', name: 'Shake', description: 'Shaking motion' },
  { id: 'tada', name: 'Tada', description: 'Attention-grabbing effect' }
];

const IconSelector = ({ 
  selectedIconStyle, 
  onSelectIconStyle, 
  selectedAnimation,
  onSelectAnimation,
  iconColor,
  onColorChange,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('style');
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Customize Icons</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
                activeTab === 'style'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('style')}
            >
              Icon Style
            </button>
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
                activeTab === 'color'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('color')}
            >
              Color
            </button>
          </nav>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-170px)]">
          {/* Icon Style Selection */}
          {activeTab === 'style' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {iconSets.map((style) => (
                <div
                  key={style.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedIconStyle === style.id
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onSelectIconStyle(style.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{style.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                    </div>
                    {selectedIconStyle === style.id && (
                      <CheckIcon className="h-5 w-5 text-teal-600" />
                    )}
                  </div>
                  
                  {/* Icon style preview */}
                  <div className="mt-3 flex justify-center space-x-2">
                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Icon</span>
                    </div>
                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Icon</span>
                    </div>
                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Icon</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Animation Selection */}
          {activeTab === 'animation' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {animationOptions.map((animation) => (
                <div
                  key={animation.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedAnimation === animation.id
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onSelectAnimation(animation.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{animation.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{animation.description}</p>
                    </div>
                    {selectedAnimation === animation.id && (
                      <CheckIcon className="h-5 w-5 text-teal-600" />
                    )}
                  </div>
                  
                  {/* Animation preview */}
                  <div className="mt-3 flex justify-center">
                    <div className={`h-10 w-10 bg-teal-500 rounded-md flex items-center justify-center text-white ${
                      animation.id !== 'none' ? `animate__animated animate__${animation.id} animate__infinite` : ''
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Color Selection */}
          {activeTab === 'color' && (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Icon Color</h3>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="h-10 w-10 rounded-md border-gray-300 mr-3"
                  />
                  <input
                    type="text"
                    value={iconColor}
                    onChange={(e) => onColorChange(e.target.value)}
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
                      onClick={() => onColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                <div className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-center space-x-4">
                    {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((platform) => (
                      <div 
                        key={platform} 
                        className={`flex items-center justify-center h-10 w-10 rounded-md ${
                          selectedAnimation !== 'none' ? `animate__animated animate__${selectedAnimation} animate__infinite` : ''
                        }`}
                        style={{ backgroundColor: iconColor }}
                      >
                        <span className="text-white text-xs">{platform.charAt(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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

export default IconSelector;
