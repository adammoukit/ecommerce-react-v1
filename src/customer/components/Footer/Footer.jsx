import React from "react";
import { Grid2, Typography, Link } from "@mui/material";
import { orange } from "@mui/material/colors";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#14101FFF",
        color: "white",
        padding: "30px 10",
        width: "100%",
      }}
    >
      <Grid2
        container
        spacing={4}
        justifyContent="space-between" // Distribuer les colonnes également
        alignItems="flex-start" // Aligner les items en haut
        sx={{ maxWidth: "1200px", margin: "0 auto" }} // Limiter la largeur pour éviter un étirement trop important
      >
        {/* Première colonne */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contacts
          </Typography>
          <div className="  gap-2">
            <h4>Se connecter à notre newsletter</h4>
            <input
              type="email"
              placeholder="Entrer votre email ici"
              className="px-3 py-1 rounded-sm"
            />
          </div>
        </Grid2>

        {/* Deuxième colonne */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <Link href="#" underline="none" variant="body2" display="block">
            Service 1
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Service 2
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Service 3
          </Link>
        </Grid2>

        {/* Troisième colonne */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Link href="#" underline="none" variant="body2" display="block">
            FAQ
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Assistance technique
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Contactez-nous
          </Link>
        </Grid2>

        {/* Quatrième colonne */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Suivez-nous
          </Typography>
          <Link href="#" underline="none" variant="body2" display="block">
            Facebook
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Twitter
          </Link>
          <Link href="#" underline="none" variant="body2" display="block">
            Instagram
          </Link>
        </Grid2>
      </Grid2>
      <h4 className="text-center my-3">
        &copy; Copyright 2024, tous droits réservé.Développé par{" "}
        <span style={{ color: "orange" }}>ABDOU-MOUKIT ADAM</span>
      </h4>
    </div>
  );
};

export default Footer;
