import React from 'react';

export default function CatalogHeader({
  brandName = 'NOME DA MARCA',
  tagline = 'Tagline da marca',
  bgColor = '#1a1a2e',
  textColor = '#ffffff',
  showSocial = true,
  showUpload = true,
}) {
  return (
    <div
      className="el-header"
      style={{ background: bgColor, color: textColor }}
    >
      {showUpload && (
        <div className="el-header__upload-area">
          <span className="el-header__upload-icon">⇧</span>
          <span className="el-header__upload-text">
            Clique ou arraste para fazer upload da imagem de capa
          </span>
        </div>
      )}
      <div className="el-header__brand-name">{brandName}</div>
      <div className="el-header__tagline">{tagline}</div>
      {showSocial && (
        <div className="el-header__social">
          <div className="el-header__social-link">ig</div>
          <div className="el-header__social-link">fb</div>
          <div className="el-header__social-link">in</div>
          <div className="el-header__social-link">ws</div>
        </div>
      )}
    </div>
  );
}
