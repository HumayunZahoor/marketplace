import React from 'react';
import CategoriesAndSliderSection from './CategoriesAndSliderSection';
import UserInfoSection from './UserInfoSection';
import AdvertisementSection from './AdvertisementSection';

const Home = () => {
  return (
    <div>
      <CategoriesAndSliderSection />
      <AdvertisementSection/>
      <UserInfoSection/>
    </div>
  );
};

export default Home;
