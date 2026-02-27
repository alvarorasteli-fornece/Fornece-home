import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCatalog, ELEMENT_TYPES } from '../context/CatalogContext';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';
import Toolbar from './Toolbar';

export default function CatalogEditor() {
  const {
    state,
    addElement,
    moveElement,
    selectElement,
  } = useCatalog();

  const [activeDrag, setActiveDrag] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    setActiveDrag({
      id: active.id,
      data: active.data.current,
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveDrag(null);

    if (!over) return;

    const activeData = active.data.current;

    // Dragging from sidebar → add new element
    if (activeData?.source === 'sidebar') {
      const overData = over.data.current;
      let insertIndex = state.elements.length;

      if (overData?.source === 'canvas') {
        // Dropped on the canvas drop zone
        insertIndex = state.elements.length;
      } else if (overData?.sortable) {
        // Dropped on/near an existing element
        const overIndex = state.elements.findIndex((el) => el.id === over.id);
        if (overIndex !== -1) insertIndex = overIndex + 1;
      }

      addElement(activeData.elementType, insertIndex, {
        columns: activeData.columns || undefined,
        productCount: activeData.columns || undefined,
        bannerCount: activeData.columns || undefined,
        brandCount: activeData.columns || undefined,
      });
      return;
    }

    // Reordering within canvas
    if (activeData?.source === 'canvas-element' && active.id !== over.id) {
      const fromIndex = state.elements.findIndex((el) => el.id === active.id);
      let toIndex = state.elements.findIndex((el) => el.id === over.id);

      if (fromIndex !== -1 && toIndex !== -1) {
        moveElement(fromIndex, toIndex);
      }
    }
  }

  function handleDragCancel() {
    setActiveDrag(null);
  }

  return (
    <div className="catalog-editor">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <Sidebar />
        <div className="canvas-area">
          <Toolbar />
          <SortableContext
            items={state.elements.map((el) => el.id)}
            strategy={verticalListSortingStrategy}
          >
            <Canvas activeDrag={activeDrag} />
          </SortableContext>
        </div>
        <PropertyPanel />

        <DragOverlay dropAnimation={null}>
          {activeDrag?.data?.source === 'sidebar' ? (
            <div
              className="drag-overlay"
              style={{
                padding: '16px 24px',
                background: 'var(--color-primary)',
                color: 'var(--color-bg)',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                whiteSpace: 'nowrap',
              }}
            >
              {ELEMENT_TYPES[activeDrag.data.elementType]?.label} {activeDrag.data.columns}×1
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
