import styled from "styled-components";

export const Root = styled.div`
    padding: 10px;
    position: relative;
`;

export const Table = styled.div`
    display: grid;
    grid-template-columns: 800px repeat(13, 1fr);
    grid-template-rows: 100px repeat(19, 50px);

    & > * {
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & input {
        width: 100%;
    }
`;
