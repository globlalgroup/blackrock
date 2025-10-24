'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import { SearchIcon } from '../icons/search';

const Solicitud = () => {
  const [message, setMessage] = useState('');

  // Capturar el mensaje del input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Enviar el mensaje a la API en Next.js
  const handleSubmit = async () => {
    if (!message) {
      alert('Por favor, ingresa un mensaje.');
      return;
    }

    try {
      
     const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      alert(`Estado del envío: ${data.message}`);
    } catch (error) {
      console.error('Error enviando correo:', error);
      alert('Hubo un problema al enviar el correo.');
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <div className="mb-6 rounded-lg bg-white p-5 shadow-card dark:bg-light-dark xs:p-6 xs:pb-8">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Mis Solicitudes
        </h3>
        <div className="flex gap-4">
          <div className="flex-1 rounded-lg bg-white p-5 shadow-card dark:bg-light-dark xs:p-6 xs:pb-8">
            <div className="h-[300px] px-6 pt-1">

               <div className="relative flex items-center gap-4">
                  <SearchIcon className="absolute left-6 h-full text-gray-700 dark:text-white" />
                              <input
                                type="search"
                                autoFocus={true}
                                placeholder="Search..."
                                className="w-full border-x-0 border-b border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:focus:border-gray-500"
                              />
                              <Button shape="rounded" className="text-sm">
                                Crear
                              </Button>
              </div>
              <div className="h-60 md:h-32 xl:h-36">
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8 flex flex-col gap-4">
                      {/* Botón "Abrir" alineado a la derecha */}
                      <div className="flex justify-end">
                        <Button shape="rounded" className="text-sm">
                          Abrir
                        </Button>
                      </div>
          
                      {/* Textarea */}
                      <Textarea
                        placeholder="Add the proposal details here"
                        inputClassName="md:h-32 xl:h-36"
                      />
          
                      {/* Input y botón "Enviar" alineados correctamente */}
                      <div className="flex items-center gap-4">
                        <Input
                          className="w-full"
                          value={message}
                          onChange={handleChange}
                          placeholder="Escribe tu mensaje aquí..."
                        />
                         <Button shape="rounded" className="text-sm" onClick={handleSubmit}>
                  Enviar
                </Button>
                      </div>
                    </div>



              </div>
            </div>
         
      
    </section>
  );
};

export default Solicitud;