import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'd2a00cc1f1a10798ef46eaf4ce97f962',
    language: 'en-US',
  },
});

const tvApi = {
  popular: () => api.get('tv/popular'),
};

export const fetchData = async () => {
  const tmdbData = await tvApi.popular();
  console.log(tmdbData.data.results);
  return tmdbData.data.results.map((movie) => ({
    title: movie.name,
    poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
  }));
};

export function fetchNextPage() {
  return movies.map((m) => ({ title: m }));
}
