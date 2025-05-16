import { useState, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import {
  DocumentTextIcon,
  PhotoIcon,
  ArrowDownTrayIcon,
  SwatchIcon,
  LinkIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const SignatureGenerator = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Marketing Manager",
    company: "Acme Corporation",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    website: "www.acme.com",
    address: "123 Business Ave, New York, NY 10001"
  });

  // Logo state
  const [logo, setLogo] = useState(null);
  
  // Colors state
  const [colors, setColors] = useState({
    primary: "#0f766e",
    secondary: "#4b5563",
    background: "#ffffff",
    text: "#111827"
  });

  // Social links state
  const [socialLinks, setSocialLinks] = useState([
    { name: "LinkedIn", url: "https://linkedin.com/in/johndoe", active: true },
    { name: "Twitter", url: "https://twitter.com/johndoe", active: true },
    { name: "Facebook", url: "https://facebook.com/johndoe", active: false },
    { name: "Instagram", url: "https://instagram.com/johndoe", active: false }
  ]);

  // Refs
  const signatureRef = useRef(null);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle color changes
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColors({ ...colors, [name]: value });
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear logo
  const handleClearLogo = () => {
    setLogo(null);
  };

  // Toggle social link active state
  const toggleSocialLink = (index) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].active = !updatedLinks[index].active;
    setSocialLinks(updatedLinks);
  };

  // Update social link URL
  const updateSocialLink = (index, url) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].url = url;
    setSocialLinks(updatedLinks);
  };

  // Generate HTML code
  const generateHtmlCode = () => {
    if (signatureRef.current) {
      const html = signatureRef.current.outerHTML;
      return html;
    }
    return "";
  };

  // Download HTML
  const downloadHtml = () => {
    const html = generateHtmlCode();
    const blob = new Blob([html], { type: "text/html" });
    saveAs(blob, "email-signature.html");
  };

  // Download as PNG
  const downloadPng = async () => {
    if (signatureRef.current) {
      try {
        const dataUrl = await toPng(signatureRef.current, { quality: 0.95 });
        saveAs(dataUrl, 'email-signature.png');
      } catch (error) {
        console.error('Error generating PNG:', error);
      }
    }
  };

  // Social media icons
  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/174/174857.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/733/733579.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/733/733547.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/725/725342.png";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Email Signature Generator</h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side: Controls */}
            <div className="lg:w-1/2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <PhotoIcon className="h-5 w-5 mr-2" />
                  Company Logo
                </h2>
                <div className="mt-1 flex items-center">
                  {logo ? (
                    <div className="relative">
                      <img src={logo} alt="Company logo" className="h-16 w-auto object-contain" />
                      <button
                        type="button"
                        onClick={handleClearLogo}
                        className="absolute -top-2 -right-2 rounded-full bg-white p-1 text-gray-500 shadow-sm hover:text-red-500"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Upload Logo
                      <input
                        id="logo-upload"
                        name="logo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <SwatchIcon className="h-5 w-5 mr-2" />
                  Colors
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="primary" className="block text-sm font-medium text-gray-700">
                      Primary Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="primary"
                        id="primary"
                        value={colors.primary}
                        onChange={handleColorChange}
                        className="h-8 w-8 rounded-md border-gray-300 mr-2"
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={handleColorChange}
                        name="primary"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="secondary" className="block text-sm font-medium text-gray-700">
                      Secondary Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="secondary"
                        id="secondary"
                        value={colors.secondary}
                        onChange={handleColorChange}
                        className="h-8 w-8 rounded-md border-gray-300 mr-2"
                      />
                      <input
                        type="text"
                        value={colors.secondary}
                        onChange={handleColorChange}
                        name="secondary"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Social Links
                </h2>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={link.active}
                        onChange={() => toggleSocialLink(index)}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700 mr-2 w-20">
                        {link.name}:
                      </span>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, e.target.value)}
                        disabled={!link.active}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download Options
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={downloadHtml}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                    Download HTML
                  </button>
                  <button
                    onClick={downloadPng}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PhotoIcon className="h-5 w-5 mr-1" />
                    Download PNG
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Preview */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
                <div className="border p-4 rounded">
                  <div 
                    ref={signatureRef} 
                    className="signature-preview" 
                    style={{ backgroundColor: colors.background }}
                  >
                    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', color: colors.text }}>
                      <tbody>
                        <tr>
                          {logo && (
                            <td style={{ verticalAlign: 'top', paddingRight: '15px' }}>
                              <img src={logo} alt="Company logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </td>
                          )}
                          <td style={{ verticalAlign: 'top' }}>
                            <table cellPadding="0" cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td style={{ paddingBottom: '5px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>{formData.name}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ paddingBottom: '5px' }}>
                                    <div style={{ fontSize: '14px', color: colors.secondary }}>{formData.title} | {formData.company}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '12px' }}>
                                      <span style={{ display: 'block', marginBottom: '2px' }}>
                                        📧 <a href={`mailto:${formData.email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.email}</a>
                                      </span>
                                      <span style={{ display: 'block', marginBottom: '2px' }}>
                                        📱 {formData.phone}
                                      </span>
                                      {formData.website && (
                                        <span style={{ display: 'block', marginBottom: '2px' }}>
                                          🌐 <a href={`https://${formData.website}`} style={{ color: colors.primary, textDecoration: 'none' }}>{formData.website}</a>
                                        </span>
                                      )}
                                      {formData.address && (
                                        <span style={{ display: 'block', marginBottom: '2px' }}>
                                          📍 {formData.address}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      {socialLinks.filter(link => link.active).map((link, index) => (
                                        <a 
                                          key={index} 
                                          href={link.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          style={{ textDecoration: 'none' }}
                                        >
                                          <img 
                                            src={getSocialIcon(link.name)} 
                                            alt={link.name} 
                                            style={{ width: '20px', height: '20px' }} 
                                          />
                                        </a>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>This is how your signature will look in email clients. To use it, download the HTML or PNG and add it to your email client settings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">Email Signature Generator | Create professional email signatures in seconds</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignatureGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;