import React, { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

const Navbar: React.FC = () => {
    const [selected, setSelected] = useState('Inicio');

    const handleOptionClick = (option: string) => {
        setSelected(option);
    };

    return (
        <nav tw="fixed top-0 left-0 right-0 z-50 bg-transparent text-gray-800 shadow-lg">
            <div tw="flex items-center justify-between p-4">
                {/* Logo */}
                <div tw="flex items-center">
                    <Image
                        src="" // Reemplaza con la URL del logo
                        alt="Logo"
                        width={50}
                        height={50}
                        tw="mr-4"
                    />
                </div>

                {/* Opciones de navegación */}
                <div tw="flex space-x-8">
                    {['Inicio', 'Operador P2P', 'Plataforma P2P'].map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            tw="cursor-pointer relative"
                        >
                            <span>{option}</span>
                            {selected === option && (
                                <span
                                    tw="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#04FFB7] mx-auto"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Botón de conectar wallet */}
                <button
                    onClick={() => { /* Función vacía para el botón */ }}
                    tw="ml-4 px-4 py-2 rounded bg-[#04FFB7] text-black"
                >
                    Conectar Wallet
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
