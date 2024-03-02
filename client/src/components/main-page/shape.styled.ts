import styled from "styled-components";

export const Root = styled.div`
    transition: all 0.3s ease 0s;
    &:hover {
        font-size: 22px;
        padding: 15px;
    }
`;
export const Rectangle = styled.div`
    border-radius: 20px;
    overflow: auto;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Close = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
`;

export const Title = styled.h3`
    white-space: nowrap;
`;
