import React, { useRef, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCatalog } from '../context/CatalogContext';
import CatalogHeader from '../elements/CatalogHeader';
import SearchBar from '../elements/SearchBar';
import ProductGrid from '../elements/ProductGrid';
import BannerElement from '../elements/BannerElement';
import BrandCards from '../elements/BrandCards';

const ELEMENT_RENDERERS = {
  header: CatalogHeader,
  search: SearchBar,
  products: ProductGrid,
  banner: BannerElement,
  brands: BrandCards,
};

const ELEMENT_LABELS = {
  header: 'Header',
  search: 'Busca',
  products: 'Produtos',
  banner: 'Banner',
  brands: 'Marcas',
};

export default function CanvasElement({ element }) {
  const {
    state,
    selectElement,
    removeElement,
    duplicateElement,
    updateElementHeight,
  } = useCatalog();

  const isSelected = state.selectedId === element.id;
  const resizeRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: {
      source: 'canvas-element',
      type: element.type,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minHeight: element.height ? `${element.height}px` : undefined,
  };

  const Renderer = ELEMENT_RENDERERS[element.type];

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      selectElement(element.id);
    },
    [element.id, selectElement]
  );

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      removeElement(element.id);
    },
    [element.id, removeElement]
  );

  const handleDuplicate = useCallback(
    (e) => {
      e.stopPropagation();
      duplicateElement(element.id);
    },
    [element.id, duplicateElement]
  );

  // Resize handle
  const handleResizeStart = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = resizeRef.current?.getBoundingClientRect().height || 200;

      function onMouseMove(ev) {
        const delta = ev.clientY - startY;
        const newHeight = Math.max(80, startHeight + delta);
        updateElementHeight(element.id, newHeight);
      }

      function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [element.id, updateElementHeight]
  );

  if (!Renderer) return null;

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        resizeRef.current = node;
      }}
      style={style}
      className={`canvas-element ${isSelected ? 'canvas-element--selected' : ''} ${isDragging ? 'canvas-element--dragging' : ''}`}
      onClick={handleClick}
    >
      {/* Element type label */}
      <span className="canvas-element__label">
        {ELEMENT_LABELS[element.type]}
      </span>

      {/* Drag handle */}
      <div
        className="canvas-element__drag-handle"
        {...attributes}
        {...listeners}
      />

      {/* Action buttons */}
      <div className="canvas-element__actions">
        <button
          className="canvas-element__action-btn"
          onClick={handleDuplicate}
          title="Duplicar"
        >
          ⧉
        </button>
        <button
          className="canvas-element__action-btn canvas-element__action-btn--delete"
          onClick={handleDelete}
          title="Remover"
        >
          ✕
        </button>
      </div>

      {/* Element content */}
      <Renderer {...element.props} viewport={state.viewport} />

      {/* Resize handle */}
      <div
        className="canvas-element__resize-handle"
        onMouseDown={handleResizeStart}
      >
        <div className="canvas-element__resize-bar" />
      </div>
    </div>
  );
}
