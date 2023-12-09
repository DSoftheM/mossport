import styled from "styled-components";

export const Root = styled.div`
    display: flex;
    background-color: slateblue;
    height: 100%;
`;

export const Side = styled.div`
    flex-basis: 50%;
`;

export const Title = styled.div`
    color: black;
    text-align: center;
    font-size: 40px;
`;

export const InputTitle = styled.div`
    text-decoration: dashed;
    
`;

export const Body = styled.div`
    display: flex;
    margin-top: 40px;
    text-align: center;
`;

export const Security = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    padding: 10px 20px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Button = styled.button`
    background-color: rgb(122, 185, 122);
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    transition: all 0.3s ease 0s;

    &:hover {
        background-color: rgb(159, 240, 159);
    }
`;
