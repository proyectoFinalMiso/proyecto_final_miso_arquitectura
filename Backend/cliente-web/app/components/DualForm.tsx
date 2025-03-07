'use client';

import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { fabricanteFactory, pedidoFactory } from '../utils/mockData';
import { create_fabricante_url } from '../services/fabricante';
import useAxiosWithRedirect from '../hooks/useAxios';
import { create_pedido_url } from '../services/pedido';

const DualFormPage: React.FC = () => {
  const [newFabricante, setNewFabricante] = useState(fabricanteFactory());
  const [loadingManufacturer, setLoadingManufacturer] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { fetchData } = useAxiosWithRedirect();

  const handleCreateManufacturer = async () => {
    try {
      setLoadingManufacturer(true);
      const response = await fetchData({
        method: 'POST',
        url: create_fabricante_url(),
        data: newFabricante,
      });
      console.log('Fabricante creado:', response);
      setNewFabricante(fabricanteFactory());
      setSuccessMessage('¡Fabricante creado con éxito!');
      setTimeout(() => setSuccessMessage(null), 3000); // Ocultar mensaje después de 3s
    } catch (error) {
      console.error('Error creando fabricante:', error);
    } finally {
      setLoadingManufacturer(false);
    }
  };

  const [newPedido, setNewPedido] = useState(pedidoFactory());
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setLoadingOrder(true);
      const response = await fetchData({
        method: 'POST',
        url: create_pedido_url(),
        data: newPedido,
      });
      console.log('Pedido creado:', response);
      setNewPedido(pedidoFactory());
      setSuccessMessage('¡Pedido creado con éxito!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error creando pedido:', error);
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-normal text-center text-gray-900 mb-8">
          CPP
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Registro de Fabricante
            </h2>
            <div className="space-y-4">
              {Object.keys(newFabricante).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={newFabricante[key]}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              ))}
              {loadingManufacturer ? (
                <div className="mt-6 flex justify-center">
                  <ClipLoader color="#000000" />
                </div>
              ) : (
                <button
                  onClick={handleCreateManufacturer}
                  className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Crear Fabricante
                </button>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Creación de Pedido
            </h2>
            <div className="space-y-4">
              {Object.keys(newPedido).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}
                  </label>
                  <input
                    type={key === 'valorFactura' ? 'number' : 'text'}
                    name={key}
                    value={newPedido[key]}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              ))}
              {loadingOrder ? (
                <div className="mt-6 flex justify-center">
                  <ClipLoader color="#000000" />
                </div>
              ) : (
                <button
                  onClick={handleCreateOrder}
                  className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-blue-700"
                >
                  Crear Pedido
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualFormPage;
