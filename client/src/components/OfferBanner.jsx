import React from 'react';

const OfferBanner = () => {
  return (
    <div className="w-full my-8 overflow-hidden rounded-sm cursor-pointer shadow-sm">
      <img 
        src="https://placehold.co/1200x200/ef4444/ffffff?text=Extra+Discounts+for+Plus+Members+-+Starts+29th+May" 
        alt="Special Offer" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default OfferBanner;
