import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";

const UserListedMovies = () => {
  return (
    <Container>
      <Navbar />
      <div className="data">
        <CardSlider rowID="1" myList={true} title="My list" />
      </div>
    </Container>
  );
};

export default UserListedMovies;

const Container = styled.div`
  .data {
    margin-top: 8rem;
  }
`;
