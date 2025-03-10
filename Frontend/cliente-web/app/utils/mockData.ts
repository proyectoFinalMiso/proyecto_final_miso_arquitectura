import fabricanteMockData from '../fabricante_mock.json';
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
  const fabricantes: Fabricante[] = fabricanteMockData as Fabricante[];

  const randomIndex = Math.floor(Math.random() * fabricantes.length);
  const randomFabricante = fabricantes[randomIndex]

  const fabricanteNombre : string = randomFabricante.nombre + String(uuidv4());

  return { nombre: fabricanteNombre, pais: randomFabricante.pais };
}

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
