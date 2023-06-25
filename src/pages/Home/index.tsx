import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled(Link)`
  margin: 10px;
  padding: 15px 30px;
  font-size: 20px;
  text-decoration: none;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Button to="insert">Insert data</Button>
      <Button to="process">Process data</Button>
    </PageContainer>
  );
};

export default HomePage;
