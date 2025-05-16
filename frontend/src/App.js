import { useState, useRef, useEffect } from "react";
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
  PlusIcon,
  PencilIcon,
  CodeBracketIcon,
  CheckIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  AdjustmentsHorizontalIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

// Import components
import ImageCropper from './components/ImageCropper';
import TemplateSelector from './components/TemplateSelector';
import IconSelector from './components/IconSelector';
import AnimatedHeadshot from './components/AnimatedHeadshot';

// Import templates
import templates from './data/templates';

const SignatureGenerator = () => {
  // Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Marketing Manager",
    company: "Acme Corporation",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    website: "www.acme.com",
    address: "123 Business Ave, New York, NY 10001",
    extraFields: []
  });

  // Logo state
  const [logo, setLogo] = useState(null);
  const [showLogoCropper, setShowLogoCropper] = useState(false);
  const [tempLogoImage, setTempLogoImage] = useState(null);
  
  // Headshot state
  const [headshot, setHeadshot] = useState(null);
  const [showHeadshotCropper, setShowHeadshotCropper] = useState(false);
  const [tempHeadshotImage, setTempHeadshotImage] = useState(null);
  const [showHeadshotCustomizer, setShowHeadshotCustomizer] = useState(false);
  
  // Colors state
  const [colors, setColors] = useState({
    primary: "#0f766e",
    secondary: "#4b5563",
    background: "#ffffff",
    text: "#111827",
    iconColor: "#0f766e"
  });

  // Social links state
  const [socialLinks, setSocialLinks] = useState([
    { name: "LinkedIn", url: "https://linkedin.com/in/johndoe", active: true },
    { name: "Twitter", url: "https://twitter.com/johndoe", active: true },
    { name: "Facebook", url: "https://facebook.com/johndoe", active: false },
    { name: "Instagram", url: "https://instagram.com/johndoe", active: false },
    { name: "GitHub", url: "https://github.com/johndoe", active: false },
    { name: "YouTube", url: "https://youtube.com/c/johndoe", active: false },
    { name: "WhatsApp", url: "https://wa.me/15551234567", active: false },
    { name: "Telegram", url: "https://t.me/johndoe", active: false }
  ]);
  
  // Custom social icons
  const [customSocialIcons, setCustomSocialIcons] = useState({});
  
  // Icon style selection
  const [iconStyle, setIconStyle] = useState("flat");
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [iconAnimation, setIconAnimation] = useState("none");
  
  // HTML Template
  const [htmlTemplate, setHtmlTemplate] = useState(null);
  const [customHtml, setCustomHtml] = useState("");
  
  // Toggle showing raw HTML
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  
  // Headshot animation and styling
  const [headshotAnimation, setHeadshotAnimation] = useState("none");
  const [headshotBorderStyle, setHeadshotBorderStyle] = useState("none");
  const [headshotBorderColor, setHeadshotBorderColor] = useState("#0f766e");
  const [headshotShape, setHeadshotShape] = useState("circle");
  
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

  // Handle extra field changes
  const handleExtraFieldChange = (index, field) => {
    const updatedFields = [...formData.extraFields];
    updatedFields[index] = field;
    setFormData({ ...formData, extraFields: updatedFields });
  };

  // Add extra field
  const addExtraField = () => {
    const newField = { label: "Custom Field", value: "", icon: "📝", isLink: false };
    setFormData({ 
      ...formData, 
      extraFields: [...formData.extraFields, newField] 
    });
  };

  // Remove extra field
  const removeExtraField = (index) => {
    const updatedFields = [...formData.extraFields];
    updatedFields.splice(index, 1);
    setFormData({ ...formData, extraFields: updatedFields });
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempLogoImage(reader.result);
        setShowLogoCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo crop complete
  const handleLogoCropComplete = (croppedLogo) => {
    setLogo(croppedLogo);
    setShowLogoCropper(false);
    setTempLogoImage(null);
  };

  // Handle headshot upload
  const handleHeadshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempHeadshotImage(reader.result);
        setShowHeadshotCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle headshot crop complete
  const handleHeadshotCropComplete = (croppedHeadshot) => {
    setHeadshot({
      url: croppedHeadshot,
      animation: headshotAnimation,
      borderStyle: headshotBorderStyle,
      borderColor: headshotBorderColor,
      shape: headshotShape
    });
    setShowHeadshotCropper(false);
    setTempHeadshotImage(null);
  };

  // Clear logo
  const handleClearLogo = () => {
    setLogo(null);
  };

  // Clear headshot
  const handleClearHeadshot = () => {
    setHeadshot(null);
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

  // Handle custom icon upload for a specific social network
  const handleCustomIconUpload = (e, socialName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomSocialIcons(prev => ({
          ...prev,
          [socialName]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear custom icon
  const clearCustomIcon = (socialName) => {
    setCustomSocialIcons(prev => {
      const newIcons = {...prev};
      delete newIcons[socialName];
      return newIcons;
    });
  };

  // Handle icon style selection
  const handleIconStyleSelect = (style) => {
    setIconStyle(style);
  };

  // Handle icon animation selection
  const handleIconAnimationSelect = (animation) => {
    setIconAnimation(animation);
  };

  // Handle icon color change
  const handleIconColorChange = (color) => {
    setColors(prev => ({ ...prev, iconColor: color }));
  };

  // Handle headshot animation selection
  const handleHeadshotAnimationSelect = (animation) => {
    setHeadshotAnimation(animation);
    if (headshot) {
      setHeadshot({
        ...headshot,
        animation: animation
      });
    }
  };

  // Handle headshot border style selection
  const handleHeadshotBorderStyleSelect = (style) => {
    setHeadshotBorderStyle(style);
    if (headshot) {
      setHeadshot({
        ...headshot,
        borderStyle: style
      });
    }
  };

  // Handle headshot border color change
  const handleHeadshotBorderColorChange = (color) => {
    setHeadshotBorderColor(color);
    if (headshot) {
      setHeadshot({
        ...headshot,
        borderColor: color
      });
    }
  };

  // Handle headshot shape selection
  const handleHeadshotShapeSelect = (shape) => {
    setHeadshotShape(shape);
    if (headshot) {
      setHeadshot({
        ...headshot,
        shape: shape
      });
    }
  };

  // Handle HTML template upload
  const handleHtmlTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHtmlTemplate(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomHtml(reader.result);
      };
      reader.readAsText(file);
    }
  };

  // Clear HTML template
  const clearHtmlTemplate = () => {
    setHtmlTemplate(null);
    setCustomHtml("");
  };

  // Social media icons
  const getSocialIcon = (name) => {
    // Check if we have a custom icon for this social network
    if (customSocialIcons[name]) {
      return customSocialIcons[name];
    }
    
    // Otherwise use the default icon based on the selected style
    switch (iconStyle) {
      case 'flat':
        return getSocialIconFlat(name);
      case 'colored':
        return getSocialIconColored(name);
      case 'monochrome':
        return getSocialIconMonochrome(name);
      case 'outlined':
        return getSocialIconOutlined(name);
      case 'rounded':
        return getSocialIconRounded(name);
      case 'square':
        return getSocialIconSquare(name);
      case 'gradient':
        return getSocialIconGradient(name);
      case '3d':
        return getSocialIcon3d(name);
      default:
        return getSocialIconFlat(name);
    }
  };
  
  // Flat icon style
  const getSocialIconFlat = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/174/174857.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/733/733579.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/733/733547.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/733/733553.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384060.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/733/733585.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/2111/2111646.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/725/725342.png";
    }
  };
  
  // Colored icon style
  const getSocialIconColored = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/3536/3536505.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/3256/3256013.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/5968/5968764.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/3955/3955024.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/3291/3291695.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384028.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/5968/5968841.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/5968/5968804.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/725/725342.png";
    }
  };
  
  // Monochrome icon style
  const getSocialIconMonochrome = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/61/61109.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/25/25347.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/20/20673.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/87/87390.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/25/25231.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/1077/1077046.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/134/134937.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/87/87413.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/44/44646.png";
    }
  };
  
  // Outlined icon style
  const getSocialIconOutlined = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384014.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384017.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384005.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384015.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/1051/1051326.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384012.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384023.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384018.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/1384/1384062.png";
    }
  };
  
  // Rounded icon style
  const getSocialIconRounded = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938044.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938043.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938025.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938036.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938033.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938037.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938041.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/3938/3938067.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/3938/3938056.png";
    }
  };
  
  // Square icon style
  const getSocialIconSquare = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/174/174857.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/733/733635.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/733/733605.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/1400/1400829.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/733/733609.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384028.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/1384/1384055.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/2111/2111812.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/3038/3038157.png";
    }
  };
  
  // Gradient icon style
  const getSocialIconGradient = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/3536/3536505.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670151.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670124.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670125.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670163.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670147.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670070.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670070.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/3670/3670156.png";
    }
  };
  
  // 3D icon style
  const getSocialIcon3d = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return "https://cdn-icons-png.flaticon.com/512/3536/3536505.png";
      case 'twitter':
        return "https://cdn-icons-png.flaticon.com/512/3256/3256013.png";
      case 'facebook':
        return "https://cdn-icons-png.flaticon.com/512/3536/3536394.png";
      case 'instagram':
        return "https://cdn-icons-png.flaticon.com/512/3955/3955024.png";
      case 'github':
        return "https://cdn-icons-png.flaticon.com/512/3291/3291667.png";
      case 'youtube':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670147.png";
      case 'whatsapp':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670051.png";
      case 'telegram':
        return "https://cdn-icons-png.flaticon.com/512/3670/3670070.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/3670/3670156.png";
    }
  };

  // Generate HTML code
  const generateHtmlCode = () => {
    if (customHtml) {
      return customHtml;
    }
    
    if (signatureRef.current) {
      // Get the signature HTML
      const signatureHtml = signatureRef.current.outerHTML;
      
      // Create a full HTML document with the proper doctype, head, etc.
      const fullHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Email Signature</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
${signatureHtml}
</body>
</html>`;
      
      return fullHtml;
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
    if (customHtml) {
      alert("Custom HTML templates can only be downloaded as HTML, not as PNG.");
      return;
    }
    
    if (signatureRef.current) {
      try {
        const dataUrl = await toPng(signatureRef.current, { quality: 0.95 });
        saveAs(dataUrl, 'email-signature.png');
      } catch (error) {
        console.error('Error generating PNG:', error);
      }
    }
  };
  
  // Get active social links
  const activeLinks = socialLinks.filter(link => link.active);
  
  // Render the template based on selection
  const renderTemplate = () => {
    const templateRender = templates[selectedTemplate] || templates.default;
    
    // Prepare template props
    const templateProps = {
      formData,
      logo,
      headshot,
      colors,
      activeLinks,
      getSocialIcon,
      iconAnimation,
      iconStyle
    };
    
    return templateRender(templateProps);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Professional Email Signature Generator</h1>
          <button 
            onClick={downloadHtml} 
            className="inline-flex items-center rounded-md bg-teal-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
            Download Signature
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side: Controls */}
            <div className="lg:w-1/2 space-y-6">
              {/* Template Selection */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                    Template Design
                  </h2>
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <span className="mr-1">Change</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {templates[selectedTemplate] ? templates[selectedTemplate].name || selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1) : 'Classic'}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedTemplate === 'classic' ? 'Traditional horizontal layout' 
                       : selectedTemplate === 'modern' ? 'Clean, minimalist design'
                       : selectedTemplate === 'compact' ? 'Space-efficient layout'
                       : selectedTemplate === 'bold' ? 'Eye-catching design with emphasis'
                       : 'Custom template design'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Images Section (Logo and Headshot) */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <PhotoIcon className="h-5 w-5 mr-2" />
                  Images
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Logo Upload */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Company Logo</h3>
                    <div className="flex flex-col items-center">
                      {logo ? (
                        <div className="relative">
                          <img src={logo} alt="Company logo" className="h-20 w-auto object-contain mb-3" />
                          <button
                            type="button"
                            onClick={handleClearLogo}
                            className="absolute -top-2 -right-2 rounded-full bg-white p-1 text-gray-500 shadow-sm hover:text-red-500 border border-gray-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-20 w-32 bg-gray-100 rounded-lg mb-3">
                          <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                        {logo ? 'Change Logo' : 'Upload Logo'}
                        <input
                          id="logo-upload"
                          name="logo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* Headshot Upload */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Profile Photo</h3>
                    <div className="flex flex-col items-center">
                      {headshot ? (
                        <div className="relative">
                          <img 
                            src={headshot.url} 
                            alt="Headshot" 
                            className={`
                              h-20 w-20 object-cover mb-3
                              ${headshot.shape === 'circle' ? 'rounded-full' : ''}
                              ${headshot.shape === 'rounded' ? 'rounded-lg' : ''}
                              ${headshot.borderStyle === 'thin' ? 'border-2' : ''}
                              ${headshot.borderStyle === 'thick' ? 'border-4' : ''}
                              ${headshot.borderStyle === 'double' ? 'border-double border-4' : ''}
                              ${headshot.borderStyle === 'dashed' ? 'border-2 border-dashed' : ''}
                            `}
                            style={{
                              borderColor: headshot.borderStyle !== 'none' && headshot.borderStyle !== 'shadow' && headshot.borderStyle !== 'glow' ? headshot.borderColor : undefined,
                              boxShadow: headshot.borderStyle === 'shadow' ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
                                       : headshot.borderStyle === 'glow' ? `0 0 10px ${headshot.borderColor}` 
                                       : 'none',
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleClearHeadshot}
                            className="absolute -top-2 -right-2 rounded-full bg-white p-1 text-gray-500 shadow-sm hover:text-red-500 border border-gray-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-20 w-20 bg-gray-100 rounded-full mb-3">
                          <UserCircleIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <label
                          htmlFor="headshot-upload"
                          className="cursor-pointer mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                          {headshot ? 'Change Photo' : 'Upload Photo'}
                          <input
                            id="headshot-upload"
                            name="headshot"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleHeadshotUpload}
                          />
                        </label>
                        
                        {headshot && (
                          <button
                            onClick={() => setShowHeadshotCustomizer(true)}
                            className="mt-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />
                            Customize
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                
                {/* Extra Fields */}
                {formData.extraFields.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Fields</h3>
                    <div className="space-y-3">
                      {formData.extraFields.map((field, index) => (
                        <div key={index} className="flex items-start">
                          <div className="grid grid-cols-3 gap-2 flex-grow mr-2">
                            <div>
                              <input
                                type="text"
                                placeholder="Label"
                                value={field.label}
                                onChange={(e) => handleExtraFieldChange(index, { ...field, label: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                              />
                            </div>
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={field.value}
                                  onChange={(e) => handleExtraFieldChange(index, { ...field, value: e.target.value })}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                />
                                <select
                                  value={field.icon}
                                  onChange={(e) => handleExtraFieldChange(index, { ...field, icon: e.target.value })}
                                  className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                >
                                  <option value="📝">📝</option>
                                  <option value="🔗">🔗</option>
                                  <option value="📱">📱</option>
                                  <option value="📧">📧</option>
                                  <option value="📍">📍</option>
                                  <option value="🌐">🌐</option>
                                  <option value="📅">📅</option>
                                  <option value="⭐">⭐</option>
                                  <option value="💼">💼</option>
                                </select>
                              </div>
                              <div className="mt-1 flex items-center">
                                <input
                                  type="checkbox"
                                  id={`isLink-${index}`}
                                  checked={field.isLink}
                                  onChange={(e) => handleExtraFieldChange(index, { ...field, isLink: e.target.checked })}
                                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                />
                                <label htmlFor={`isLink-${index}`} className="ml-2 block text-xs text-gray-500">
                                  This is a clickable link
                                </label>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeExtraField(index)}
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-red-500 ml-2"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <button
                    onClick={addExtraField}
                    className="inline-flex items-center text-sm text-teal-600 hover:text-teal-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Custom Field
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                  <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                      Text Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="text"
                        id="text"
                        value={colors.text}
                        onChange={handleColorChange}
                        className="h-8 w-8 rounded-md border-gray-300 mr-2"
                      />
                      <input
                        type="text"
                        value={colors.text}
                        onChange={handleColorChange}
                        name="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="background" className="block text-sm font-medium text-gray-700">
                      Background Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="background"
                        id="background"
                        value={colors.background}
                        onChange={handleColorChange}
                        className="h-8 w-8 rounded-md border-gray-300 mr-2"
                      />
                      <input
                        type="text"
                        value={colors.background}
                        onChange={handleColorChange}
                        name="background"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    Social Links
                  </h2>
                  <button
                    onClick={() => setShowIconSelector(true)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-1" />
                    Customize Icons
                  </button>
                </div>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={link.active}
                          onChange={() => toggleSocialLink(index)}
                          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <img 
                            src={getSocialIcon(link.name)} 
                            alt={link.name} 
                            className="w-5 h-5 mr-2"
                            style={{ 
                              filter: iconStyle === 'monochrome' ? `brightness(0) saturate(100%) ${colors.iconColor !== '#000000' ? `invert(1) sepia(1) saturate(3) hue-rotate(${parseInt(colors.iconColor.substring(1, 3), 16)}deg)` : ''}` : 'none',
                            }}
                          />
                          {link.name}
                        </span>
                        
                        {/* Custom icon upload */}
                        <div className="ml-auto flex items-center">
                          {customSocialIcons[link.name] ? (
                            <div className="relative">
                              <img 
                                src={customSocialIcons[link.name]} 
                                alt={`Custom ${link.name} icon`} 
                                className="h-6 w-6 object-contain mr-2" 
                              />
                              <button
                                onClick={() => clearCustomIcon(link.name)}
                                className="absolute -top-1 -right-1 rounded-full bg-white p-0.5 text-gray-500 shadow-sm hover:text-red-500 border border-gray-100"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor={`icon-upload-${index}`}
                                className="cursor-pointer text-xs text-teal-600 hover:text-teal-800 mr-2 flex items-center"
                              >
                                <PhotoIcon className="h-4 w-4 mr-1" />
                                Custom Icon
                                <input
                                  id={`icon-upload-${index}`}
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(e) => handleCustomIconUpload(e, link.name)}
                                />
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, e.target.value)}
                        disabled={!link.active}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        placeholder={`Your ${link.name} URL`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* HTML Template Upload */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <CodeBracketIcon className="h-5 w-5 mr-2" />
                  HTML Template
                </h2>
                
                <div className="space-y-4">
                  {htmlTemplate ? (
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm font-medium">{htmlTemplate}</span>
                        </div>
                        <button
                          onClick={clearHtmlTemplate}
                          className="rounded-full bg-white p-1 text-gray-500 shadow-sm hover:text-red-500 border border-gray-200"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        <p>Custom HTML template loaded. The preview and download will use this template instead of the generated one.</p>
                      </div>
                      
                      <button
                        onClick={() => setShowHtmlCode(!showHtmlCode)}
                        className="text-xs text-teal-600 hover:text-teal-800 flex items-center"
                      >
                        <CodeBracketIcon className="h-4 w-4 mr-1" />
                        {showHtmlCode ? "Hide HTML" : "View HTML"}
                      </button>
                      
                      {showHtmlCode && (
                        <div className="mt-3">
                          <textarea
                            value={customHtml}
                            onChange={(e) => setCustomHtml(e.target.value)}
                            className="w-full h-40 font-mono text-xs p-2 border rounded code-editor"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="html-template-upload"
                        className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center"
                      >
                        <DocumentTextIcon className="h-5 w-5 mr-1" />
                        Upload HTML Template
                        <input
                          id="html-template-upload"
                          type="file"
                          accept=".html,.htm"
                          className="sr-only"
                          onChange={handleHtmlTemplateUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload an HTML template to use instead of the built-in templates. This is useful if you have specific HTML structure requirements.
                      </p>
                      <a 
                        href="/sample-signature.html" 
                        download="sample-signature.html"
                        className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center mt-2"
                      >
                        <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
                        Download sample HTML template
                      </a>
                    </div>
                  )}
                  
                  <div>
                    <button
                      onClick={() => setShowHtmlCode(!showHtmlCode)}
                      className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
                    >
                      <CodeBracketIcon className="h-4 w-4 mr-1" />
                      {showHtmlCode ? "Hide Generated HTML" : "View Generated HTML"}
                    </button>
                    
                    {showHtmlCode && !htmlTemplate && (
                      <div className="mt-3">
                        <pre className="w-full h-60 font-mono text-xs p-2 border rounded overflow-auto bg-gray-50 code-editor">
                          {generateHtmlCode()}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                <div className="mt-4 text-sm text-gray-500 flex items-start">
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                  <p>HTML format is recommended for most email clients. PNG format is best for applications that don't support HTML signatures.</p>
                </div>
              </div>
            </div>

            {/* Right side: Preview */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
                <div className="border p-4 rounded">
                  {customHtml ? (
                    <div className="signature-preview" style={{ backgroundColor: colors.background }}>
                      <div dangerouslySetInnerHTML={{ __html: customHtml }} />
                    </div>
                  ) : (
                    <div 
                      ref={signatureRef} 
                      className="signature-preview" 
                      style={{ backgroundColor: colors.background }}
                    >
                      {renderTemplate()}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    {customHtml 
                      ? "You are using a custom HTML template. To make changes, edit the HTML code directly."
                      : "This is how your signature will look in email clients. To use it, download the HTML or PNG and add it to your email client settings."}
                  </p>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">How to add this signature to your email client:</h3>
                  <ol className="text-sm text-gray-500 list-decimal pl-5 space-y-1">
                    <li>Download your signature in HTML or PNG format</li>
                    <li>Open your email client settings</li>
                    <li>Find the signature section (usually under Settings &gt; General or Settings &gt; Mail)</li>
                    <li>Import or paste your signature</li>
                    <li>Save your changes</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">Professional Email Signature Generator | Create stunning email signatures in seconds</p>
        </div>
      </footer>
      
      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
      
      {/* Logo Cropper Modal */}
      {showLogoCropper && tempLogoImage && (
        <ImageCropper
          image={tempLogoImage}
          onCropComplete={handleLogoCropComplete}
          onCancel={() => {
            setShowLogoCropper(false);
            setTempLogoImage(null);
          }}
          type="logo"
        />
      )}
      
      {/* Headshot Cropper Modal */}
      {showHeadshotCropper && tempHeadshotImage && (
        <ImageCropper
          image={tempHeadshotImage}
          onCropComplete={handleHeadshotCropComplete}
          onCancel={() => {
            setShowHeadshotCropper(false);
            setTempHeadshotImage(null);
          }}
          type="headshot"
        />
      )}
      
      {/* Icon Selector Modal */}
      {showIconSelector && (
        <IconSelector
          selectedIconStyle={iconStyle}
          onSelectIconStyle={handleIconStyleSelect}
          selectedAnimation={iconAnimation}
          onSelectAnimation={handleIconAnimationSelect}
          iconColor={colors.iconColor}
          onColorChange={handleIconColorChange}
          onClose={() => setShowIconSelector(false)}
        />
      )}
      
      {/* Headshot Customizer Modal */}
      {showHeadshotCustomizer && headshot && (
        <AnimatedHeadshot
          headshot={headshot.url}
          animation={headshot.animation}
          onSelectAnimation={handleHeadshotAnimationSelect}
          borderStyle={headshot.borderStyle}
          onSelectBorderStyle={handleHeadshotBorderStyleSelect}
          borderColor={headshot.borderColor}
          onBorderColorChange={handleHeadshotBorderColorChange}
          shape={headshot.shape}
          onSelectShape={handleHeadshotShapeSelect}
          onClose={() => setShowHeadshotCustomizer(false)}
        />
      )}
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