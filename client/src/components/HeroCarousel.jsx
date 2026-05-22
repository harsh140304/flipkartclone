import React, { useState, useEffect } from 'react';

const banners = [
  "https://placehold.co/1600x270/2874f0/ffffff?text=Big+Billion+Days+Are+Here!",
  "https://placehold.co/1600x270/ffed4a/000000?text=Mega+Electronics+Sale+-+Up+to+80%25+Off",
  "https://placehold.co/1600x270/e2e8f0/000000?text=Fashion+End+of+Season+Sale"
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 mb-6 cursor-pointer">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img 
            key={index}
            src={banner} 
            alt={`Banner ${index + 1}`} 
            className="w-full h-[150px] sm:h-[200px] md:h-[270px] object-cover shrink-0"
          />
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button 
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
