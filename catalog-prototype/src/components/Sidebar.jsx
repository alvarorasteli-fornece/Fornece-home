import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { SIDEBAR_ITEMS } from '../context/CatalogContext';

function SidebarDraggableItem({ item }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${item.id}`,
    data: {
      source: 'sidebar',
      elementType: item.type,
      columns: item.columns,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`sidebar__item ${isDragging ? 'sidebar__item--dragging' : ''}`}
    >
      <div className="sidebar__item-icon">
        <GridPreview type={item.type} columns={item.columns} />
      </div>
      <span className="sidebar__item-label">{item.label}</span>
    </div>
  );
}

function GridPreview({ type, columns }) {
  const cells = Array.from({ length: columns }, (_, i) => i);
  const color =
    type === 'products'
      ? 'rgba(0, 229, 160, 0.3)'
      : type === 'banner'
        ? 'rgba(102, 126, 234, 0.3)'
        : 'rgba(255, 165, 0, 0.3)';

  return (
    <div
      className="sidebar__item-preview"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cells.map((i) => (
        <div
          key={i}
          className="sidebar__item-preview-cell"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

// Header and Search are special one-off elements
function SidebarSpecialItem({ type, label, icon }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      source: 'sidebar',
      elementType: type,
      columns: 1,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`sidebar__item ${isDragging ? 'sidebar__item--dragging' : ''}`}
      style={{ gridColumn: '1 / -1' }}
    >
      <div className="sidebar__item-icon" style={{ aspectRatio: '3/1' }}>
        <span style={{ fontSize: '18px', opacity: 0.4 }}>{icon}</span>
      </div>
      <span className="sidebar__item-label">{label}</span>
    </div>
  );
}

export default function Sidebar() {
  const productItems = SIDEBAR_ITEMS.filter((i) => i.type === 'products');
  const bannerItems = SIDEBAR_ITEMS.filter((i) => i.type === 'banner');
  const brandItems = SIDEBAR_ITEMS.filter((i) => i.type === 'brands');

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        {/* Layout elements */}
        <div className="sidebar__section">
          <div className="sidebar__section-title">Layout</div>
          <div className="sidebar__items">
            <SidebarSpecialItem type="header" label="Header" icon="▬" />
            <SidebarSpecialItem type="search" label="Barra de Busca" icon="⌕" />
          </div>
        </div>

        {/* Products */}
        <div className="sidebar__section">
          <div className="sidebar__section-title">Produtos</div>
          <div className="sidebar__items">
            {productItems.map((item) => (
              <SidebarDraggableItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Banners */}
        <div className="sidebar__section">
          <div className="sidebar__section-title">Banners</div>
          <div className="sidebar__items">
            {bannerItems.map((item) => (
              <SidebarDraggableItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="sidebar__section">
          <div className="sidebar__section-title">Marcas</div>
          <div className="sidebar__items">
            {brandItems.map((item) => (
              <SidebarDraggableItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
