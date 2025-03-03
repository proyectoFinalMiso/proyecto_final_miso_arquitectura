import { PEDIDOS_API_URL } from '../utils/constants';

const create_pedido_url = (): string => {
  return `${PEDIDOS_API_URL}/pedido/crear`;
};

export { create_pedido_url };
