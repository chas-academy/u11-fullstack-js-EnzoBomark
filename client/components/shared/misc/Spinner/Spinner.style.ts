import styled, { keyframes } from 'styled-components';

const fill = keyframes`
    0%{
        -webkit-transform-origin:0 0;
        transform-origin:0 0;
        -webkit-transform:scaleX(0);
        transform:scaleX(0)
    }
    49%{
        -webkit-transform-origin:0 0;
        transform-origin:0 0;
        -webkit-transform:scaleX(1);
        transform:scaleX(1)
    }
    51%{
        -webkit-transform:scaleX(1);
        transform:scaleX(1);
        -webkit-transform-origin:100% 0;
        transform-origin:100% 0
    }
    100%{
        -webkit-transform:scaleX(0);
        transform:scaleX(0);
        -webkit-transform-origin:100% 0;
        transform-origin:100% 0
    }
`;

const Progress = styled.div`
  max-width: 18.75rem;
  width: 100%;
  height: 0.125rem;
  background: lighten(#202020, 6%);
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 15px;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${fill} 1.5s infinite ease;
  background: white;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 200ms ease;
`;

export const S = { Progress, Bar };
