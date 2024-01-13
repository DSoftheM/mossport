import { News } from "../../provider/api-provider";
import { CloseButton } from "../close-button";
import * as S from "./news.styled";

type Props = {
    news: News[];
    onClose: () => void;
};

export function NewsView(props: Props) {
    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <S.Title>Новости</S.Title>
            <S.NewsContainer>
                {props.news.map((newsItem, i) => (
                    <S.NewsItem key={i}>
                        <S.NewsItemTitle>{newsItem.title}</S.NewsItemTitle>
                        <S.NewsItemImg src={newsItem.imageUrl} />
                        <p>{newsItem.text}</p>
                    </S.NewsItem>
                ))}
            </S.NewsContainer>
        </S.Root>
    );
}
