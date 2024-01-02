import styled from "styled-components";

export const Root = styled.div`
    padding: 10px;
`;

export const Table = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
    grid-template-rows: 50px 50px;
    grid-auto-rows: 40px;

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
