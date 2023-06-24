import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const Column = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const Heading = styled.h1`
  font-weight: bold;
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-size: 25px;
`;

export const Container = styled.div`
  margin: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 15px 20px;
  font-size: 20px;
`;

export const SubTitle = styled.h2`
  margin-block-end: 0;
  font-weight: 500;
`;

export const SubLines = styled.p`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;
