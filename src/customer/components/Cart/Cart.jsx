import React, { useEffect, useMemo } from "react";
import CartItem from "./CartItem";
import { Button, CircularProgress, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import "./Cart.css";
import PaymentIcon from "@mui/icons-material/Payment";
import MobileCartSummary from "./MobileCartSummary"; // Nouveau composant pour mobile

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const loading = useSelector((state) => state.cart.loading);
  const jwt = useSelector((store) => store.auth.jwt);

  const handleCheckout = () => {
    navigate("/checkout/?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItems, cart.totalItem, jwt]);

  const sortedCartItems = useMemo(() => {
    return [...(cart.cart?.cartItems || [])].sort((a, b) => a.id - b.id);
  }, [cart.cart?.cartItems]);

  return (
    <div className="cart-container">
      {/* Indicateur de chargement */}
      {loading && (
        <div className="cart-loading-overlay">
          <CircularProgress />
        </div>
      )}

      {/* Version mobile - Bouton de checkout fixé en bas */}
      <div className="lg:hidden mobile-checkout-button">
        <Button
          fullWidth
          variant="contained"
          onClick={handleCheckout}
          className="checkout-btn"
          sx={{ 
            bgcolor: "orange", 
            color: "white", 
            fontWeight: 700,
            py: 1.5
          }}
        >
          <PaymentIcon className="mr-2" />
          Commander ({cart.cart?.totalPrice} CFA)
        </Button>
      </div>

      <div className="cart-grid">
        {/* Section des articles */}
        <div className="cart-items-section">
          {/* En-tête desktop uniquement */}
          <div className="cart-header-desktop">
            <span>Produit</span>
            <span>Prix</span>
            <span>Quantité</span>
            <span>Actions</span>
          </div>
          
          {/* Liste des articles */}
          <div className="cart-items-list">
            {sortedCartItems.length > 0 ? (
              sortedCartItems.map((item) => (
                <CartItem key={item.id} prod={item} loading={loading} />
              ))
            ) : (
              <div className="empty-cart-message">
                <p>Votre panier est vide</p>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate("/")}
                >
                  Commencer mes achats
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Récapitulatif desktop */}
        <div className="cart-summary-desktop">
          <div className="summary-content">
            <div className="summary-header">
              <p className="summary-title">Récapitulatif</p>
              <p>Articles: {cart.cart?.totalItem || 0}</p>
            </div>
            
            <Divider className="summary-divider" />
            
            <div className="price-row">
              <span>Prix total</span>
              <span>{cart.cart?.totalPrice || 0} CFA</span>
            </div>
            
            <div className="price-row">
              <span>Réduction</span>
              <span className="discount">0 CFA</span>
            </div>
            
            <div className="price-row">
              <span>Livraison</span>
              <span className="free-shipping">Gratuite</span>
            </div>
            
            <Divider className="summary-divider" sx={{ my: 1 }} />
            
            <div className="total-row">
              <span>Total</span>
              <span className="total-price">
                {cart.cart?.totalPrice || 0} CFA
              </span>
            </div>
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckout}
              className="checkout-btn"
              sx={{ 
                bgcolor: "orange", 
                color: "white", 
                fontWeight: 700,
                mt: 2
              }}
            >
              <PaymentIcon className="mr-2" />
              Commander
            </Button>
          </div>
        </div>
      </div>

      {/* Récapitulatif mobile (affiché après les articles) */}
      <MobileCartSummary 
        totalItems={cart.cart?.totalItem || 0}
        totalPrice={cart.cart?.totalPrice || 0}
      />
    </div>
  );
};

export default Cart;