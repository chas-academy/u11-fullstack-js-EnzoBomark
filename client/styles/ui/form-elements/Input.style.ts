import styled from 'styled-components';

export const InputStyle = styled.div`
  label {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    span {
      color: white;
      margin-bottom: 0.25rem;
    }

    input {
      border-radius: 10px;
      padding: 1rem 6rem 1rem 1rem;
    }
  }
  span {
    color: red;
  }
`;
