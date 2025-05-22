import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Css/AccountLinkingPage.css";
import CustomButton from "../Mui/Mui Button/CustomButton";
import { Chip, Divider, styled, TextField } from "@mui/material";
import { login } from "../../../State/Auth/Actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AccountLinkingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { email, existingProvider } = state || {};
  const [showClassicLogin, setShowClassicLogin] = React.useState(false);

  // Accès à l'état auth
  const { loginResponse, user, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const handleLoginWithExisting = () => {
    //   navigate("/login", { state: { preFilledEmail: email } });
    setShowClassicLogin((prev) => !prev);
  };

  const handleLinkAccounts = async () => {
    try {
      // 2. Appel API pour lier les comptes
      const { data } = await api.post("/link-accounts", {
        email,
        password,
        googleToken,
      });

      // 3. Connexion automatique
      localStorage.setItem("jwt", data.jwt);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Échec de la liaison");
    }
  };

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

  useEffect(() => {
    if (user) {
      toast.success("Connexion réussie ! 🎉");
      navigate("/"); // Redirection vers la page d'accueil
    }

    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  return (
    <div className="min-h-screen account-linking-container">
      <div className="max-w-lg mx-auto p-6 h-auto bg-slate-100   rounded-md">
        <h2 className="font-bold p-2 text-black rounded-md bg-red-300 ">
          <span className="font-bold text-green-700"> {email}</span> existe déjà
          avec un provider {existingProvider}
        </h2>

        <div className="p-2 mt-5 space-y-4">
          <button
            className="handleLinkbutton ClassicButton"
            onClick={handleLoginWithExisting}
          >
            Se connecter avec {existingProvider} suivant la methode
            classique(Email/mot de passe)
          </button>

          {showClassicLogin && (
            <div className="max-w-lg mx-auto p-4">
              <div class name="flex flex-col items-center mb-4">
                {/* <GoogleAuthButton /> */}
                {/* <h2 className="text-2xl mb-2 text-center">LOGIN</h2> */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <CustomButton name={isLoading ? "Chargement..." : "Login"} />
                </div>
              </form>
            </div>
          )}

          <Root>
            <Divider>
              <Chip label="OU" size="small" />
            </Divider>
          </Root>

          <button
            className="handleLinkbutton bg-blue-600 font-bold text-white"
            onClick={handleLinkAccounts}
          >
            Lier les comptes ({existingProvider} ↔ Google)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountLinkingPage;
