import {
  AccountBalance,
  AttachMoneyOutlined,
  SettingsCellOutlined,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, letterSpacing, lineHeight } from "@mui/system";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const saleData = [
  {
    stats: "245k",
    title: "Ventes",
    color: "#ede99d",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Utilisateurs",
    color: "#c2f970",
    icon: <AccountBalance sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Produits",
    color: "#ff9470ng",
    icon: <SettingsCellOutlined sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "80k",
    title: "Revenues",
    color: "#043b5c",
    icon: <AttachMoneyOutlined sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return saleData.map((item, index) => (
    <Grid2 item xs={12}  key={index} >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"center",
          width: "100%",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid2>
  ));
};

const MonthlyOverView = () => {
  return (
    <Card sx={{ bgcolor: "#242B2E", color: "white" }}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "white" }} />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, mx: 1, color: "green" }}
            >
              croissance totale de 58,8%
            </Box>
            ce mois-ci
          </Typography>
        }
        titleTypographyProps={{
          mb: 2.5,
          lineHeight: "2rem !important",
          letterSpacing: ".15 !important",
        }}
      />
      <CardContent
        sx={{ pt: (theme) => `${theme.spacing(3)} !important`, width: "100%", justifyContent:"center" }}
      >
        <Grid2 container spacing={4} sx={{ width: "100%" }}>
          {renderStats()}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverView;
