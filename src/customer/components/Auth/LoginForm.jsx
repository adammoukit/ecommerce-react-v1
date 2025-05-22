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
  const [showClassicError, setShowClassicError] = useState(false); // Accès à l'état auth
  const { loginResponse, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let timeoutId;
    
    if (error) {
      setShowClassicError(true);
      timeoutId = setTimeout(() => {
        setShowClassicError(false);
       
      }, 5000); // 5 secondes
    }
  
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error]); 

  useEffect(() => {
    // Si jwt est présent, cela signifie que la connexion a réussi
    if (isLoggedIn) {
      // Rafraîchir la page
      navigate("/");
      console.log("jwt :", loginResponse);
      // toast.success(loginResponse);
      toast.success("Connexion réussie ! 🎉");
      // Vous pouvez aussi utiliser navigate pour rediriger vers une autre page :
      // navigate("/dashboard");
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

  // ici le styled component pour le divider

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: (theme.vars || theme).palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-200">
      <div className="mb-4">
        <img
          src={logo}
          alt="Logo du site"
          className="h-20 w-20 rounded-full  border-2 border-orange-300 shadow-lg "
        />
      </div>
      <div className="max-w-lg mx-auto p-4 w-[30%] rounded-md bg-slate-100 space-y-5">
        <h2 className="text-2xl mb-4 text-center underline font-bold opacity-70">
          Connexion
        </h2>
        {showClassicError && (
          <div className="flex items-center justify-center bg-red-400 text-black p-2 rounded-md">
            <span>{error}</span>
          </div>
        )}
        <div class name="flex  flex-col border p-2 items-center mb-8">
          <GoogleAuthButton />
          {/* <h2 className="text-2xl mb-2 text-center">LOGIN</h2> */}
          <hr className="mb-4" />
        </div>
        <Root>
          <Divider>
            <Chip label="OU" size="small" />
          </Divider>
        </Root>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Email */}
          <div>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </div>

          {/* Champ Password */}
          <div>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
            />
            <div className="flex items-center mt-2 space-x-1">
              <span>
                <ReportIcon sx={{ color: "orange" }} />
              </span>
              <span className="text-sm text-gray-500">
                Les mots de passe doivent au moins avoir 6 caractères.
              </span>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className=" border">
            <CustomButton name="Login" />
          </div>
          <div>
            <div className="flex items-center justify-center mt-5">
              <p>Don't have account? </p>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="ml-3 text-blue-700 "
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
