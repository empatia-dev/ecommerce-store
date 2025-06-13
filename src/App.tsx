import { useEffect, useState } from 'react';
import './App.css'
import { BottomNavigationBar } from './components/BottomNavigationBar';
import { HomeScreen } from './screens/HomeScreen';
import type { Product } from './types/Product';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { CartScreen } from './screens/CartScreen';
import { type Order } from './store/store';
import { CheckoutScreen } from './screens/CheckoutScreen';
import AlertDialog from './components/AlertDialog';
import { AccountScreen } from './screens/AccountScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { CurrentOrderScreen } from './screens/CurrentOrderScreen';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartIndex, setCartIndex] = useState(0);
  const [accountIndex, setAccountIndex] = useState(0);
  const [ordersIndex, setOrdersIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  function handleSelected(index: number) {
    setSelectedIndex(index);
  }

  function showAlertDialog() {
      setShowAlert(true);
  }

  function hideAlert() {
      setShowAlert(false);
  }


  const purchaseAlertTitle = "Payment successful"
  const purchaseAlertMsg = "Thank you for your purchase!!"

  function goToCheckout() {
    navBarFadeout();
    setTimeout(() => {
      setCartIndex(1);
    }, 1000);
  }

  function handlePurchase(newOrder: Order) {
    setCurrentOrder(newOrder);
    // after payment, go to Orders screen via Account
    setTimeout(() => {
      setSelectedIndex(3); // Account tab
      setAccountIndex(1); // Orders section
      setOrdersIndex(1); // Current Order sub section
    }, 1000);
    setCartIndex(0);
  }

  function handleCheckoutBackButton() {
    setCartIndex(0); // Cart tab main section
    navBarFadeIn();
  }

  function handleAccountBackButton() {
    setAccountIndex(0); // Account tab main section
    navBarFadeIn();
  }
  
  function handleCurrentOrderBackButton() {
    setTimeout(() => {
      setOrdersIndex(0); // Orders Section
    }, 500);
  }

  function navBarFadeout() {
    setFadeIn(false); // trigger fade-out animation
      setTimeout(() => {
        setShowNavBar(false); //unmount after animation
    }, 1000);
  }

  function navBarFadeIn() {
    setShowNavBar(true); //mount before animation
    setFadeIn(false);
    requestAnimationFrame(() => setFadeIn(true)); // trigger fadein animation
  }

  function goToOrders() {
    navBarFadeout();
    setOrdersIndex(0);
    setTimeout(() => {
      setAccountIndex(1); // trigger Orders section fade-in after nav animation
    }, 1000);
  }

  function goToFavorites() {
    navBarFadeout();
    setTimeout(() => {
      setAccountIndex(2); // trigger Favorites section fade-in after nav animation
    }, 1000);
  }

  function handleGoToOrder(order: Order) {
    setCurrentOrder(order);
    setTimeout(() => {
      setOrdersIndex(1); // Current order sub section
    }, 500);
  }

  // screen components tree
  let content;
  switch (selectedIndex) {
    case 0:
      content = <HomeScreen />;
      break;
    case 1:
      content = <DiscoverScreen products={products}/>;
      break;
    case 2:
      switch (cartIndex) {
        case 0:
          content = <CartScreen
                      triggerFade={fadeIn}
                      handleGoToCheckout={goToCheckout} 
                    />;
          break;
        case 1:
          content = <CheckoutScreen
                      handlePurchase={handlePurchase}
                      triggerPurchaseAlert={showAlertDialog}
                      handleBackButton={handleCheckoutBackButton}
                      triggerFade={cartIndex === 1}
                    />
          break;
      }
      break;
    case 3:
      switch (accountIndex) {
        case 0:
          content = <AccountScreen
                      triggerFade={fadeIn}
                      goToOrders={goToOrders}
                      goToFavorites={goToFavorites}
                    />;
          break;
        case 1:
          switch (ordersIndex) {
            case 0: 
              content = <OrdersScreen
                          triggerFade={accountIndex===1}
                          handleBackButton={handleAccountBackButton}
                          handleGoToOrder={handleGoToOrder}
                      />;
              break;
            case 1:
              content = <CurrentOrderScreen
                          triggerFade={ordersIndex===1}
                          handleBackButton={handleCurrentOrderBackButton}
                          order={currentOrder}
                            
                        />
              break;
          }
          break;
        case 2:
          content = <FavoritesScreen
                      triggerFade={accountIndex===2}
                      handleBackButton={handleAccountBackButton}
                      products={products}
                    />;
          break;
      }
      break;
  }

  // load products
  useEffect(() => {
  fetch('/data/products.json')
    .then(res => res.json())
    .then(setProducts);
  }, []);

  return (
    <>
      <>{content}</>
      {showNavBar && <div className={`navigation-bar-container fade ${fadeIn ? "show" : ""}`}>
        <BottomNavigationBar
          selectedIndex={selectedIndex}
          onSelect={handleSelected}
        />
      </div>}
      {showAlert && <AlertDialog
        title={purchaseAlertTitle}
        msg={purchaseAlertMsg}
        hideAlert={hideAlert}
      />}
    </>
  )
}

export default App;
