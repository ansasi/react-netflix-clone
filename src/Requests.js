const key = process.env.REACT_APP_IMDB_API_KEY;

const requests = {
  requestGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
  // Netflix Originals
  requestNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213&with_genres=`,
  // All
  requestTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US&with_genres=`,
  requestPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&with_genres=`,
  requestTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&with_genres=`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&with_genres=`,
  // Shows
  requestPopularShows: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1&with_genres=`,
  requestTopRatedShows: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1&with_genres=`,
  requestTrendingShows: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&with_genres=`,
  // Movies
  requestPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&with_genres=`,
  requestTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1&with_genres=`,
  requestTrendingMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&with_genres=`,
};

export default requests;
