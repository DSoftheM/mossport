import { ReactNode } from "react";
import * as S from "./shape.styled";

type ShapeType = "rectangle";

type ShapeProps = {
    title: string;
    shape: ShapeType;
    opened: boolean;
    renderExpandedContent: () => ReactNode;
    onClose: () => void;
    onClick: () => void;
};

export function Shape(props: ShapeProps) {
    return (
        <S.Rectangle style={{ backgroundColor: "lime" }} onClick={props.onClick} opened={props.opened}>
            {props.opened ? (
                <>
                    <S.Close
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onClose();
                        }}
                    >
                        Закрыть
                    </S.Close>
                    {props.renderExpandedContent()}
                </>
            ) : (
                <S.Title>{props.title}</S.Title>
            )}
        </S.Rectangle>
    );
}
