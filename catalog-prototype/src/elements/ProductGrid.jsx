import React from 'react';

const SAMPLE_PRODUCTS = [
  { name: 'Furadeira Elétrica', sku: 'SKU-001', price: 'R$ 189,90' },
  { name: 'Serra Circular 7"', sku: 'SKU-002', price: 'R$ 349,90' },
  { name: 'Parafusadeira 12V', sku: 'SKU-003', price: 'R$ 279,90' },
  { name: 'Nível a Laser', sku: 'SKU-004', price: 'R$ 129,90' },
  { name: 'Jogo de Chaves', sku: 'SKU-005', price: 'R$ 89,90' },
  { name: 'Trena Digital 5m', sku: 'SKU-006', price: 'R$ 59,90' },
  { name: 'Alicate Universal', sku: 'SKU-007', price: 'R$ 49,90' },
  { name: 'Martelo Borracha', sku: 'SKU-008', price: 'R$ 39,90' },
  { name: 'Chave de Fenda', sku: 'SKU-009', price: 'R$ 29,90' },
  { name: 'Extensão 10m', sku: 'SKU-010', price: 'R$ 69,90' },
  { name: 'Broca Titânio', sku: 'SKU-011', price: 'R$ 44,90' },
  { name: 'Disco de Corte', sku: 'SKU-012', price: 'R$ 19,90' },
];

export default function ProductGrid({
  columns = 4,
  title = 'Produtos',
  showTitle = true,
  cardRadius = 8,
  bgColor = '#ffffff',
  productCount = 4,
  viewport,
}) {
  const effectiveCols =
    viewport === 'mobile' ? Math.min(columns, 2) :
    viewport === 'tablet' ? Math.min(columns, 3) :
    columns;

  const products = SAMPLE_PRODUCTS.slice(0, productCount);

  return (
    <div className="el-products" style={{ background: bgColor }}>
      {showTitle && <div className="el-products__title">{title}</div>}
      <div
        className="el-products__grid"
        style={{ gridTemplateColumns: `repeat(${effectiveCols}, 1fr)` }}
      >
        {products.map((product, i) => (
          <div
            key={i}
            className="el-products__card"
            style={{ borderRadius: `${cardRadius}px` }}
          >
            <div
              className="el-products__card-image"
              style={{
                borderRadius: `${cardRadius}px ${cardRadius}px 0 0`,
              }}
            >
              ⬡
            </div>
            <div className="el-products__card-info">
              <div className="el-products__card-name">{product.name}</div>
              <div className="el-products__card-sku">{product.sku}</div>
              <div className="el-products__card-price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
