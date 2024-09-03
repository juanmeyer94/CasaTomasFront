import React, { useState } from 'react';
import CartModal from '../Cart/cartModal';

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="relative flex items-center justify-between bg-sky-100 p-4 ">
            <div className="flex items-center ml-4 md:ml-14">
                <a href="/">
                    <img
                        src="/logoNavBarByJuliet.svg"
                        alt="Logo"
                        className="h-16 w-auto"
                    />
                </a>
            </div>

            <nav className="hidden md:flex md:justify-center md:space-x-8 lg:space-x-12 text-lg lg:text-xl font-semibold flex-1">
                <a href="/" className="hover:text-blue-800 transition-colors">Inicio</a>
                <a href="/aboutUs" className="hover:text-blue-800 transition-colors">Acerca de nosotros</a>
                <a href="/contact" className="hover:text-blue-800 transition-colors">Contacto</a>
                <a href="/howToBuy" className="hover:text-blue-800 transition-colors">Como comprar</a>
                <a href="/login" className="hover:text-blue-800 transition-colors">Login</a>
            </nav>

            <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
                <button
                    rel="noopener noreferrer"
                    onClick={handleCartModal}
                    className="focus:outline-none"
                >
                    <img
                        src="/shopping-cart.svg"
                        alt="Carrito"
                        className="h-10 w-10"
                    />
                </button>
                {isCartOpen && <CartModal handleCartModal={handleCartModal} />}
                <a
                    href="https://wa.me/+5493492279892"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/whatsapp.png"
                        alt="WhatsApp"
                        className="h-10 w-10"
                    />
                </a>
                <a href="/login" className="hidden md:flex items-center text-slate-500 hover:text-blue-800 transition-colors">
                    Login
                </a>
            </div>

            {/* Botón del Menú Móvil */}
            <button
                className="md:hidden flex items-center px-3 py-2 border rounded text-blue-800 border-blue-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {isMenuOpen && (
                <div className="absolute top-16 right-4 mt-4 z-10 bg-sky-100 shadow-lg rounded-lg w-48">
                    <nav className="flex flex-col items-center space-y-2 text-lg font-semibold">
                        <a href="/" className="hover:text-blue-800 transition-colors">Inicio</a>
                        <a href="/aboutUs" className="hover:text-blue-800 transition-colors">Acerca de nosotros</a>
                        <a href="/contact" className="hover:text-blue-800 transition-colors">Contacto</a>
                        <a href="/howToBuy" className="hover:text-blue-800 transition-colors">Como comprar</a>
                        <a href="/login" className="hover:text-blue-800 transition-colors">Login</a>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default NavBar;
