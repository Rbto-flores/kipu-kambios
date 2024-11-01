import React from 'react';

// Define las props del componente, incluyendo 'children'
interface MyComponentProps {
  imageUrl: string;
  children?: React.ReactNode; // 'children' es opcional
}

const MyComponent: React.FC<MyComponentProps> = ({ imageUrl, children }) => {
  return (
    <div>
      <img src={imageUrl} alt="Imagen" />
      <div>{children}</div> {/* Aquí es donde se renderizan los children */}
    </div>
  );
};

export default MyComponent;
