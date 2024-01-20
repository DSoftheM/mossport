import styled from "styled-components";

export const Root = styled.div`
    position: relative;
    padding: 40px;

    @media (width < 746px) {
        padding: 20px;
    }
`;

export const Title = styled.h3`
    text-align: center;
`;

export const Shapes = styled.h3`
    display: grid;
    padding: 20px;
    /* height: 800px; */
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
    grid-auto-rows: 200px;
    gap: 20px;
    border-radius: 20px;
    text-align: center;

    @media (width < 1010px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (width < 746px) {
        grid-template-columns: 1fr;
    }
`;
