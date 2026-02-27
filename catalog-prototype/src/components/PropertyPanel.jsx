import React from 'react';
import { useCatalog, ELEMENT_TYPES } from '../context/CatalogContext';

export default function PropertyPanel() {
  const { state, updateElementProps } = useCatalog();
  const selectedElement = state.elements.find((el) => el.id === state.selectedId);

  if (!selectedElement) {
    return (
      <div className="property-panel">
        <div className="property-panel__header">
          <div className="property-panel__title">Propriedades</div>
          <div className="property-panel__subtitle">Selecione um elemento</div>
        </div>
        <div className="property-panel__content">
          <div className="property-panel__empty">
            <div className="property-panel__empty-icon">⚙</div>
            <div className="property-panel__empty-text">
              Clique em um elemento no canvas para editar suas propriedades
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typeDef = ELEMENT_TYPES[selectedElement.type];
  const props = selectedElement.props;

  function updateProp(key, value) {
    updateElementProps(selectedElement.id, { [key]: value });
  }

  return (
    <div className="property-panel">
      <div className="property-panel__header">
        <div className="property-panel__title">{typeDef.label}</div>
        <div className="property-panel__subtitle">
          Editando propriedades do elemento
        </div>
      </div>
      <div className="property-panel__content">
        {/* Common: Background Color */}
        <div className="property-panel__section">
          <div className="property-panel__section-title">Aparência</div>

          <div className="property-panel__field">
            <label className="property-panel__label">Cor de Fundo</label>
            <input
              type="color"
              className="property-panel__input property-panel__input--color"
              value={props.bgColor || '#ffffff'}
              onChange={(e) => updateProp('bgColor', e.target.value)}
            />
          </div>

          {props.textColor !== undefined && (
            <div className="property-panel__field">
              <label className="property-panel__label">Cor do Texto</label>
              <input
                type="color"
                className="property-panel__input property-panel__input--color"
                value={props.textColor || '#ffffff'}
                onChange={(e) => updateProp('textColor', e.target.value)}
              />
            </div>
          )}

          {props.cardRadius !== undefined && (
            <div className="property-panel__field">
              <label className="property-panel__label">
                Arredondamento dos Cards
              </label>
              <div className="property-panel__slider-container">
                <input
                  type="range"
                  className="property-panel__slider"
                  min="0"
                  max="24"
                  value={props.cardRadius}
                  onChange={(e) =>
                    updateProp('cardRadius', parseInt(e.target.value))
                  }
                />
                <span className="property-panel__slider-value">
                  {props.cardRadius}px
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Columns */}
        {props.columns !== undefined && (
          <div className="property-panel__section">
            <div className="property-panel__section-title">Grid</div>
            <div className="property-panel__field">
              <label className="property-panel__label">Colunas</label>
              <div className="property-panel__columns">
                {[1, 2, 3, 4].map((col) => (
                  <button
                    key={col}
                    className={`property-panel__column-btn ${
                      props.columns === col
                        ? 'property-panel__column-btn--active'
                        : ''
                    }`}
                    onClick={() => {
                      updateProp('columns', col);
                      // Also update count to match
                      if (selectedElement.type === 'products')
                        updateProp('productCount', col);
                      if (selectedElement.type === 'brands')
                        updateProp('brandCount', col);
                      if (selectedElement.type === 'banner')
                        updateProp('bannerCount', col);
                    }}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Element-specific properties */}
        {selectedElement.type === 'header' && (
          <HeaderProperties props={props} updateProp={updateProp} />
        )}

        {selectedElement.type === 'products' && (
          <ProductProperties props={props} updateProp={updateProp} />
        )}

        {selectedElement.type === 'banner' && (
          <BannerProperties props={props} updateProp={updateProp} />
        )}

        {selectedElement.type === 'brands' && (
          <BrandProperties props={props} updateProp={updateProp} />
        )}

        {selectedElement.type === 'search' && (
          <SearchProperties props={props} updateProp={updateProp} />
        )}

        {/* Height */}
        <div className="property-panel__section">
          <div className="property-panel__section-title">Dimensões</div>
          <div className="property-panel__field">
            <label className="property-panel__label">
              Altura (arraste a borda inferior do elemento)
            </label>
            <div className="property-panel__slider-container">
              <span className="property-panel__slider-value" style={{ minWidth: 'auto' }}>
                {selectedElement.height ? `${selectedElement.height}px` : 'Auto'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderProperties({ props, updateProp }) {
  return (
    <div className="property-panel__section">
      <div className="property-panel__section-title">Conteúdo</div>
      <div className="property-panel__field">
        <label className="property-panel__label">Nome da Marca</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.brandName}
          onChange={(e) => updateProp('brandName', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">Tagline</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.tagline}
          onChange={(e) => updateProp('tagline', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">
          <input
            type="checkbox"
            checked={props.showSocial}
            onChange={(e) => updateProp('showSocial', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          Exibir redes sociais
        </label>
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">
          <input
            type="checkbox"
            checked={props.showUpload}
            onChange={(e) => updateProp('showUpload', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          Área de upload de imagem
        </label>
      </div>
    </div>
  );
}

function ProductProperties({ props, updateProp }) {
  return (
    <div className="property-panel__section">
      <div className="property-panel__section-title">Conteúdo</div>
      <div className="property-panel__field">
        <label className="property-panel__label">Título da Seção</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.title}
          onChange={(e) => updateProp('title', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">
          <input
            type="checkbox"
            checked={props.showTitle}
            onChange={(e) => updateProp('showTitle', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          Exibir título
        </label>
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">Quantidade de Produtos</label>
        <div className="property-panel__slider-container">
          <input
            type="range"
            className="property-panel__slider"
            min="1"
            max="12"
            value={props.productCount}
            onChange={(e) =>
              updateProp('productCount', parseInt(e.target.value))
            }
          />
          <span className="property-panel__slider-value">
            {props.productCount}
          </span>
        </div>
      </div>
    </div>
  );
}

function BannerProperties({ props, updateProp }) {
  return (
    <div className="property-panel__section">
      <div className="property-panel__section-title">Conteúdo</div>
      <div className="property-panel__field">
        <label className="property-panel__label">Texto do Banner</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.bannerText}
          onChange={(e) => updateProp('bannerText', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">Cor do Gradiente (Fim)</label>
        <input
          type="color"
          className="property-panel__input property-panel__input--color"
          value={props.bgColorEnd || '#764ba2'}
          onChange={(e) => updateProp('bgColorEnd', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">Quantidade de Banners</label>
        <div className="property-panel__slider-container">
          <input
            type="range"
            className="property-panel__slider"
            min="1"
            max="4"
            value={props.bannerCount}
            onChange={(e) =>
              updateProp('bannerCount', parseInt(e.target.value))
            }
          />
          <span className="property-panel__slider-value">
            {props.bannerCount}
          </span>
        </div>
      </div>
    </div>
  );
}

function BrandProperties({ props, updateProp }) {
  return (
    <div className="property-panel__section">
      <div className="property-panel__section-title">Conteúdo</div>
      <div className="property-panel__field">
        <label className="property-panel__label">Título da Seção</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.title}
          onChange={(e) => updateProp('title', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">
          <input
            type="checkbox"
            checked={props.showTitle}
            onChange={(e) => updateProp('showTitle', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          Exibir título
        </label>
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">Quantidade de Marcas</label>
        <div className="property-panel__slider-container">
          <input
            type="range"
            className="property-panel__slider"
            min="1"
            max="8"
            value={props.brandCount}
            onChange={(e) =>
              updateProp('brandCount', parseInt(e.target.value))
            }
          />
          <span className="property-panel__slider-value">
            {props.brandCount}
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchProperties({ props, updateProp }) {
  return (
    <div className="property-panel__section">
      <div className="property-panel__section-title">Conteúdo</div>
      <div className="property-panel__field">
        <label className="property-panel__label">Placeholder</label>
        <input
          type="text"
          className="property-panel__input"
          value={props.placeholder}
          onChange={(e) => updateProp('placeholder', e.target.value)}
        />
      </div>
      <div className="property-panel__field">
        <label className="property-panel__label">
          <input
            type="checkbox"
            checked={props.showCategories}
            onChange={(e) => updateProp('showCategories', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          Filtro de categorias
        </label>
      </div>
    </div>
  );
}
