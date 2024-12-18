import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const names = name.split(" ");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${names[0][0]}${names[1][0]}`, // Première lettre de firstName et lastName
  };
}

export default function BackgroundLetterAvatars() {
  // Utilisez useSelector pour récupérer l'utilisateur connecté depuis votre état global (Redux, etc.)
  const user = useSelector((state) => state.auth.user); // Assurez-vous que 'user' contient 'firstName' et 'lastName'

  const userFullName = user ? `${user.firstName} ${user.lastName}` : "inconnu";

  return (
    <Stack direction="row" spacing={2}>
      {/* Affiche l'avatar avec les initiales de l'utilisateur connecté */}
      <Avatar {...stringAvatar(userFullName)} />
    </Stack>
  );
}
