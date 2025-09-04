import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setThemeMode, updateThemeColors } from '../../store/slices/themeSlice';
import { Button } from './ui/button';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, description }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
          {label}
        </label>
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded border-2"
            style={{ 
              backgroundColor: value,
              borderColor: 'hsl(var(--border))'
            }}
          />
          <input
            type="color"
            value={value}
            onChange={handleChange}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
      </div>
      {description && (
        <p className="text-xs opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {description}
        </p>
      )}
    </div>
  );
};

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { config } = useAppSelector((state) => state.theme);

  const handleColorChange = (key: keyof typeof config.colors, value: string) => {
    dispatch(updateThemeColors({ [key]: value }));
  };

  const handleModeChange = (mode: 'light' | 'dark') => {
    dispatch(setThemeMode(mode));
  };

  const handleReset = () => {
    dispatch(updateThemeColors({
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      surface: "hsl(var(--card))",
      background: "hsl(var(--background))",
      text: "hsl(var(--foreground))",
      textSecondary: "hsl(var(--muted-foreground))",
      border: "hsl(var(--border))",
      accent: "hsl(var(--accent))",
    }));
    dispatch(setThemeMode('dark'));
  };

  const presetColors = {
    libreria: {
      primary: '#2563eb',
      secondary: '#64748b', 
      accent: '#059669',
      name: 'Librería Educativa'
    },
    corporativo: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6',
      name: 'Corporativo'
    },
    creativo: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#ec4899',
      name: 'Creativo'
    },
    natural: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      name: 'Natural'
    }
  };

  const applyPreset = (preset: typeof presetColors.libreria) => {
    dispatch(updateThemeColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-primary text-white p-3 rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        style={{ backgroundColor: config.colors.primary }}
        title="Personalizar tema"
      >
        🎨
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel de personalización */}
      <div 
        className="fixed top-0 right-0 h-full w-80 p-6 shadow-2xl z-50 overflow-y-auto border-l"
        style={{ 
          backgroundColor: config.colors.surface,
          borderLeftColor: config.colors.border
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 
            className="text-lg font-semibold"
            style={{ color: config.colors.text }}
          >
            🎨 Personalizar Tema
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{ 
              color: config.colors.textSecondary,
              backgroundColor: `${config.colors.border}50`
            }}
          >
            ✕
          </button>
        </div>

        {/* Modo del tema */}
        <div className="mb-6">
          <label 
            className="text-sm font-medium mb-3 block"
            style={{ color: config.colors.text }}
          >
            Modo del tema
          </label>
          <div className="flex space-x-2">
            <Button
              onClick={() => handleModeChange('light')}
              variant={config.mode === 'light' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              ☀️ Claro
            </Button>
            <Button
              onClick={() => handleModeChange('dark')}
              variant={config.mode === 'dark' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              🌙 Oscuro
            </Button>
          </div>
        </div>

        {/* Presets de colores */}
        <div className="mb-6">
          <label 
            className="text-sm font-medium mb-3 block"
            style={{ color: config.colors.text }}
          >
            Esquemas predefinidos
          </label>
          <div className="space-y-2">
            {Object.entries(presetColors).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(preset)}
                className="w-full p-3 rounded-lg border text-left hover:opacity-80 transition-opacity"
                style={{ 
                  borderColor: config.colors.border,
                  backgroundColor: config.colors.background
                }}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: config.colors.text }}
                  >
                    {preset.name}
                  </span>
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ 
                        backgroundColor: preset.primary,
                        borderColor: config.colors.border
                      }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ 
                        backgroundColor: preset.secondary,
                        borderColor: config.colors.border
                      }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ 
                        backgroundColor: preset.accent,
                        borderColor: config.colors.border
                      }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Colores personalizados */}
        <div className="mb-6">
          <label 
            className="text-sm font-medium mb-3 block"
            style={{ color: config.colors.text }}
          >
            Colores personalizados
          </label>
          <div className="space-y-4">
            <ColorPicker
              label="Color Primario"
              value={config.colors.primary}
              onChange={(color) => handleColorChange('primary', color)}
              description="Botones principales, enlaces y elementos destacados"
            />
            <ColorPicker
              label="Color Secundario"
              value={config.colors.secondary}
              onChange={(color) => handleColorChange('secondary', color)}
              description="Texto secundario y elementos de apoyo"
            />
            <ColorPicker
              label="Color de Acento"
              value={config.colors.accent}
              onChange={(color) => handleColorChange('accent', color)}
              description="Elementos decorativos y destacados especiales"
            />
            <ColorPicker
              label="Fondo Principal"
              value={config.colors.background}
              onChange={(color) => handleColorChange('background', color)}
              description="Color de fondo principal de la aplicación"
            />
            <ColorPicker
              label="Superficie"
              value={config.colors.surface}
              onChange={(color) => handleColorChange('surface', color)}
              description="Color de tarjetas y componentes elevados"
            />
            <ColorPicker
              label="Texto Principal"
              value={config.colors.text}
              onChange={(color) => handleColorChange('text', color)}
              description="Color del texto principal"
            />
            <ColorPicker
              label="Bordes"
              value={config.colors.border}
              onChange={(color) => handleColorChange('border', color)}
              description="Color de bordes y separadores"
            />
          </div>
        </div>

        {/* Vista previa */}
        <div className="mb-6">
          <label 
            className="text-sm font-medium mb-3 block"
            style={{ color: config.colors.text }}
          >
            Vista previa
          </label>
          <div 
            className="p-4 rounded-lg border space-y-2"
            style={{ 
              backgroundColor: config.colors.background,
              borderColor: config.colors.border 
            }}
          >
            <div 
              className="px-3 py-2 rounded text-white text-sm font-medium"
              style={{ backgroundColor: config.colors.primary }}
            >
              Botón Primario
            </div>
            <div 
              className="px-3 py-2 rounded text-white text-sm font-medium"
              style={{ backgroundColor: config.colors.accent }}
            >
              Botón Acento
            </div>
            <div 
              className="px-3 py-2 rounded text-white text-sm font-medium"
              style={{ backgroundColor: '#10b981' }}
            >
              Mensaje de Éxito
            </div>
            <div 
              className="p-2 rounded border text-sm"
              style={{ 
                borderColor: config.colors.border,
                backgroundColor: config.colors.surface,
                color: config.colors.text 
              }}
            >
              Tarjeta de contenido
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex space-x-3">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Restablecer
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            size="sm"
            className="flex-1"
            style={{ backgroundColor: config.colors.primary }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </>
  );
}
