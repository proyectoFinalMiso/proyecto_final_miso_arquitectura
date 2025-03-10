import { FABRICANTES_API_URL } from '../utils/constants';

const create_fabricante_url = (): string => {
  return `${FABRICANTES_API_URL}/api/productos/fabricante`;
};

export { create_fabricante_url };
