import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Login from './pages/Login';
import AuthWrapper from './components/AuthWrapper';
import Navbar from './pages/Navbar';
import { Vehicles } from './pages/Vehicles';
import { Drivers } from './pages/Drivers';
import "./App.css"
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <Navbar />

          <main className='px-8 flex justify-center'>
            <div className='w-[1280px]'>

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/vendors"
                  element={
                    <AuthWrapper requiredPermissions={{ canManageVendors: true }}>
                      <Vendors />
                    </AuthWrapper>
                  }
                />
                <Route
                  path="/vehicles"
                  element={
                    <AuthWrapper requiredPermissions={{ canManageVehicles: true }}>
                      <Vehicles />
                    </AuthWrapper>
                  }
                />
                <Route
                  path="/drivers"
                  element={
                    <AuthWrapper requiredPermissions={{ canManageDrivers: true }}>
                      <Drivers />
                    </AuthWrapper>
                  }
                />
                <Route
                  path="/"
                  element={
                    <AuthWrapper>
                      <Dashboard />
                    </AuthWrapper>
                  }
                />
              </Routes>
            </div>
          </main>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
