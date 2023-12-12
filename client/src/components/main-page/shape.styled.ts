import styled, { css } from "styled-components";

export const Rectangle = styled.div<{ opened: boolean }>`
    border-radius: 20px;

    ${(props) =>
        props.opened
            ? css`
                  position: absolute;
                  inset: 0;
              `
            : css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
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
`;

export const Title = styled.h3``;
