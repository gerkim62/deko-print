"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">
            Deko Print
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Services
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Printing
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Repairs
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Shop
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-blue-600"
          >
            Contact
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden text-blue-600 border-blue-600"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-inner">
          <nav className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Services
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Printing
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Repairs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Shop
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 justify-start"
            >
              Contact
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
