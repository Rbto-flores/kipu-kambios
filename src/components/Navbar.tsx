import React, { useState } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const [selected, setSelected] = useState('Inicio');

    const handleOptionClick = (option: string) => {
        setSelected(option);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent text-white shadow-lg h-[120px]">
            <div className="flex items-center justify-between h-full p-4 w-full">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="https://res.cloudinary.com/djc7lpgib/image/upload/v1730430036/image-removebg-preview_4_tigezr.png" // Reemplaza con la URL del logo
                        alt="Logo"
                        width={220}
                        height={100}
                        className="mr-4"
                    />
                </div>

                {/* Opciones de navegación */}
                <div className="flex space-x-8 flex-grow justify-center">
                    {['Inicio', 'Operador P2P', 'Plataforma P2P'].map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="cursor-pointer relative"
                        >
                            <span className="text-2xl font-semibold font-['Lobster', 'cursive']">{option}</span>
                            {selected === option && (
                                <span
                                    className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#04FFB7] mx-auto"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Botón de conectar wallet */}
                <button
                    onClick={() => { /* Función vacía para el botón */ }}
                    className="ml-4 px-4 py-2 rounded bg-[#04FFB7] text-black text-lg"
                >
                    Conectar Wallet
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
