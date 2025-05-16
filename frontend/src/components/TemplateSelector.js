import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const templates = [
  // Professional Templates
  { id: "classic", name: "Classic", category: "Professional", description: "Traditional horizontal layout" },
  { id: "modern", name: "Modern", category: "Professional", description: "Clean, minimalist design" },
  { id: "compact", name: "Compact", category: "Professional", description: "Space-efficient layout" },
  { id: "bold", name: "Bold", category: "Professional", description: "Eye-catching design with emphasis" },
  { id: "executive", name: "Executive", category: "Professional", description: "Elegant design for executives" },
  { id: "minimal", name: "Minimal", category: "Professional", description: "Ultra-clean with essential info only" },
  
  // Creative Templates
  { id: "creative1", name: "Creative I", category: "Creative", description: "Bold colors and modern layout" },
  { id: "creative2", name: "Creative II", category: "Creative", description: "Unique layout with accent colors" },
  { id: "artistic", name: "Artistic", category: "Creative", description: "Stylish with creative elements" },
  { id: "colorful", name: "Colorful", category: "Creative", description: "Vibrant colors and playful design" },
  { id: "geometric", name: "Geometric", category: "Creative", description: "Modern with geometric elements" },
  
  // Business Templates
  { id: "corporate", name: "Corporate", category: "Business", description: "Professional corporate style" },
  { id: "business", name: "Business", category: "Business", description: "Clean business-focused layout" },
  { id: "professional", name: "Professional", category: "Business", description: "Polished professional look" },
  { id: "enterprise", name: "Enterprise", category: "Business", description: "Robust layout for enterprises" },
  
  // Simple Templates
  { id: "simple1", name: "Simple I", category: "Simple", description: "Clean, basic layout" },
  { id: "simple2", name: "Simple II", category: "Simple", description: "Straightforward and minimal" },
  { id: "basic", name: "Basic", category: "Simple", description: "Just the essentials" },
  
  // Specialized Templates
  { id: "academic", name: "Academic", category: "Specialized", description: "Perfect for educators and researchers" },
  { id: "legal", name: "Legal", category: "Specialized", description: "Formal layout for legal professionals" },
  { id: "medical", name: "Medical", category: "Specialized", description: "Clean design for healthcare" },
  { id: "tech", name: "Tech", category: "Specialized", description: "Modern look for tech professionals" },
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate, onClose }) => {
  // Group templates by category
  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Select Template</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-3">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500 ring-opacity-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{template.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <CheckIcon className="h-5 w-5 text-teal-600" />
                      )}
                    </div>
                    
                    {/* Placeholder for template preview image */}
                    <div className="mt-3 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            onClick={onClose}
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
