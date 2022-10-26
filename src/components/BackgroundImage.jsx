import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

const BackgroundImage = () => {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
};

export default BackgroundImage;

const Container = styled.div`
  z-index: 1;
  height: 100vh;
  width: 100vw;
  /* position: absolute; */
  img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
`;
