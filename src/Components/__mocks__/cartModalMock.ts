export const allProducts = [
    {
      data: {
        _id: "123",
        items: [
          {
            name: "Producto 1",
            marca: "Marca 1",
            price: "100",
            photo: ["url1"],
            wholesalePrice: "4500",
            quantity: "10 UNIDADES"
          },
        ],
        section: "Sección 1",
        subsection: "Subsección 1",
        offer: "Oferta 1",
      },
    },
    {
      data: {
        _id: "459",
        items: [
          {
            name: "Producto 2",
            marca: "Marca 2",
            price: "200",
            photo: ["url2"],
             wholesalePrice: "4500",
            quantity: "10 UNIDADES"
          },
        ],
        section: "Sección 2",
        subsection: "Subsección 2",
        offer: "Oferta 2",
      },
    },
  ]

  export const mockCartItems = [
    {
      id: "123",
      quantities: {
        Negro: 1,
        Blanco: 1,
      },
      models: {},
    },
    {
      id: "459",
      quantities: {
        "Modelo 1": 1,
      },
      models: {},
    },
  ]