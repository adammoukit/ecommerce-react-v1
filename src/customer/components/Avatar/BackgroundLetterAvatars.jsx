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

function stringAvatar(name, size) {
  const names = name.split(" ");
  const initials = names.length >= 2 ? `${names[0][0]}${names[1][0]}` : name[0];

  // Déterminer la taille en fonction de la prop
  const sizes = {
    small: { width: 28, height: 28, fontSize: "0.75rem" },
    medium: { width: 36, height: 36, fontSize: "1rem" },
    large: { width: 48, height: 48, fontSize: "1.25rem" },
  };

  const sizeConfig = sizes[size] || sizes.medium;

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: sizeConfig.width,
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
    },
    children: initials,
  };
}

export default function BackgroundLetterAvatars({ size = "medium" }) {
  const user = useSelector((state) => state.auth.user);

  // Gérer les cas où l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{
            bgcolor: "#e0e0e0",
            width: size === "small" ? 28 : 36,
            height: size === "small" ? 28 : 36,
          }}
        >
          ?
        </Avatar>
      </Stack>
    );
  }

  const userFullName = `${user.firstName} ${user.lastName}`;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(userFullName, size)} />
    </Stack>
  );
}
