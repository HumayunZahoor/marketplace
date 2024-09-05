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
    <div className="p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
      {/* Categories Section */}
      <div className="flex flex-wrap gap-4 md:w-1/4">
        {categories.map(({ to, icon, label }) => (
          <Link
            to={to}
            className="text-blue-700 hover:text-blue-700 flex items-center md:w-full"
            key={to}
          >
            <div className="flex-shrink-0 text-2xl">{icon}</div>
            <span className="ml-2 text-sm md:text-base">{label}</span>
          </Link>
        ))}
      </div>

      {/* Text and Slider Section */}
      <div className="relative md:w-3/4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="p-6 md:w-1/2 flex flex-col items-center justify-center text-center md:text-left h-auto md:-ml-12">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-700">
            تجارت گھر – آپ کا کاروباری پارٹنر
          </h2>
          <p className="text-base md:text-lg mt-2 text-indigo-500">
            تجارت گھر آپ کے کاروبار کو بڑھانے کے لئے ایک مثالی پلیٹ فارم ہے جہاں آپ
            اپنی مصنوعات کو وسیع خریداروں تک پہنچا سکتے ہیں۔ آج ہی شامل ہو کر اپنے کاروبار
            کو فروغ دیں
          </p>
        </div>

        {/* Circular Discount Element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-transparent rounded-full flex items-center justify-center border-4 border-indigo-900 z-20 md:overflow-hidden overflow-hidden ">
          <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-indigo-900">-30%</span>
        </div>

        {/* Diagonal Image Slider */}
        <div className="relative md:w-8/12 w-7/12 lg:w-8/12 overflow-hidden h-[300px] md:h-[400px]">
          <div className="absolute inset-0 bg-blue-500 z-0 clip-shape background2"></div>
          <div className="relative p-4 md:p-6 z-10">
            {/* Add slider images and content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndSliderSection;
