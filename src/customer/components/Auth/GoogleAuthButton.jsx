import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../../State/Auth/Actions"; // Importez l'action

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Accès à l'état auth
  const { loginResponse, user, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      // toast.success("Connexion réussie ! 🎉");
      navigate("/");
    }
  }, [user, dispatch]);

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Dispatch de l'action Redux
      const resultAction = await dispatch(googleAuth(token));

      // Si la liaison de compte est nécessaire
      if (resultAction.payload?.requiresLinking) {
        navigate("/account-linking", {
          state: {
            email: resultAction.payload.email,
            existingProvider: resultAction.payload.existingProvider,
            googleToken: token,
          },
        });
      }
    } catch (error) {
      console.error("Erreur d'authentification Google:", error);
      if (error.status === 409) {
        navigate("/account-linking", {
          state: {
            email: error.response.data.details.email,
            existingProvider: error.response.data.details.existingProvider,
          },
        });
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("Échec de la connexion Google")}
        useOneTap
        auto_select
        render={({ onClick }) => (
          <button
            onClick={onClick}
            className="w-[70%] flex items-center justify-center gap-3
                px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm
                hover:shadow-md transition-shadow duration-200 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-sm font-medium text-gray-700">
              Continuer avec Google
            </span>
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
