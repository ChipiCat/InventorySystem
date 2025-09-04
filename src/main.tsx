import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, AuthProvider } from "./shared/components";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
    <ThemeProvider defaultTheme="system" storageKey="inventory-ui-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </Provider>
)
