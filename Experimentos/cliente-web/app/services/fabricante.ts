import { FABRICANTES_API_URL } from '../utils/constants';

const create_fabricante_url = (): string => {
  return `${FABRICANTES_API_URL}/fabricante/crear`;
};

export { create_fabricante_url };
