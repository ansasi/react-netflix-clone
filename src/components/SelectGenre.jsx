import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      {type === "tv" ? <h1>TV Shows</h1> : type === "movie" ? <h1>Movies</h1> : <></>}
      <Select
        className="flex"
        onChange={(e) => {
          dispatch(
            fetchDataByGenre({
              genres,
              genre: e.target.value,
              type,
            })
          );
        }}>
        {genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </Select>
    </Container>
  );
};

export default SelectGenre;

const Container = styled.div`
  h1 {
    font-size: 3rem;
    margin-left: 3rem;
    padding-bottom: 2rem;
  }
`;

const Select = styled.select`
  margin-top: -4.4rem;
  margin-left: 18rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;
