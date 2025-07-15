import React from "react";
import { Divider } from "@mui/material";

const MobileCartSummary = ({ totalItems, totalPrice }) => {
  return (
    <div className="lg:hidden mobile-cart-summary">
      <div className="summary-content">
        <div className="summary-header">
          <h3>Récapitulatif de commande</h3>
        </div>

        <div className="price-row">
          <span>Articles ({totalItems})</span>
          <span>{totalPrice} CFA</span>
        </div>

        <div className="price-row">
          <span>Réduction</span>
          <span className="discount">0 CFA</span>
        </div>

        <div className="price-row">
          <span>Livraison</span>
          <span className="free-shipping">Gratuite</span>
        </div>

        <Divider className="summary-divider" />

        <div className="total-row">
          <span>Total</span>
          <span className="total-price">{totalPrice} CFA</span>
        </div>
      </div>
    </div>
  );
};

export default MobileCartSummary;
