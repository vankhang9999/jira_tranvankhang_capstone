import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import style from "./Login.module.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { quanLyNguoiDungAction } from "../../store/actions/quanLyNguoiDungActions";

const Login = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  return (
    <form
      className={`${style["bodyLogin"]}`}
      onSubmit={handleSubmit((data) => {
        const action = quanLyNguoiDungAction.dangNhapAction(data);
        dispatch(action);
      })}
    >
      <MainContainer>
        <WelcomeText>Welcome</WelcomeText>
        <div className={`${style["inputContainer"]}`}>
          <input
            {...register("email", { required: true })}
            className={`${style["input"]}`}
            type="text"
            placeholder="Email"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Chưa nhập email!</p>
          )}
          <input
            {...register("password", { required: true })}
            className={`${style["input"]}`}
            type="password"
            placeholder="Password"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Chưa nhập mật khẩu!</p>
          )}
        </div>
        <div className={`${style["buttonContainer"]}`}>
          <button className={`${style["buttonn"]}`} type="submit">
            Sign in
          </button>
        </div>
        <LoginWith>OR LOGIN WITH</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FaFacebookF />
          </Icon>
          <Icon color={InstagramBackground}>
            <FaInstagram />
          </Icon>
          <Icon color={TwitterBackground}>
            <FaTwitter />
          </Icon>
        </IconsContainer>
        <ForgotPassword>Forgot Password ?</ForgotPassword>
      </MainContainer>
    </form>
  );
};

export default Login;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;
