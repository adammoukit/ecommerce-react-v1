import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../Mui/Mui Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../State/Auth/Actions";
import GoogleAuthButton from "./GoogleAuthButton";
import { toast } from "react-toastify";
import ReportIcon from "@mui/icons-material/Report";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.error) {
      setShowError(true);
      setErrorMessage(auth.error);
      setIsLoading(false);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [auth.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData))
      .then(() => {
        if (!auth.error) {
          toast.success("Inscription réussie !");
          navigate("/");
        }
      })
      .finally(() => {
        if (!auth.error) setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700">
            Créer un compte
          </h2>
          
          {showError && (
            <div className="flex items-center justify-center bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              <span>{errorMessage}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Prénom"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                size="small"
              />
              
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Nom"
                fullWidth
                autoComplete="family-name"
                variant="outlined"
                size="small"
              />
            </div>
            
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              size="small"
            />
            
            <TextField
              required
              id="password"
              name="password"
              label="Mot de passe"
              type="password"
              fullWidth
              autoComplete="new-password"
              variant="outlined"
              size="small"
            />
            
            <div className="flex items-start mt-1 space-x-1">
              <ReportIcon sx={{ color: "orange", fontSize: 16 }} />
              <span className="text-xs text-gray-500">
                Le mot de passe doit contenir au moins 6 caractères
              </span>
            </div>
            
            <div className="pt-4">
              <CustomButton 
                name={isLoading ? "Inscription en cours..." : "S'inscrire"} 
                disabled={isLoading}
                fullWidth
              />
            </div>
          </form>
          
          <div className="py-4">
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Vous avez déjà un compte ? Connectez-vous
              </button>
            </div>
            
            <div className="flex justify-center my-4">
              <div className="border-t border-gray-300 flex-grow mt-2"></div>
              <span className="px-3 text-gray-500 text-sm">ou</span>
              <div className="border-t border-gray-300 flex-grow mt-2"></div>
            </div>
            
            <div className="py-2">
              <GoogleAuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;