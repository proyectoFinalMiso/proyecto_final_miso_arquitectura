import { v4 as uuidv4 } from "uuid"

interface Fabricante {
  nombre: string;
  pais: string;
}

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

const fabricanteFactory = async () => {
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
  const fabricante = {
    nombre:
      names[Math.floor(Math.random() * names.length)] + ' - ' + dateString + String(uuidv4()),
    pais:
      country[Math.floor(Math.random() * country.length)] + ' - ' + dateString,
  };

  return { nombre: fabricante.nombre, pais: fabricante.pais };
}

const pedidoFactory = () => {
  const sampleData = {
    cliente: "8a0a5ad9-c36c-4d1c-99ce-9a3ea679b23d",
    vendedor: "9eaacfa3-c17d-43c6-a41f-4d5468639b46",
    destino: "496 Calle de los libertadores, Ciudad de México, México",
    productos: [
      { "sku": 10026, "cantidad": 4 },
      { "sku": 10029, "cantidad": 1 },
      { "sku": 10031, "cantidad": 4 },
      { "sku": 10025, "cantidad": 5 }
    ]
  };

  return {
    productos:
      sampleData.productos,
    cliente:
      sampleData.cliente,
    vendedor:
      sampleData.vendedor,
    destino:
      sampleData.destino
  };
};

export { generateRandomEmail, fabricanteFactory, pedidoFactory };
