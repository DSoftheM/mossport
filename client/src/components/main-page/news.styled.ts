import styled from "styled-components";

export const Root = styled.div`
    padding: 20px;
    position: relative;
`;

export const Title = styled.h3`
    text-align: center;
    margin-bottom: 40px;
`;

export const NewsContainer = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;

    @media (width < 1232px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (width < 667px) {
        grid-template-columns: 1fr;
    }
`;

export const NewsItem = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
`;

export const NewsItemTitle = styled.h3`
    margin-bottom: 20px;
`;

export const NewsItemImg = styled.img`
    margin-bottom: 30px;
    height: 400px;
    width: 100%;
    object-fit: cover;
`;
