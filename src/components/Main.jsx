import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../Requests";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Main = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestNetflixOriginals).then((response) => {
      const moviesRawData = response.data.results;
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Container>
      <div className="hero">
        <img
          className="background-image"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title ? movie?.title : movie?.name}
        />
        <div className="gradient"></div>
        <div className="container">
          <div className="logo">
            <h1>{movie?.title ? movie?.title : movie?.name}</h1>
          </div>
          <p className="summary">{truncateString(movie?.overview, 350)}</p>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={() => navigate("/player")}>
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      object-fit: cover;
      filter: brightness(50%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      margin-left: 5rem;
      .logo {
        font-size: 250%;
        width: 50vw;
      }
      .summary {
        margin-top: 1rem;
        padding-right: 40rem;
        width: 100%;
        color: rgb(229, 231, 235, 1);
      }
      .buttons {
        margin: 2rem 5rem;
        margin-left: 0rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
