import React from 'react';
import { SubLines, SubTitle } from '../styled';

const ModalRow: React.FC<{ name: string; lines: string[] }> = ({
  name,
  lines,
}) => {
  if (lines.length == 0) return <></>;

  return (
    <div>
      <SubTitle>{name}:</SubTitle>
      {lines.map((text, i) => (
        <SubLines key={Math.random() * i}>{text}</SubLines>
      ))}
    </div>
  );
};

export default ModalRow;
