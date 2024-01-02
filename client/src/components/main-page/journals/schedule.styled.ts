import styled from "styled-components";

export const Root = styled.div`
    padding: 20px;
    position: relative;
`;

export const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 50px repeat(11, 50px);

    & > * {
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
