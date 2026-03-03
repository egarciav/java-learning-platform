import React, { useState } from 'react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'basics', title: 'Conceptos Básicos', level: 'Junior' },
    { id: 'control', title: 'Estructuras de Control', level: 'Junior' },
    { id: 'oop', title: 'POO', level: 'Junior-Mid' },
    { id: 'collections', title: 'Colecciones', level: 'Junior-Mid' },
    { id: 'exceptions', title: 'Excepciones', level: 'Mid' },
    { id: 'advanced', title: 'Intermedios', level: 'Mid' },
    { id: 'streams', title: 'Streams/Lambda', level: 'Mid' },
    { id: 'concurrency', title: 'Concurrencia', level: 'Mid' },
    { id: 'fileio', title: 'File I/O', level: 'Mid' },
    { id: 'jpa', title: 'JPA/Entidades', level: 'Mid' },
    { id: 'springcore', title: 'Spring Core', level: 'Mid' },
    { id: 'springboot', title: 'Spring Boot', level: 'Mid' },
    { id: 'testing', title: 'Testing', level: 'Mid' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Junior':
        return 'bg-green-100 text-green-800';
      case 'Junior-Mid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Mid':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center min-w-0 flex-shrink-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">Java Learning</h1>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden ml-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2 overflow-x-auto flex-1 justify-end ml-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                  currentSection === section.id
                    ? 'bg-indigo-700 text-white'
                    : 'text-white hover:bg-indigo-500'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentSection === section.id
                      ? 'bg-indigo-700 text-white'
                      : 'text-white hover:bg-indigo-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{section.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(section.level)}`}>
                      {section.level}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
