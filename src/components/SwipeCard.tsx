import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SwipeCardProps {
  title: string;
  image: string;
  imdbRating: number;
  kinopoiskRating: number;
  englishTitle: string;
  releaseYear: number;
  genres: string[];
  description: string;
  trailerUrl: string;
  countries: string[]; // Добавлено свойство для стран
  onSwipe: (direction: string) => void;
}

// Вынесем логику получения URL трейлера в отдельную функцию
const getYouTubeEmbedUrl = (url: string): string => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const videoId = urlParams.get('v');
  return videoId ? `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1` : '';
};

// Вынесем логику вычисления высоты изображения в отдельную функцию
const calculateImageHeight = (title: string, englishTitle: string, genres: string[], countries: string[]): number => {
  const baseHeight = 300; // Уменьшена базовая высота
  const textLength = title.length + englishTitle.length + genres.join('').length;
  const additionalHeight = Math.max(0, 100 - textLength);

  // Учитываем количество стран
  const countryHeight = countries.length > 4 ? 50 : 0;

  return baseHeight + additionalHeight - countryHeight;
};

const SwipeCard: React.FC<SwipeCardProps> = ({ title, image, imdbRating, kinopoiskRating, englishTitle, releaseYear, genres, description, trailerUrl, countries, onSwipe }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const [props, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    config: { tension: 300, friction: 30 },
  }));

  const handleSwipe = (direction: 'left' | 'right') => {
    const xValue = direction === 'left' ? -1000 : 1000;
    api.start({ x: xValue, opacity: 0, onRest: () => onSwipe(direction) });
  };

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  return (
    <animated.div style={{ ...props }} className="absolute w-80 h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
      <div className="relative flex-grow overflow-hidden" style={{ flexGrow: 1 }}> {/* Используем Flexbox с flexGrow */}
        <img src={image} alt={title} className={`w-full h-full object-cover ${showDescription ? 'opacity-50' : ''}`} style={{ objectPosition: 'top' }} />
        <div className="absolute top-2 left-2 bg-orange-500 text-white p-1 rounded">
          <p>KP: {kinopoiskRating}</p>
        </div>
        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
          <p>IMDb: {imdbRating}</p>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => handleSwipe('left')}>
            <ThumbDownIcon style={{ color: 'red', fontSize: 30 }} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => handleSwipe('right')}>
            <ThumbUpIcon style={{ color: 'green', fontSize: 30 }} />
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
            <InfoIcon style={{ color: 'white', fontSize: 30 }} />
          </div>
          <div className="bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => setShowTrailer(!showTrailer)}>
            <PlayArrowIcon style={{ color: 'white', fontSize: 30 }} />
          </div>
        </div>
        {showDescription && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white p-4">
            <button className="absolute top-2 right-2" onClick={() => setShowDescription(false)}>
              <CloseIcon style={{ color: 'white', fontSize: 30 }} />
            </button>
            <div>
              <p className="text-sm mb-4">{description}</p>
              <div className="flex flex-wrap gap-0.5 mt-2 border-t border-gray-500 pt-2">
                {genres.map((genre) => (
                  <span key={genre} className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-0.5 mt-2 border-t border-gray-500 pt-2"> {/* Добавлен список стран */}
                {countries.map((country) => (
                  <span key={country} className="bg-green-100 text-green-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        {showTrailer && embedUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button className="absolute top-2 right-2" onClick={() => setShowTrailer(false)}>
              <CloseIcon style={{ color: 'white', fontSize: 30 }} />
            </button>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-500" style={{ lineHeight: '1.2', marginBottom: '8px' }}>
          {title} ({releaseYear})
        </h3>
        <p className="text-xs text-gray-500" style={{ marginBottom: '8px' }}>{englishTitle}</p>
        <div className="flex gap-0.5 mt-1 items-center flex-wrap">
          {genres.slice(0, 4).map((genre) => (
            <span key={genre} className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
          {genres.length > 4 && (
            <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
              ...
            </span>
          )}
        </div>
        <div className="flex gap-0.5 mt-1 items-center flex-wrap">
          {countries.slice(0, 4).map((country) => (
            <span key={country} className="bg-green-100 text-green-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
              {country}
            </span>
          ))}
          {countries.length > 4 && (
            <span className="bg-green-100 text-green-800 text-[10px] font-semibold px-1 py-0.5 rounded-full">
              ...
            </span>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default SwipeCard;
