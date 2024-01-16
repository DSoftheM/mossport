import * as S from "./shape.styled";

type ShapeType = "rectangle";

type ShapeProps = {
    title: string;
    shape: ShapeType;
    onClick: () => void;
};

export function Shape(props: ShapeProps) {
    return (
        <S.Root>
            <S.Rectangle style={{ backgroundColor: "rgba(255,255,255,0.5)" }} onClick={props.onClick}>
                <S.Title>{props.title}</S.Title>
            </S.Rectangle>
        </S.Root>
    );
}
