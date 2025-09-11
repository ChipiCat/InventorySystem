import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './shared/components/theme-provider';
import { AuthInitializer } from './shared/components/AuthInitializer';
import { ProtectedRoute } from './shared/components/protected-route';
import { Layout } from './shared/components/layout';
import LoginPage from './features/Login/pages/LoginPage';
import HomePage from './features/Home/pages/HomePage';

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <ThemeProvider defaultTheme="system" storageKey="inventory-ui-theme">
          <div className="min-h-screen bg-background text-foreground">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
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
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </AuthInitializer>
    </Provider>
  );
}

export default App;
