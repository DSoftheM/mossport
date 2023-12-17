import { useRef, useState } from "react";
import styled from "styled-components";
import { useClickOutside } from "./use-click-on-outside";

type DropdownItem<V> = {
    id: string;
    value: V;
    text: string;
};

type Props<V> = {
    items: DropdownItem<V>[];
    selectedId?: string | null;
    onChange: (value: V) => void;
};

const Root = styled.div`
    position: relative;
`;

const Field = styled.div`
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    transition: all 0.1s ease 0s;

    &:hover {
        background-color: #cacaca;
    }
`;

const Popover = styled.div`
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    top: 100%;
`;

const Item = styled.div<{ selected: boolean }>`
    cursor: pointer;
    ${(props) => props.selected && `background-color: #cacaca;`}

    &:hover {
        background-color: #cacaca;
    }
`;

export function Dropdown<V>(props: Props<V>) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useClickOutside(ref, () => setIsOpen(false));

    function renderSelected() {
        return (
            <Field onClick={() => setIsOpen(!isOpen)}>
                {props.items.find((x) => x.id === props.selectedId)?.text ?? "Не выбрано"}
            </Field>
        );
    }

    return (
        <Root ref={ref}>
            {renderSelected()}
            {isOpen && (
                <Popover>
                    {props.items.map((item) => (
                        <Item
                            selected={item.id === props.selectedId}
                            onClick={() => {
                                props.onChange(item.value);
                                setIsOpen(false);
                            }}
                        >
                            {item.text}
                        </Item>
                    ))}
                </Popover>
            )}
        </Root>
    );
}
