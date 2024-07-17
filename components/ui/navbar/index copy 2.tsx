import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section with Home and NFT */}
          <div className="flex">
            <a href="/" className="text-gray-800 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="/nft" className="ml-4 text-gray-800 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
              NFT
            </a>
          </div>

          {/* Center section with logo */}
          <div className="flex items-center">
            <span className="text-black text-2xl font-bold">Luxsy</span>
          </div>

          {/* Right section with Connect, cart, and profile */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-800 hover:text-black font-medium">Connect</a>
            <a href="#" className="text-gray-800 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 13H5L3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </a>
            <a href="#" className="text-gray-800 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 20.121a3 3 0 11-4.242-4.242 3 3 0 014.242 4.242zm14.142 0a3 3 0 11-4.242-4.242 3 3 0 014.242 4.242zM12 4a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;