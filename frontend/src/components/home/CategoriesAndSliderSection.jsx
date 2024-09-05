import React from 'react';
import { Link } from 'react-router-dom';
import '../css/project.css';

import {
  FaLaptop,
  FaTshirt,
  FaHome,
  FaHeart,
  FaCar,
  FaFootballBall,
  FaPuzzlePiece,
  FaBook,
  FaTools,
  FaUtensils,
} from 'react-icons/fa';

const CategoriesAndSliderSection = () => {
  const categories = [
    { to: '/Cat1', icon: <FaLaptop />, label: 'Electronics' },
    { to: '/Cat2', icon: <FaTshirt />, label: 'Fashion' },
    { to: '/Cat3', icon: <FaHome />, label: 'Home & Garden' },
    { to: '/Cat4', icon: <FaHeart />, label: 'Beauty & Health' },
    { to: '/Cat5', icon: <FaCar />, label: 'Automotive' },
    { to: '/Cat6', icon: <FaFootballBall />, label: 'Sports & Outdoors' },
    { to: '/Cat7', icon: <FaPuzzlePiece />, label: 'Toys & Games' },
    { to: '/Cat8', icon: <FaBook />, label: 'Books & Media' },
    { to: '/Cat9', icon: <FaTools />, label: 'Services' },
    { to: '/Cat10', icon: <FaUtensils />, label: 'Food & Beverages' },
  ];

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Categories Section */}
      <div className="flex flex-col space-y-4 md:w-1/4">
        {categories.map(({ to, icon, label }) => (
          <Link
            to={to}
            className="text-blue-500 hover:text-blue-700 flex items-center"
            key={to}
          >
            {icon} <span className="ml-2">{label}</span>
          </Link>
        ))}
      </div>

      {/* Text and Slider Section */}
      <div className="relative md:w-3/4 flex items-center justify-between">
        {/* Text Section */}
        <div className="p-6 md:w-1/2 relative z-10 h-[400px] text-center">
          <h2 className="text-2xl font-bold pt-20 text-indigo-700">
            تجارت گھر – آپ کا کاروباری پارٹنر
          </h2>
          <p className="text-lg mt-2 pl-0 pr-6 text-indigo-500">
            تجارت گھر آپ کے کاروبار کو بڑھانے کے لئے ایک مثالی پلیٹ فارم ہے جہاں آپ
            اپنی مصنوعات کو وسیع خریداروں تک پہنچا سکتے ہیں۔ آج ہی شامل ہو کر اپنے کاروبار
            کو فروغ دیں
          </p>
        </div>

        {/* Circular Discount Element */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[60%] -translate-y-1/2 w-40 h-40 bg-white rounded-full flex items-center justify-center z-20 border-4 border-indigo-900">
          <span className="text-red-500 text-5xl font-serif font-bold">-30%</span>
        </div>

        {/* Diagonal Image Slider */}
        <div className="relative md:w-11/12 overflow-hidden h-[400px]">
          <div className="absolute inset-0 bg-blue-500 z-0 clip-shape background2"></div>
          <div className="relative p-6 z-10">
            {/* Add slider images and content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndSliderSection;
