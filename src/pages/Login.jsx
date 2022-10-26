import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="menu">
          <div className="menu-background">
            <div className="form-container">
              <div className="title">
                <h1>Sign In</h1>
              </div>
              {error ? <p className="error">{error}</p> : null}
              <form onSubmit={handleLogIn}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
                <button>Sign In</button>
                <div className="extra1 flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="extra2">
                  <span>New to Netflix?</span>{" "}
                  <Link to="/signup" className="link">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-rows: 12vh 88vh;
    .menu {
      position: relative;
      padding-top: 6rem /* 96px */;
      padding-bottom: 6rem /* 96px */;
      padding-top: 1rem /* 96px */;
      padding-bottom: 6rem /* 96px */;
      z-index: 50;
      justify-content: center;
      .menu-background {
        max-width: 450px;
        height: 600px;
        margin-left: auto;
        margin-right: auto;
        color: white;
        background-color: rgba(0, 0, 0, 0.75);
        .form-container {
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
          padding-top: 4rem /* 64px */;
          padding-bottom: 4rem /* 64px */;
          .title {
            font-size: 1.1rem /* 30px */;
            line-height: 2.25rem /* 36px */;
            font-weight: 700;
          }
          .error {
            margin-top: 0.5rem /* 8px */;
            margin-bottom: 0.5rem /* 8px */;
            padding: 0.75rem /* 12px */;
            background-color: rgba(248, 113, 113, 1);
          }
          form {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-top: 1rem /* 16px */;
            padding-bottom: 1rem /* 16px */;
            padding-top: 2rem /* 16px */;
            padding-bottom: 1rem /* 16px */;
            input {
              font-size: 1rem;
              margin-top: 0.5rem /* 8px */;
              margin-bottom: 0.5rem /* 8px */;
              padding: 0.75rem;
              background-color: #4a4a4a;
              border-radius: 0.25rem /* 4px */;
              color: white;
              ::placeholder,
              ::-webkit-input-placeholder {
                color: #b4b4b4;
              }
            }
            button {
              margin-top: 1rem /* 8px */;
              padding: 0.75rem 1rem;
              background-color: rgba(220, 38, 38, 1);
              padding-top: 0.75rem /* 12px */;
              padding-bottom: 0.75rem /* 12px */;
              cursor: pointer;
              color: white;
              border-radius: 0.25rem /* 4px */;
              font-weight: 700;
              font-size: 1.05rem;
            }
            .extra1 {
              margin-top: 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              align-items: center;
              color: rgba(75, 85, 99, 1);
              p {
                input {
                  margin-right: 0.5rem /* 8px */;
                }
              }
            }
            .extra2 {
              padding-top: 2rem /* 32px */;
              padding-bottom: 2rem /* 32px */;
              span {
                color: rgba(75, 85, 99, 1);
              }
              .link {
                padding-left: 0.5rem;
                text-decoration: none;
                font-size: 1rem;
                color: white;
              }
            }
          }
        }
      }
    }
  }
`;
