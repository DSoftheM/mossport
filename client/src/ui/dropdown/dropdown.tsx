type DropdownItem<V> = {
    id: number;
    value: V;
    text: string;
};

type Props<V> = {
    items: DropdownItem<V>[];
    selectedId: string;
    onChange: (value: V) => void;
};

export function Dropdown<V>(props: Props<V>) {
    return <>dropdown</>;
}
