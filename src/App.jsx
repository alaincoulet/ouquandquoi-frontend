import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            OùQuandQuoi
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez les meilleures activités et événements près de chez vous
          </p>
          
          {/* Démonstration composant Card temporaire */}
          <div className="mobile-card bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Activité exemple
            </h2>
            <p className="text-gray-600">
              Randonnée dans les Vosges - Dimanche 20 juillet
            </p>
            <div className="mt-4">
              <button className="touch-button bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
