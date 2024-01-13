import styled from "styled-components";

export const Root = styled.div`
    position: relative;
    padding: 40px;
`;

export const Title = styled.h3`
    text-align: center;
`;

export const Shapes = styled.h3`
    display: grid;
    padding: 20px;
    height: 800px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
    gap: 20px;
    border-radius: 20px;
`;
