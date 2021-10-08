import styled from 'styled-components';

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InteractionBar = styled.div`
  display: flex;
  width: 90vw;
  gap: 10px;
  max-width: 60rem;
  margin-bottom: 2.5rem;
`;

export const S = { Article, InteractionBar };
