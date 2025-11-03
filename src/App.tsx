import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import VendorsPage from './components/VendorsPage';
import VendorDetailPage from './components/VendorDetailPage';
import CartCheckoutPage from './components/CartCheckoutPage';
import PartnerPage from './components/PartnerPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import VendorDashboardPage from './components/VendorDashboardPage';
import { AIChatAssistant } from './components/AIChatAssistant';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { getTotalItems } = useCart();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage onNavigate={handleNavigate} />;
    }
    
    if (currentPage === 'vendors') {
      return <VendorsPage onNavigate={handleNavigate} />;
    }
    
    if (currentPage.startsWith('vendor-')) {
      const vendorId = currentPage.replace('vendor-', '');
      return <VendorDetailPage vendorId={vendorId} onNavigate={handleNavigate} />;
    }
    
    if (currentPage === 'cart') {
      return <CartCheckoutPage onNavigate={handleNavigate} />;
    }
    
    if (currentPage === 'partner') {
      return <PartnerPage />;
    }
    
    if (currentPage === 'about') {
      return <AboutPage />;
    }
    
    if (currentPage === 'contact') {
      return <ContactPage />;
    }
    
    if (currentPage === 'orders') {
      return <OrderHistoryPage onNavigate={handleNavigate} />;
    }
    
    if (currentPage === 'vendor-dashboard') {
      return <VendorDashboardPage onNavigate={handleNavigate} />;
    }
    
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        cartCount={getTotalItems()}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <AIChatAssistant />
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
