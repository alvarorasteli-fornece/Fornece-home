import React from 'react';

export default function SearchBar({
  placeholder = 'Buscar produtos...',
  showCategories = true,
  bgColor = '#ffffff',
}) {
  return (
    <div className="el-search" style={{ background: bgColor }}>
      <div className="el-search__container">
        <input
          type="text"
          className="el-search__input"
          placeholder={placeholder}
          readOnly
        />
        {showCategories && (
          <button className="el-search__category-btn">
            Categorias ▾
          </button>
        )}
      </div>
    </div>
  );
}
