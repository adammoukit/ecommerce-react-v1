import { Chip, Divider, styled, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../Mui/Mui Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../State/Auth/Actions";
import { toast } from "react-toastify";
import GoogleAuthButton from "./GoogleAuthButton";
import ReportIcon from "@mui/icons-material/Report";
import logo from "../../../assets/M_2.JPG";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showClassicError, setShowClassicError] = useState(false);
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setShowClassicError(true);
      const timeoutId = setTimeout(() => setShowClassicError(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      toast.success("Connexion réussie ! 🎉");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: (theme.vars || theme).palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-orange-300 shadow-lg"
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700">
            Connexion
          </h2>
          
          {showClassicError && (
            <div className="flex items-center justify-center bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              <span>{error}</span>
            </div>
          )}

          <div className="py-2">
            <GoogleAuthButton />
          </div>
          
          <Root>
            <Divider>
              <Chip label="OU" size="small" className="text-gray-500" />
            </Divider>
          </Root>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              size="small"
              className="mb-3"
            />
            
            <TextField
              required
              id="password"
              name="password"
              label="Mot de passe"
              type="password"
              fullWidth
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
            
            <div className="flex items-start mt-1 space-x-1">
              <ReportIcon sx={{ color: "orange", fontSize: 16 }} />
              <span className="text-xs text-gray-500">
                Les mots de passe doivent avoir au moins 6 caractères
              </span>
            </div>
            
            <div className="pt-4">
              <CustomButton 
                name={isLoading ? "Chargement..." : "Se connecter"} 
                disabled={isLoading}
                fullWidth
              />
            </div>
            
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => navigate("/auth/signup")}
                className={`text-blue-600 hover:text-blue-800 text-sm font-medium ${isLoading ? "italic" : ""}`}
              >
                Pas de compte ? Créez-en un
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;