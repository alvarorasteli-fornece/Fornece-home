import React from 'react';
import { useCatalog } from '../context/CatalogContext';

export default function Toolbar() {
  const { state, setViewport, toggleGrid } = useCatalog();

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <span className="toolbar__logo">Fornece</span>
        <span className="toolbar__separator" />
        <span className="toolbar__title">Editor de Catálogo</span>
      </div>

      <div className="toolbar__center">
        <button
          className={`toolbar__viewport-btn ${state.viewport === 'desktop' ? 'toolbar__viewport-btn--active' : ''}`}
          onClick={() => setViewport('desktop')}
          title="Desktop"
        >
          🖥
        </button>
        <button
          className={`toolbar__viewport-btn ${state.viewport === 'tablet' ? 'toolbar__viewport-btn--active' : ''}`}
          onClick={() => setViewport('tablet')}
          title="Tablet"
        >
          📱
        </button>
        <button
          className={`toolbar__viewport-btn ${state.viewport === 'mobile' ? 'toolbar__viewport-btn--active' : ''}`}
          onClick={() => setViewport('mobile')}
          title="Mobile"
        >
          📲
        </button>

        <button
          className={`toolbar__grid-toggle ${state.showGrid ? 'toolbar__grid-toggle--active' : ''}`}
          onClick={toggleGrid}
        >
          ⊞ Grid
        </button>
      </div>

      <div className="toolbar__right">
        <button className="toolbar__btn">
          👁 Preview
        </button>
        <button className="toolbar__btn toolbar__btn--primary">
          Salvar Catálogo
        </button>
      </div>
    </div>
  );
}
