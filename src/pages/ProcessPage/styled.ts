import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TableContainer = styled.div`
  display: flex;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: 10px;
  width: 45vw;
`;

export const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  width: 100%;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

export const Button = styled.button`
  padding: 5px 10px;
  width: 100%;
  font-size: 14px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
`;

export const ApplyButton = styled.button`
  margin-bottom: 10px;
  padding: 15px 20px;
  font-size: 20px;
  width: 50vw;
  padding: 15px;
`;
