import styled from "styled-components";

export const Table = styled.div`
    display: grid;
    /* grid-template-columns: 50px 2fr 60px 50px 50px 50px 1fr 1fr; */
    grid-template-columns: repeat(8, 1fr);
    /* grid-template-rows: 100px; */
    /* grid-auto-rows: 100px; */

    & > * {
        border: 1px solid #000;
    }
`;

export const Date = styled.div`
    grid-column: 5 / span 2;
`;
