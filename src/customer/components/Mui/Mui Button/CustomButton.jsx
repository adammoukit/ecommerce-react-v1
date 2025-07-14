import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

// Style pour le texte de chargement
const LoadingText = styled("div")({
  fontStyle: "italic",
  color: "#666",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
  padding: "6px 12px",
  fontSize: "16px",
});

export default function CustomButton({ name }) {
  const { loginResponse, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.auth
  );

  return (
    <Stack spacing={2} direction="row">
      {isLoading ? (
        <LoadingText>
          <CircularProgress size={16} /> {/* Indicateur visuel optionnel */}
          Loading...
        </LoadingText>
      ) : (
        <ColorButton
          className="w-full"
          type="submit"
          variant="contained"
          disabled={isLoading} // Désactive le bouton pendant le chargement
        >
          {name}
        </ColorButton>
      )}
    </Stack>
  );
}
