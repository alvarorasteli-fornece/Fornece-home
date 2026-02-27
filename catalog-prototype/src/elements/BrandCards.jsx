import React from 'react';

const SAMPLE_BRANDS = [
  'Bosch', 'Makita', 'DeWalt', 'Tramontina',
  'Stanley', 'Vonder', 'Black+Decker', 'Starrett',
];

export default function BrandCards({
  columns = 4,
  title = 'Marcas',
  showTitle = true,
  bgColor = '#ffffff',
  cardRadius = 8,
  brandCount = 4,
  viewport,
}) {
  const effectiveCols =
    viewport === 'mobile' ? Math.min(columns, 2) :
    viewport === 'tablet' ? Math.min(columns, 3) :
    columns;

  const brands = SAMPLE_BRANDS.slice(0, brandCount);

  return (
    <div className="el-brands" style={{ background: bgColor }}>
      {showTitle && <div className="el-brands__title">{title}</div>}
      <div
        className="el-brands__grid"
        style={{ gridTemplateColumns: `repeat(${effectiveCols}, 1fr)` }}
      >
        {brands.map((brand, i) => (
          <div
            key={i}
            className="el-brands__card"
            style={{ borderRadius: `${cardRadius}px` }}
          >
            <div className="el-brands__card-logo">
              {brand.charAt(0)}
            </div>
            <div className="el-brands__card-name">{brand}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
