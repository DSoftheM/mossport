import { News } from "../../provider/api-provider";
import * as S from "./news.styled";

type Props = {
    news: News[];
};

export function NewsView(props: Props) {
    return (
        <S.Root>
            <S.Title>Новости</S.Title>
            <S.NewsContainer>
                {props.news.map((newsItem) => (
                    <S.NewsItem>
                        <S.NewsItemTitle>{newsItem.title}</S.NewsItemTitle>
                        <S.NewsItemImg src={newsItem.imageUrl} />
                        <p>{newsItem.text}</p>
                    </S.NewsItem>
                ))}
            </S.NewsContainer>
        </S.Root>
    );
}
