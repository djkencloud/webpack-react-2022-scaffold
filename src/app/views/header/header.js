import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const data = useSelector((state) => state.data.data);
  console.log('data in header comp ', data);

  return (
    <div>
      <h1>Header Test</h1>
    </div>
  );
}
