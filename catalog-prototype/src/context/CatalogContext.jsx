import React, { createContext, useContext, useReducer, useCallback } from 'react';

const CatalogContext = createContext(null);

// Element type definitions
export const ELEMENT_TYPES = {
  header: {
    type: 'header',
    label: 'Header',
    category: 'layout',
    defaultProps: {
      brandName: 'NOME DA MARCA',
      tagline: 'Tagline da marca',
      bgColor: '#1a1a2e',
      textColor: '#ffffff',
      showSocial: true,
      showUpload: true,
    },
  },
  search: {
    type: 'search',
    label: 'Busca',
    category: 'layout',
    defaultProps: {
      placeholder: 'Buscar produtos...',
      showCategories: true,
      bgColor: '#ffffff',
    },
  },
  products: {
    type: 'products',
    label: 'Produtos',
    category: 'produtos',
    defaultProps: {
      columns: 4,
      title: 'Produtos',
      showTitle: true,
      cardRadius: 8,
      bgColor: '#ffffff',
      productCount: 4,
    },
  },
  banner: {
    type: 'banner',
    label: 'Banner',
    category: 'banners',
    defaultProps: {
      columns: 1,
      style: 'gradient',
      bgColor: '#667eea',
      bgColorEnd: '#764ba2',
      textColor: '#ffffff',
      bannerText: 'Banner Promocional',
      bannerCount: 1,
    },
  },
  brands: {
    type: 'brands',
    label: 'Marcas',
    category: 'marcas',
    defaultProps: {
      columns: 4,
      title: 'Marcas',
      showTitle: true,
      bgColor: '#ffffff',
      cardRadius: 8,
      brandCount: 4,
    },
  },
};

// Pre-configured variants for sidebar
export const SIDEBAR_ITEMS = [
  // Produtos
  { id: 'products-1x1', type: 'products', columns: 1, label: '1×1' },
  { id: 'products-2x1', type: 'products', columns: 2, label: '2×1' },
  { id: 'products-3x1', type: 'products', columns: 3, label: '3×1' },
  { id: 'products-4x1', type: 'products', columns: 4, label: '4×1' },
  // Banners
  { id: 'banner-1x1', type: 'banner', columns: 1, label: '1×1' },
  { id: 'banner-2x1', type: 'banner', columns: 2, label: '2×1' },
  { id: 'banner-3x1', type: 'banner', columns: 3, label: '3×1' },
  { id: 'banner-4x1', type: 'banner', columns: 4, label: '4×1' },
  // Marcas
  { id: 'brands-1x1', type: 'brands', columns: 1, label: '1×1' },
  { id: 'brands-2x1', type: 'brands', columns: 2, label: '2×1' },
  { id: 'brands-3x1', type: 'brands', columns: 3, label: '3×1' },
  { id: 'brands-4x1', type: 'brands', columns: 4, label: '4×1' },
];

let nextId = 1;
function generateId() {
  return `el-${Date.now()}-${nextId++}`;
}

function createCanvasElement(type, overrides = {}) {
  const typeDef = ELEMENT_TYPES[type];
  if (!typeDef) return null;

  return {
    id: generateId(),
    type,
    props: { ...typeDef.defaultProps, ...overrides },
    height: null, // null = auto
  };
}

// Reducer
function catalogReducer(state, action) {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const { elementType, index, overrides } = action.payload;
      const newElement = createCanvasElement(elementType, overrides);
      if (!newElement) return state;

      const elements = [...state.elements];
      const insertAt = index !== undefined ? index : elements.length;
      elements.splice(insertAt, 0, newElement);
      return { ...state, elements, selectedId: newElement.id };
    }

    case 'REMOVE_ELEMENT': {
      const { id } = action.payload;
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== id),
        selectedId: state.selectedId === id ? null : state.selectedId,
      };
    }

    case 'MOVE_ELEMENT': {
      const { fromIndex, toIndex } = action.payload;
      const elements = [...state.elements];
      const [moved] = elements.splice(fromIndex, 1);
      elements.splice(toIndex, 0, moved);
      return { ...state, elements };
    }

    case 'UPDATE_ELEMENT_PROPS': {
      const { id, props } = action.payload;
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === id ? { ...el, props: { ...el.props, ...props } } : el
        ),
      };
    }

    case 'UPDATE_ELEMENT_HEIGHT': {
      const { id, height } = action.payload;
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === id ? { ...el, height } : el
        ),
      };
    }

    case 'SELECT_ELEMENT': {
      return { ...state, selectedId: action.payload };
    }

    case 'DUPLICATE_ELEMENT': {
      const { id } = action.payload;
      const sourceIndex = state.elements.findIndex((el) => el.id === id);
      if (sourceIndex === -1) return state;

      const source = state.elements[sourceIndex];
      const duplicate = {
        ...source,
        id: generateId(),
        props: { ...source.props },
      };

      const elements = [...state.elements];
      elements.splice(sourceIndex + 1, 0, duplicate);
      return { ...state, elements, selectedId: duplicate.id };
    }

    case 'SET_VIEWPORT': {
      return { ...state, viewport: action.payload };
    }

    case 'TOGGLE_GRID': {
      return { ...state, showGrid: !state.showGrid };
    }

    default:
      return state;
  }
}

const initialState = {
  elements: [
    createCanvasElement('header'),
    createCanvasElement('search'),
    createCanvasElement('products', { columns: 4, productCount: 4 }),
    createCanvasElement('banner', { columns: 1 }),
    createCanvasElement('brands', { columns: 4, brandCount: 4 }),
  ],
  selectedId: null,
  viewport: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  showGrid: true,
};

export function CatalogProvider({ children }) {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const actions = {
    addElement: useCallback(
      (elementType, index, overrides) =>
        dispatch({ type: 'ADD_ELEMENT', payload: { elementType, index, overrides } }),
      []
    ),
    removeElement: useCallback(
      (id) => dispatch({ type: 'REMOVE_ELEMENT', payload: { id } }),
      []
    ),
    moveElement: useCallback(
      (fromIndex, toIndex) =>
        dispatch({ type: 'MOVE_ELEMENT', payload: { fromIndex, toIndex } }),
      []
    ),
    updateElementProps: useCallback(
      (id, props) =>
        dispatch({ type: 'UPDATE_ELEMENT_PROPS', payload: { id, props } }),
      []
    ),
    updateElementHeight: useCallback(
      (id, height) =>
        dispatch({ type: 'UPDATE_ELEMENT_HEIGHT', payload: { id, height } }),
      []
    ),
    selectElement: useCallback(
      (id) => dispatch({ type: 'SELECT_ELEMENT', payload: id }),
      []
    ),
    duplicateElement: useCallback(
      (id) => dispatch({ type: 'DUPLICATE_ELEMENT', payload: { id } }),
      []
    ),
    setViewport: useCallback(
      (viewport) => dispatch({ type: 'SET_VIEWPORT', payload: viewport }),
      []
    ),
    toggleGrid: useCallback(() => dispatch({ type: 'TOGGLE_GRID' }), []),
  };

  return (
    <CatalogContext.Provider value={{ state, ...actions }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return context;
}
