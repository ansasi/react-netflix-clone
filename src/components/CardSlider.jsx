import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Card from "./Card";

const CardSlider = ({ rowID, title, data, myList = false }) => {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [theseMovies, setTheseMovies] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    if (!myList) {
      setTheseMovies(data);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        if (myList) {
          setTheseMovies(doc.data()?.savedShows);
        }
        // const likedShowsIds = doc.data()?.likedShows.map((likedShow) => {
        //   return likedShow.id;
        // });
        // const dislikedShowsIds = doc.data()?.dislikedShows.map((dislikedShow) => {
        //   return dislikedShow.id;
        // });
        // const savedShowsIds = doc.data()?.savedShows.map((savedShow) => {
        //   return savedShow.id;
        // });
        // setLikedShows(likedShowsIds);
        // setDislikedShows(dislikedShowsIds);
        // setSavedShows(savedShowsIds);
      });
    }
  }, [user]);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${270 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 10) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}>
          <MdChevronLeft onClick={() => handleDirection("left")} />
        </div>
        <div id={"slider" + rowID} className="slider flex" ref={listRef}>
          {theseMovies?.map((item, id) => (
            <Card
              key={id}
              item={item}
              // isLiked={likedShows.includes(id)}
              // isDisliked={dislikedShows.includes(id)}
              isSaved={myList} // || savedShows.includes(id)
            />
          ))}
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
          <MdChevronRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
};

export default React.memo(CardSlider);

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      cursor: pointer;
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 1.2rem;
      width: 50px;
      transition: 0.3s ease-in-out;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0.6;
      &:hover {
        opacity: 0.9;
        background-color: rgba(0, 0, 0, 0.5);
      }
      svg {
        font-size: 3rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
