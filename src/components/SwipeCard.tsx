import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

interface SwipeCardProps {
  title: string;
  image: string;
  imdbRating: number;
  kinopoiskRating: number;
  englishTitle: string;
  releaseYear: number;
  genres: string[];
  description: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ title, image, imdbRating, kinopoiskRating, englishTitle, releaseYear, genres, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const calculateImageHeight = () => {
    const baseHeight = 350; // базовая высота изображения
    const textLength = title.length + englishTitle.length + genres.join('').length;
    const additionalHeight = Math.max(0, 100 - textLength); // уменьшение высоты, если текста мало
    return baseHeight + additionalHeight;
  };

  return (
    <div className="absolute w-80 h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
      <div className="relative" style={{ height: `${calculateImageHeight()}px` }}>
        <img src={image} alt={title} className={`w-full h-full object-cover ${showDescription ? 'opacity-50' : ''}`} />
        <div className="absolute top-2 left-2 bg-orange-500 text-white p-1 rounded">
          <p>KP: {kinopoiskRating}</p>
        </div>
        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
          <p>IMDb: {imdbRating}</p>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/50 rounded-full p-1">
            <ThumbDownIcon style={{ color: 'red', fontSize: 30 }} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="bg-black/50 rounded-full p-1">
            <ThumbUpIcon style={{ color: 'green', fontSize: 30 }} />
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
            <InfoIcon style={{ color: 'white', fontSize: 30 }} />
          </div>
        </div>
        {showDescription && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white p-4">
            <button className="absolute top-2 right-2" onClick={() => setShowDescription(false)}>
              <CloseIcon style={{ color: 'white', fontSize: 30 }} />
            </button>
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
      <div className="pt-1 px-3 flex-grow">
        <h3 className="text-base font-bold text-gray-500" style={{ lineHeight: '1.2', marginBottom: '8px' }}>
          {title} ({releaseYear})
        </h3>
        <p className="text-xs text-gray-500" style={{ marginBottom: '8px' }}>{englishTitle}</p>
        <div className="flex flex-wrap gap-0.5 mt-1">
          {genres.map((genre) => (
            <span key={genre} className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
        </div>
        {/* Убедитесь, что здесь нет дублирования описания */}
      </div>
    </div>
  );
};

export default SwipeCard;
