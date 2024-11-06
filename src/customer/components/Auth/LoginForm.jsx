import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import CustomButton from "../Mui/Mui Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../State/Auth/Actions";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accès à l'état auth
  const { jwt, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Si jwt est présent, cela signifie que la connexion a réussi
    if (jwt) {
      // Rafraîchir la page
      navigate("/");
      // Vous pouvez aussi utiliser navigate pour rediriger vers une autre page :
      // navigate("/dashboard");
    }
  }, [jwt, navigate]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));

    console.log("userData :", userData);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div>
        <h2 className="text-2xl mb-2 text-center">LOGIN</h2>
        <hr className="mb-4" />
      </div>
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
  );
};

export default LoginForm;
