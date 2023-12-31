import styled, { css } from "styled-components";
import bgPath from "./bg.png";
import { motion } from "framer-motion";

export const Root = styled.div`
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
    background-color: peachpuff;
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
