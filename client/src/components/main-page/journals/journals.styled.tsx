import styled from "styled-components";

export const Root = styled.div`
    padding: 20px;
`;

export const JournalPlate = styled.div`
    border-radius: 20px;
    border: 1px solid #000;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.1s ease 0s;

    &:hover {
        background-color: #ccc;
    }
`;
