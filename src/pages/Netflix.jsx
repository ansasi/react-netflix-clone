import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import CardSlider from "../components/CardSlider";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Netflix = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  // const { user } = UserAuth();

  // const [likedShows, setLikedShows] = useState([]);
  // const [dislikedShows, setDislikedShows] = useState([]);
  // const [savedShows, setSavedShows] = useState([]);

  // useEffect(() => {
  //   if (user.email) {
  //     onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
  //       const likedShowsIds = doc.data()?.likedShows.map((likedShow) => {
  //         return likedShow.id;
  //       });
  //       setLikedShows(likedShowsIds);
  //       const dislikedShowsIds = doc.data()?.dislikedShows.map((dislikedShow) => {
  //         return dislikedShow.id;
  //       });
  //       setDislikedShows(dislikedShowsIds);
  //       const savedShowsIds = doc.data()?.savedShows.map((savedShow) => {
  //         return savedShow.id;
  //       });
  //       setSavedShows(savedShowsIds);
  //     });
  //   }
  // }, [user]);

  return (
    <>
      <Navbar />
      <Main genres={genres} />
      <CardSlider rowID="1" myList={true} title="My list" />
      <CardSlider rowID="2" data={getMoviesFromRange(0, 10)} title="For you" />
      <CardSlider rowID="3" data={getMoviesFromRange(10, 20)} title="Trending Now" />
      <CardSlider rowID="4" data={getMoviesFromRange(20, 30)} title="New Releases" />
      <CardSlider rowID="5" data={getMoviesFromRange(30, 40)} title="Blockbuster Movies" />
      <CardSlider rowID="6" data={getMoviesFromRange(40, 50)} title="Popular on Netflix" />
    </>
  );
};

export default Netflix;
