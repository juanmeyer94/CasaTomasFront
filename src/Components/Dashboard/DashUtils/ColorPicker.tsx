import React, { useState, useEffect } from 'react';

interface Color {
  id: number;
  name: string;
  path: string;
}

interface ColorPickerProps {
  colors: Color[];
  setNewProduct: (product: any) => void;
  currentColors?: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, setNewProduct, currentColors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set(currentColors));

  useEffect(() => {
    setSelectedColors(new Set(currentColors));
  }, [currentColors]);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleColorClick = (colorName: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedColors(prevSelectedColors => {
      const newSelectedColors = new Set(prevSelectedColors);
      if (newSelectedColors.has(colorName)) {
        newSelectedColors.delete(colorName);
      } else {
        newSelectedColors.add(colorName);
      }

      setNewProduct((prevState: any) => ({
        ...prevState,
        data: {
          ...prevState.data,
          items: prevState.data.items.map((item: any, index: any) => {
            if (index === 0) {
              return {
                ...item,
                colours: Array.from(newSelectedColors), 
              };
            }
            return item;
          }),
        },
      }));

      return newSelectedColors;
    });
  };

  const selectedColorsArray = Array.from(selectedColors);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-lg flex items-center space-x-2"
      >
        <span>
          Seleccionar colores
        </span>
        <div
          className="w-6 h-6 rounded-full"
          style={{ 
            backgroundColor: selectedColorsArray.length > 0 
              ? `url(${colors.find(color => color.name === selectedColorsArray[0])?.path || '#fff'})` 
              : '#fff'
          }}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-auto bg-white border border-gray-300 rounded shadow-lg z-50 p-2">
          <div className="grid grid-cols-4 gap-2 ">
            {colors.map(color => (
              <div
                key={color.id}
                onClick={(event) => handleColorClick(color.name, event)}
                className={`flex flex-col items-center cursor-pointer p-2 rounded ${selectedColors.has(color.name) ? 'bg-blue-300' : 'hover:bg-blue-100'}`}
              >
                <img
                  src={color.path}
                  alt={color.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <span className="mt-1 text-xs text-gray-700">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
