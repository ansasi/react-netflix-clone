import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import SelectGenre from "../components/SelectGenre";

const Movies = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const dispatch = useDispatch();

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
    }
    console.log(movies);
  }, [genresLoaded]);

  return (
    <Container>
      <Navbar />
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        <div className="space"></div>
        {movies.length ? (
          <>
            <CardSlider rowID="1" data={getMoviesFromRange(0, 15)} title="For you" />
            <CardSlider rowID="2" data={getMoviesFromRange(15, 30)} title="Trending Now" />
            <CardSlider rowID="3" data={getMoviesFromRange(30, 45)} title="Popular on Netflix" />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows available for the selected genre. Please select a different genre.
          </h1>
        )}
      </div>
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .space {
      padding-bottom: 2rem;
    }
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
