import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute, Layout } from "./shared/components";
import { ThemeProvider } from "./shared/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./store";
import HomePage from "./features/Home";
import LoginPage from "./features/Login";
import ForgotPasswordPage from "./features/Login/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/Login/pages/ResetPasswordPage";
import DevelopmentHelper from "./components/DevelopmentHelper";
import { EmailTester } from "./components/EmailTester";
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
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/test-email" element={<EmailTester />} />
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
              
              {/* Development Helper - solo en desarrollo */}
              {import.meta.env.DEV && <DevelopmentHelper />}
              {/* Firebase Debugger - para verificar configuración */}
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;