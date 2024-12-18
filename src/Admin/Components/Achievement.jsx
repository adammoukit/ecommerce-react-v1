import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const trignleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});
const TrophyImg = styled("img")({
  right: 20,
  bottom: 20,
  height: 68,
  position: "absolute",
});

const Achievement = () => {
  return (
    <Card sx={{ position: "relative" , bgcolor:"#242B2E" , color:"white"}}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop avec MOUKIT' STORE
        </Typography>
        <Typography>Congratulation</Typography>
        <Typography variant="h5" sx={{my:3}}>29.5k de ventes</Typography>
        <Button variant="contained" size="small">
          Voir les ventes
        </Button>
      </CardContent>
      {/* Image du trophée */}
      <TrophyImg
        src="https://img.freepik.com/free-vector/trophy-flat-style_78370-3222.jpg?semt=ais_hybrid"
        alt="Trophée"
      />
    </Card>
  );
};

export default Achievement;
