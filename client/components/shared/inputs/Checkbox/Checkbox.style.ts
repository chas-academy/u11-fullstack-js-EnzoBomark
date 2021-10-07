import styled, { css } from 'styled-components';
import { checkbox } from '@/styles/Input.style';
import { mainTheme } from '@/styles/Themes';

const Checkbox = styled(checkbox)<{ active: boolean }>`
  background: ${(props) => props.theme['color-background']};

  cursor: pointer;
  text-indent: 3.9375rem;
  line-height: 1.8;
  border: $border;
  width: 3.375rem;
  height: 1.75rem;
  display: block;
  border-radius: 6.25rem;
  position: relative;
  white-space: nowrap;
  border: ${mainTheme['border-sm']};

  &:after {
    content: '';
    position: absolute;
    top: 0.3125rem;
    left: 0.3125rem;
    width: 1rem;
    height: 1rem;
    background: white;
    border-radius: 5.625rem;
    transition: 0.3s;
  }

  &:hover {
    border: ${mainTheme['border-hover']};
  }

  ${(props) =>
    props.active &&
    css`
      background: ${(props) => props.theme['color-light-gray']};

      &:after {
        left: calc(100% - 0.3125rem);
        transform: translateX(-100%);
      }
    `}
`;

const Wrapper = styled.div`
  margin-top: 1.875rem;
  width: 100%;
  max-width: 23rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const S = { Checkbox, Wrapper };
