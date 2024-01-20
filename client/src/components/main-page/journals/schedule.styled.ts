import styled from "styled-components";

export const Root = styled.div`
    padding: 20px;
    position: relative;
    overflow: auto;
`;

export const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 1680px;

    & > * {
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
