'use client';

import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import SwipeCard from '../components/SwipeCard';

export default function Home() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Интерстеллар',
      englishTitle: 'Interstellar',
      releaseYear: 2014,
      image: 'https://i.pinimg.com/736x/8e/0d/ab/8e0dab8699be85720ce55845065bf6dc.jpg',
      imdbRating: 8.6,
      kinopoiskRating: 8.7,
      genres: ['Научная фантастика', 'Приключения', 'Драма'],
      description: 'Фильм о путешествии через червоточину в поисках нового дома для человечества.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США', 'Великобритания']
    },
    {
      id: 2,
      title: 'Начало',
      englishTitle: 'Inception',
      releaseYear: 2010,
      image: 'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_SX400_CR0',
      imdbRating: 8.8,
      kinopoiskRating: 8.7,
      genres: ['Экшн', 'Научная фантастика', 'Триллер'],
      description: 'Фильм о воровстве идей через проникновение в сны.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США']
    },
    {
      id: 3,
      title: 'Матрица',
      englishTitle: 'The Matrix',
      releaseYear: 1999,
      image: 'https://i.pinimg.com/736x/8a/71/6b/8a716b0f184fd6f2d2d944ed57bae85b.jpg',
      imdbRating: 8.7,
      kinopoiskRating: 8.5,
      genres: ['Экшн', 'Научная фантастика'],
      description: 'Фильм о виртуальной реальности и борьбе за свободу.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США', 'Австралия']
    },
    {
      id: 4,
      title: 'Назад в будущее',
      englishTitle: 'Back to the Future',
      releaseYear: 1985,
      image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/2e6ca490-7471-4f59-8fed-c5e151777f06/1920x',
      imdbRating: 8.5,
      kinopoiskRating: 8.6,
      genres: ['Приключения', 'Комедия', 'Научная фантастика'],
      description: 'Фильм о путешествиях во времени и изменении истории.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США']
    },
    {
      id: 5,
      title: 'Бойцовский клуб',
      englishTitle: 'Fight Club',
      releaseYear: 1999,
      image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/ff34cf01-808c-44b4-a42a-67fdd7924170/1920x',
      imdbRating: 8.8,
      kinopoiskRating: 8.7,
      genres: ['Драма'],
      description: 'Фильм о внутренней борьбе и создании подпольного бойцовского клуба.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США', 'Германия']
    },
    {
      id: 6,
      title: 'Как трусливый Роберт Форд убил Джесси Джеймса',
      englishTitle: 'The Assassination of Jesse James by the Coward Robert Ford',
      releaseYear: 2023,
      image: 'https://avatars.mds.yandex.net/get-mpic/1927422/2a0000018e1d13cb3ad60d2ab419f88bc416/orig',
      imdbRating: 9.0,
      kinopoiskRating: 9.1,
      genres: ['Драма', 'Комедия', 'Триллер', 'Фантастика', 'Приключения', 'Мистика', 'Боевик', 'Фэнтези', 'Исторический', 'Биография'],
      description: 'Фильм о жизни и смерти известного преступника Джесси Джеймса.',
      trailerUrl: 'https://www.youtube.com/watch?v=YihPA42fdQ8',
      countries: ['США', 'Канада', 'Великобритания', 'Австралия', 'Германия', 'Франция', 'Италия', 'Испания']
    }
  ]);

  const handleSwipe = (direction: string, movieId: number) => {
    console.log(`Свайп ${direction} для фильма с id: ${movieId}`);
    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
  };

  const handleCardLeftScreen = (movieId: number) => {
    console.log(`Карточка с id: ${movieId} покинула экран`);
    // Здесь можно добавить дополнительную логику, если необходимо
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <div className="w-80 h-[500px] relative">
        {movies.map((movie) => (
          <TinderCard
            key={movie.id}
            onSwipe={(dir) => handleSwipe(dir, movie.id)}
            onCardLeftScreen={() => handleCardLeftScreen(movie.id)}
            preventSwipe={['up', 'down']}
          >
            <SwipeCard
              title={movie.title}
              englishTitle={movie.englishTitle}
              releaseYear={movie.releaseYear}
              image={movie.image}
              imdbRating={movie.imdbRating}
              kinopoiskRating={movie.kinopoiskRating}
              genres={movie.genres}
              description={movie.description}
              trailerUrl={movie.trailerUrl}
              onSwipe={(direction) => handleSwipe(direction, movie.id)}
              countries={movie.countries}
            />
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
