import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ThemeConfig {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
}

interface ThemeState {
  config: ThemeConfig;
}

const initialState: ThemeState = {
  config: {
    mode: "dark",
    colors: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      surface: "hsl(var(--card))",
      background: "hsl(var(--background))",
      text: "hsl(var(--foreground))",
      textSecondary: "hsl(var(--muted-foreground))",
      border: "hsl(var(--border))",
      accent: "hsl(var(--accent))",
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.config.mode = action.payload;
    },
    updateThemeColors: (state, action: PayloadAction<Partial<ThemeConfig["colors"]>>) => {
      state.config.colors = { ...state.config.colors, ...action.payload };
    },
  },
});

export const { setThemeMode, updateThemeColors } = themeSlice.actions;
export default themeSlice.reducer;
