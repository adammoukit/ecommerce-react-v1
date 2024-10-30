import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Config/ApiConfig";
import { Button, TextField } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { LoadingButton } from "@mui/lab";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const stripe = useStripe(); // Initialize Stripe
  const elements = useElements(); // Initialize Elements
  const [amount, setAmount] = useState();

  const handleOnChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    console.log("amount: ", value); // Loggez la nouvelle valeur
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Check if Stripe.js has loaded
    if (!stripe || !elements) {
      return;
    }

    const data = new FormData(e.currentTarget);
    const paymentData = {
      amount: amount,
      email: data.get("email"), // Récupérer l'email depuis le formulaire
    };

    try {
      // Step 1: Create a payment method using the card details
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error: paymentMethodError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            email: paymentData.email, // Inclure l'email de l'utilisateur
          },
        });

      if (paymentMethodError) {
        setErrorMessage(paymentMethodError.message);
        setIsLoading(false);
        return;
      }
    //   je met ici au cas ou j'aurai besoin un jour : il s'agit de l'url de redirection pour les paiement
              // return_url: "http://localhost:5454/success"

      // Step 2: Send the amount and the paymentMethodId to your server
      const response = await api.post("/api/payments/create-payment-intent", {
        amount: paymentData.amount, 
        email: paymentData.email, 
        paymentMethodId: paymentMethod.id, // Inclure le moyen de paiement

        automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never" // Empêcher les redirections pour certains moyens de paiement
          }
      });

      const { clientSecret } = response.data;

      // Step 3: Confirm the payment with the client secret
      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        confirmParams: {
            return_url: 'http://localhost:5173/payment/success/',
          },
      });

      if (confirmResult.error) {
        setErrorMessage(confirmResult.error.message);
      } else if (
        confirmResult.paymentIntent &&
        confirmResult.paymentIntent.status === "succeeded"
      ) {
        navigate({ search: `step=3&order_id=${data.get("order_id")}` });
        console.log("Payment succeeded!");
      }
    } catch (error) {
      console.error("Error during payment process:", error); // Ajoutez ceci pour plus de détails
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  p-5">
      <h1 className="text-xl font-bold text-gray-400 mb-5 text-center">
        FINALISER VOTRE PAYEMENT EN SECURITE
      </h1>
      <div className="flex flex-col md:flex-row md:gap-20 p-5 border shadow-lg rounded-md h-auto w-full  justify-center items-center">
        <form
          onSubmit={handlePayment}
          className="w-full  flex flex-col md:flex-row gap-5 items-center"
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className="mb-10 w-full"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            id="amount"
            value={amount}
            type="number"
            label="Montant"
            onChange={handleOnChange}
            variant="outlined"
            className="mb-10 w-full"
            required
          />
          <CardElement className="border p-2 mt-4 mb-5 w-full" />
          <LoadingButton
            variant="contained"
            type="submit"
            className="w-40 h-12"
            loading={isLoading} // Utiliser la prop `loading`
            style={{ backgroundColor: "yellow", color: "black" }}
          >
            Payer
          </LoadingButton>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
