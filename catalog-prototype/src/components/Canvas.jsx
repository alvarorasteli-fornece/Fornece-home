import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useCatalog } from '../context/CatalogContext';
import CanvasElement from './CanvasElement';

export default function Canvas({ activeDrag }) {
  const { state, selectElement } = useCatalog();

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
    data: { source: 'canvas' },
  });

  const viewportClass =
    state.viewport === 'tablet'
      ? 'canvas--tablet'
      : state.viewport === 'mobile'
        ? 'canvas--mobile'
        : '';

  function handleCanvasClick(e) {
    // Deselect when clicking empty canvas area
    if (e.target === e.currentTarget || e.target.closest('.canvas__content') === e.target) {
      selectElement(null);
    }
  }

  return (
    <div className="canvas-wrapper">
      <div
        ref={setNodeRef}
        className={`canvas ${viewportClass}`}
        onClick={handleCanvasClick}
      >
        {/* Grid overlay */}
        {state.showGrid && (
          <div className="canvas__grid-overlay">
            <div className="canvas__grid-col" />
            <div className="canvas__grid-col" />
            <div className="canvas__grid-col" />
            <div className="canvas__grid-col" />
          </div>
        )}

        <div className="canvas__content">
          {state.elements.length === 0 ? (
            <div className="canvas__empty">
              <div className="canvas__empty-icon">⊞</div>
              <div className="canvas__empty-text">
                Arraste elementos aqui
              </div>
              <div className="canvas__empty-hint">
                Use o painel lateral para adicionar seções ao catálogo
              </div>
            </div>
          ) : (
            state.elements.map((element) => (
              <CanvasElement key={element.id} element={element} />
            ))
          )}

          {/* Drop indicator at bottom */}
          {isOver && activeDrag?.data?.source === 'sidebar' && (
            <div className="canvas__drop-indicator" style={{ margin: '8px 16px' }} />
          )}
        </div>
      </div>
    </div>
  );
}
