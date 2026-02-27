import React from 'react';

export default function BannerElement({
  columns = 1,
  bgColor = '#667eea',
  bgColorEnd = '#764ba2',
  textColor = '#ffffff',
  bannerText = 'Banner Promocional',
  bannerCount = 1,
  viewport,
}) {
  const effectiveCols =
    viewport === 'mobile' ? 1 :
    viewport === 'tablet' ? Math.min(columns, 2) :
    columns;

  const banners = Array.from({ length: bannerCount }, (_, i) => i);

  return (
    <div className="el-banner" style={{ background: 'white' }}>
      <div
        className="el-banner__grid"
        style={{ gridTemplateColumns: `repeat(${effectiveCols}, 1fr)` }}
      >
        {banners.map((i) => (
          <div
            key={i}
            className="el-banner__item el-banner__item--filled"
            style={{
              background: `linear-gradient(135deg, ${bgColor}, ${bgColorEnd})`,
              color: textColor,
            }}
          >
            <span className="el-banner__item-label">{bannerText}</span>
            <span className="el-banner__item-text">
              Clique para editar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
