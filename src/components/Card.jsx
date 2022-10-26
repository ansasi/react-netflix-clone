import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
// import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpLine, RiThumbDownLine, RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

const Card = ({ item, isLiked = false, isDisliked = false, isSaved = false }) => {
  const [like, setLike] = useState(isLiked);
  const [dislike, setDislike] = useState(isDisliked);
  const [saved, setSaved] = useState(isSaved);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      if (!saved) {
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
      } else if (saved) {
        setSaved(false);
        await updateDoc(movieID, {
          savedShows: arrayRemove({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
      }
    }
  };

  const saveEvaluation = async (e) => {
    if (user?.email) {
      if (e === "Like") {
        setLike(true);
        setDislike(false);
        await updateDoc(movieID, {
          likedShows: arrayUnion({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
        await updateDoc(movieID, {
          dislikedShows: arrayRemove({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
      } else if (e === "Dislike") {
        setLike(false);
        setDislike(true);
        await updateDoc(movieID, {
          dislikedShows: arrayUnion({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
        await updateDoc(movieID, {
          likedShows: arrayRemove({
            id: item.id,
            title: item?.title ? item?.title : item?.name,
            image: item?.backdrop_path ? item?.backdrop_path : item?.image,
            genres: item?.genres,
          }),
        });
      }
    }
  };

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path ? item?.backdrop_path : item?.image}`}
        alt="card"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path ? item?.backdrop_path : item?.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            {/* <video src={video} autoPlay={true} loop muted onClick={() => navigate("/player")} /> */}
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {item?.title ? item?.title : item?.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
                {like ? (
                  <RiThumbUpFill title="Like" />
                ) : (
                  <RiThumbUpLine
                    title="Like"
                    onClick={() => {
                      saveEvaluation("Like");
                    }}
                  />
                )}
                {dislike ? (
                  <RiThumbDownFill title="Dislike" />
                ) : (
                  <RiThumbDownLine
                    title="Dislike"
                    onClick={() => {
                      saveEvaluation("Dislike");
                    }}
                  />
                )}
                {saved ? (
                  <BsCheck title="Remove from List" onClick={saveShow} />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={saveShow} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {item?.genres?.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Card);

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: 18rem;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
