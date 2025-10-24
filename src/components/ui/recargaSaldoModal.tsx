'use client';
import { useState } from 'react';
import Button from '@/components/ui/button';
import cn from '@/utils/cn';
import { useRouter } from 'next/navigation'; // Agrega esta importación


export default function RecargaSaldoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Usa el router para redirigir

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button shape="rounded" onClick={() => setIsOpen(true)}>
        Recargar Saldo
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-light-dark p-6 shadow-card dark:bg-gray-900 xl:p-8 w-96">
            <h2 className="text-center text-lg font-semibold text-white mb-4">
              Seleccione el método de recarga
            </h2>
            <div className="flex flex-col gap-4">
              <Button
                shape="rounded"
                className="w-full"
                onClick={() => window.open('https://crypto.com/', '_blank')}

              >
                Recargar con Cripto.com
              </Button>
              <Button
                shape="rounded"
                className="w-full"
                onClick={() => router.push('/card')}
              >
                Pago en Línea
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button
                shape="rounded"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}