const generateRandomEmail = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let name = '';

  for (let i = 0; i < 8; i++) {
    name += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${name}@${domain}`;
};

const fabricanteFactory = () => {
  const names = [
    'Toyota',
    'Ford',
    'BMW',
    'Honda',
    'Tesla',
    'Renault',
    'Fiat',
    'Samsung',
    'Sony',
    'LG',
    'Panasonic',
    'Philips',
    'Intel',
    'AMD',
    'Microsoft',
    'Apple',
    'Google',
    'Amazon',
    'Facebook',
    'Netflix',
    'Coca-Cola',
    'Pepsi',
    'Nike',
    'Adidas',
    'Puma',
    "McDonald's",
    'Burger King',
    'Airbus',
    'Boeing',
    'Siemens',
    'Bosch',
    'General Electric',
  ];

  const country = [
    'Japón',
    'EE.UU.',
    'Alemania',
    'Francia',
    'Italia',
    'Corea del Sur',
  ];

  const dateString = JSON.stringify(new Date());

  return {
    nombre:
      names[Math.floor(Math.random() * names.length)] + ' - ' + dateString,
    pais:
      country[Math.floor(Math.random() * country.length)] + ' - ' + dateString,
  };
};

const pedidoFactory = () => {
  const sampleData = {
    productos: ['Laptop', 'Teléfono', 'Tablet', 'Monitor'],
    cliente: ['Juan', 'María', 'Carlos', 'Ana'],
    vendedor: ['Pedro', 'Luis', 'Sofía', 'Diana'],
    destino: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'],
    estado: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
    valorFactura: () => (Math.random() * 1000 + 100).toFixed(2),
  };

  return {
    productos:
      sampleData.productos[
        Math.floor(Math.random() * sampleData.productos.length)
      ],
    cliente:
      sampleData.cliente[Math.floor(Math.random() * sampleData.cliente.length)],
    vendedor:
      sampleData.vendedor[
        Math.floor(Math.random() * sampleData.vendedor.length)
      ],
    destino:
      sampleData.destino[Math.floor(Math.random() * sampleData.destino.length)],
    estado:
      sampleData.estado[Math.floor(Math.random() * sampleData.estado.length)],
    valorFactura: sampleData.valorFactura(),
  };
};

export { generateRandomEmail, fabricanteFactory, pedidoFactory };
