import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute, Layout } from "./shared/components";
import { ThemeProvider } from "./shared/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./store";
import HomePage from "./features/Home";
import LoginPage from "./features/Login";
import ForgotPasswordPage from "./features/Login/pages/ForgotPasswordPage";
import DevelopmentHelper from "./components/DevelopmentHelper";
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              {import.meta.env.DEV && <DevelopmentHelper />}
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;