import { useEffect } from 'react';
import { useAppSelector } from '../../store';

export function ThemeProviderDynamic({ children }: { children: React.ReactNode }) {
  const { config } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const { colors, mode } = config;

    root.classList.remove('light', 'dark');
    root.classList.add(mode);

    const hexToHsl = (hex: string) => {
      hex = hex.replace('#', '');
      
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;

      // Encontrar max y min
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Aplicar variables CSS personalizadas
    root.style.setProperty('--primary', hexToHsl(colors.primary));
    root.style.setProperty('--secondary', hexToHsl(colors.secondary));
    root.style.setProperty('--accent', hexToHsl(colors.accent));
    root.style.setProperty('--background', hexToHsl(colors.background));
    root.style.setProperty('--card', hexToHsl(colors.surface));
    root.style.setProperty('--foreground', hexToHsl(colors.text));
    root.style.setProperty('--muted', hexToHsl(colors.surface));
    root.style.setProperty('--muted-foreground', hexToHsl(colors.textSecondary));
    root.style.setProperty('--border', hexToHsl(colors.border));
    root.style.setProperty('--input', hexToHsl(colors.border));
    root.style.setProperty('--ring', hexToHsl(colors.primary));

  }, [config]);

  return <>{children}</>;
}
