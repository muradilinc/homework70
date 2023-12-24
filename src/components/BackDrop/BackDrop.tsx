import React from 'react';

interface Props {
  onClose: React.MouseEventHandler;
}

const BackDrop: React.FC<Props> = ({onClose}) => {
  return (
    <div className="bg-gray-400 fixed inset-0 opacity-50" onClick={onClose}/>
  );
};

export default BackDrop;