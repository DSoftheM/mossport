import styled, { css, keyframes } from "styled-components";
import bgPath from "../main-page/bg.png";

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
    background: url(${bgPath}) center / cover no-repeat;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: sienna;
        pointer-events: none;
        animation: ${disappear} 1.2s ease 0s 1 forwards;
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
`;

export const Title = styled.div`
    color: black;
    text-align: center;
    font-size: 40px;
    white-space: nowrap;
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

export const Button = styled.button<{ disabled: boolean }>`
    margin-top: 20px;
    background-color: rgb(122, 185, 122);
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    transition: all 0.3s ease 0s;

    ${(props) =>
        props.disabled &&
        css`
            pointer-events: none;
            opacity: 0.6;
        `}

    &:hover {
        background-color: rgb(159, 240, 159);
    }
`;
