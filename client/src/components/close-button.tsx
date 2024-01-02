import { IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    onClose: () => void;
};

const Root = styled.div`
    transition: all 0.3s ease 0s;
    position: absolute;
    right: 0;
    top: 0;

    &:hover {
        transform: rotate(360deg);
    }
`;

export function CloseButton(props: Props) {
    return (
        <Root>
            <Tooltip
                title="Закрыть"
                placement="top"
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: "offset",
                                options: {
                                    offset: [0, -14],
                                },
                            },
                        ],
                    },
                }}
            >
                <IconButton>
                    <CloseIcon onClick={props.onClose} sx={{ cursor: "pointer" }} />
                </IconButton>
            </Tooltip>
        </Root>
    );
}
