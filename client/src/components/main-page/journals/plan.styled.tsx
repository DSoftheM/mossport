import styled from "styled-components";

export const Root = styled.div`
    padding: 10px;
`;

export const Table = styled.div`
    display: grid;
    grid-template-columns: 400px repeat(13, 1fr);
    grid-template-rows: repeat(20, 50px);

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
