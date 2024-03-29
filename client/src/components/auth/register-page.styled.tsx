import styled from "@emotion/styled";
import bgPath from "../main-page/bg.png";
import _Button from "@mui/material/Button";
import { css, keyframes } from "@emotion/react";

const disappear = keyframes`
    to {
        opacity: 0;
    }
`;

export const Root = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    min-height: 100vh;
    position: relative;
    /* background: url(${bgPath}) center / cover no-repeat; */

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: sienna;
        pointer-events: none;
        animation: ${disappear} 1.2s ease 0s 1 forwards;
    }

    @media (width < 700px) {
        justify-content: center;
    }
`;

export const Side = styled.div`
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ImgSide = styled.div`
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background-color: #fc4f4f;

    @media (width < 700px) {
        display: none;
    }
`;

export const Title = styled.div`
    color: black;
    text-align: center;
    font-size: 40px;
    white-space: nowrap;

    @media (width < 550px) {
        white-space: normal;
        font-size: 30px;
    }
`;

export const InputTitle = styled.div`
    text-decoration: dashed;
`;

export const Link = styled.a`
    margin-top: 10px;
    text-decoration: underline;
    color: slateblue;
    cursor: pointer;
`;

export const Body = styled.div`
    display: flex;
    margin-top: 40px;
    gap: 80px;
    text-align: center;

    @media (width < 1200px) {
        flex-direction: column;
    }
`;

export const Security = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    padding: 10px 20px;
`;

export const Error = styled.p`
    color: red;
    font-weight: 100;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
