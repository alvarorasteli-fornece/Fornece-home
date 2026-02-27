import React from 'react';
import { CatalogProvider } from './context/CatalogContext';
import CatalogEditor from './components/CatalogEditor';

export default function App() {
  return (
    <CatalogProvider>
      <CatalogEditor />
    </CatalogProvider>
  );
}
