import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { UserAuth } from "../context/AuthContext";
// import { db } from "../firebase";
// import { doc, onSnapshot } from "firebase/firestore";

const initialState = {
  movies: [],
  myList: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_IMDB_API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk("netflix/genre", async ({ genre, type }, thunkAPI) => {
  const {
    netflix: { genres },
  } = thunkAPI.getState();
  return getRawData(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_IMDB_API_KEY}&with_genres=${genre}`,
    genres
  );
});

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkAPI) => {
  const {
    netflix: { genres },
  } = thunkAPI.getState();
  return getRawData(
    `https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.REACT_APP_IMDB_API_KEY}`,
    genres,
    true
  );
});

// export const getUsersLikedMovies = createAsyncThunk("netflix/getMyList", async () => {
//   const { user } = UserAuth();
//   onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
//     console.log(doc.data()?.savedShows);
//     console.log("hola");
//     return doc.data()?.savedShows;
//   });
// });

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload; // state.genres = action.payload;
      state.genresLoaded = true; // state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload; // state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload; // state.movies = action.payload;
    });
    // builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
    //   state.myList = action.payload;
    // });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export const { setGenres, setMovies } = NetflixSlice.actions;
