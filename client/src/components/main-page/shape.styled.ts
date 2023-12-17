import styled, { css } from "styled-components";

export const Rectangle = styled.div<{ $opened: boolean }>`
    border-radius: 20px;
    overflow: auto;

    ${(props) =>
        props.$opened
            ? css`
                  position: absolute;
                  inset: 0;
              `
            : css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.3s ease 0s;

                  &:hover {
                      font-size: 24px;
                      transform: scale(0.9);
                  }
              `}
`;

export const Close = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
`;

export const Title = styled.h3``;
