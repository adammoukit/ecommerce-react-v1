import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import CustomButton from "../Mui/Mui Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../State/Auth/Actions";
import { store } from "../../../State/store";
import GoogleAuthButton from "./GoogleAuthButton";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData));

    console.log("userData :", userData);
    navigate("/store");
  };

  return (
    <div className="max-w-lg mx-auto p-4 block">
      <div>
        <h2 className="text-2xl mb-2 text-center">SIGNUP</h2>
        <hr className="mb-4" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Champ First Name */}
          <div>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </div>

          {/* Champ Last Name */}
          <div>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </div>
        </div>

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
          <CustomButton name="Register" />
        </div>
      </form>
      <div className="mt-5">
        <hr />
      </div>
      <div>
        <div className="flex flex-col  items-center justify-center mt-5">
          <div>
            <p>Have you already an account? </p>
            <button
              onClick={() => navigate("/login")}
              className="ml-3 text-blue-700 "
            >
              Login
            </button>
          </div>
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
