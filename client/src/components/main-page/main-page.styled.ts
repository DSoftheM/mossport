import styled, { css } from "styled-components";
import bgPath from "./bg.png";

export const Root = styled.div`
    padding-top: 10px;
    min-height: 100vh;
    background: url(${bgPath}) center / cover no-repeat;
`;

export const Container = styled.div`
    max-width: 1820px;
    padding: 0 10px;
    margin: 0 auto;
`;

export const HeaderContainer = styled.div``;

export const Header = styled.div`
    height: 70px;
    background-color: peachpuff;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    margin-bottom: 40px;
`;

export const Avatar = styled.div`
    color: white;
    background-color: slateblue;
    flex-basis: 50px;
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease 0s;

    &:hover {
        color: slateblue;
        background-color: white;
    }
`;

export const Title = styled.h3`
    width: 0;
    white-space: nowrap;
`;

export const Logo = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
`;

export const Body = styled.div`
    position: relative;
    display: grid;
    padding: 20px;
    height: 800px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
    gap: 20px;
    background-color: #ab9ff5;
    backdrop-filter: blur(7px) saturate(95%);
    border-radius: 20px;
`;
