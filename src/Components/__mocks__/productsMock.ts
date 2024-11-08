export const mockProducts = [
  {
    id: "123",
    item: {
      _id: "123",
      name: "Product 1",
      price: "10.00",
      photo: ["url"],
      marca: "Brand A",
      wholesalePrice: "4500",
      quantity: "10 UNIDADES",
    },
    quantities: { "": 2 },
    totalQuantities: 2,
    totalPrice: 20.0,
  },
  {
    id: "456",
    item: {
      _id: "456",
      name: "Product 2",
      price: "15.00",
      photo: ["url"],
      marca: "Brand B",
      wholesalePrice: "4500",
      quantity: "10 UNIDADES",
    },
    quantities: { Red: 1, Blue: 2 },
    totalQuantities: 3,
    totalPrice: 45.0,
  },
];


export const mockSearchByCode = jest.fn((code: string) => {
  const foundProduct = mockProducts.find((product) => product.id === code);
  return foundProduct ? foundProduct.item.name : "";
});
