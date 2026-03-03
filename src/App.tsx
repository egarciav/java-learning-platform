import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import BasicConceptsExpanded from './sections/BasicConceptsExpanded';
import ControlStructures from './sections/ControlStructures';
import ObjectOrientedProgramming from './sections/ObjectOrientedProgramming';
import CollectionsAndArrays from './sections/CollectionsAndArrays';
import Exceptions from './sections/Exceptions';
import AdvancedConcepts from './sections/AdvancedConcepts';
import StreamsAndLambdas from './sections/StreamsAndLambdas';
import ConcurrencyThreads from './sections/ConcurrencyThreads';
import FileIO from './sections/FileIO';
import JPAEntities from './sections/JPAEntities';
import SpringCore from './sections/SpringCore';
import SpringBoot from './sections/SpringBoot';
import Testing from './sections/Testing';

function App() {
  const [currentSection, setCurrentSection] = useState('basics');

  const renderSection = () => {
    switch (currentSection) {
      case 'basics':
        return <BasicConceptsExpanded />;
      case 'control':
        return <ControlStructures />;
      case 'oop':
        return <ObjectOrientedProgramming />;
      case 'collections':
        return <CollectionsAndArrays />;
      case 'exceptions':
        return <Exceptions />;
      case 'advanced':
        return <AdvancedConcepts />;
      case 'streams':
        return <StreamsAndLambdas />;
      case 'concurrency':
        return <ConcurrencyThreads />;
      case 'fileio':
        return <FileIO />;
      case 'jpa':
        return <JPAEntities />;
      case 'springcore':
        return <SpringCore />;
      case 'springboot':
        return <SpringBoot />;
      case 'testing':
        return <Testing />;
      default:
        return <BasicConceptsExpanded />;
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
        <main className="py-8">
          {renderSection()}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm">
              © 2026 Java Learning Platform - De Junior a Mid Level
            </p>
            <p className="text-xs mt-2 text-gray-400">
              Aprende Java desde los fundamentos hasta Spring Boot con ejemplos prácticos y explicaciones detalladas
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
