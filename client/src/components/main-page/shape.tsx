import * as S from "./shape.styled";

type ShapeType = "rectangle";

type ShapeProps = {
    title: string;
    shape: ShapeType;
    onClick: () => void;
};

export function Shape(props: ShapeProps) {
    return (
        <S.Rectangle style={{ backgroundColor: "lime" }} onClick={props.onClick}>
            <S.Title>{props.title}</S.Title>
        </S.Rectangle>
    );
}
