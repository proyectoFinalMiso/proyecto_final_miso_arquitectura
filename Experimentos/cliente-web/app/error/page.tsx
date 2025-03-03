import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-8 py-12 text-center">
          <h1 className="text-3xl font-normal text-center text-gray-900 mb-8">
            Error de servicio
          </h1>
          <div className="space-y-6">
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-xl text-gray-700 mt-4">
                Lo sentimos, algo ha fallado
              </p>
              <p className="text-gray-500 mt-2">
                No se ha podido ejecutar el servicio solicitado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
