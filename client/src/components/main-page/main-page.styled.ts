import styled, { css, keyframes } from "styled-components";
import bgPath from "./bg.png";
import { motion } from "framer-motion";

export const Root = styled.div`
    min-height: 100vh;
    padding-top: 10px;
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
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    margin-bottom: 40px;
`;

export const Avatar = styled(motion.div)`
    color: white;
    background-color: slateblue;
    width: 50px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: slateblue;
        background-color: white;
    }
`;

const slide = keyframes`
    to {
        opacity: 1;
    }
`;

export const Title = styled.h3`
    white-space: nowrap;
`;

export const Title2 = styled.h3`
    white-space: nowrap;
    opacity: 0;
    animation: ${slide} 0.5s ease 0s 1 forwards;
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
    border-radius: 20px;

    @media (width < 1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (width < 600px) {
        grid-template-columns: 1fr;
    }
`;
