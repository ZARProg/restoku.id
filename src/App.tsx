import React, { useState } from 'react';
import Layout from './components/Layout';
import NotificationContainer from './components/NotificationContainer';
import { useNotification } from './hooks/useNotification';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { notifications, removeNotification } = useNotification();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'menu':
        return <Menu />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </>
  );
}

export default App;