import { Grid2 } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverView from "./MonthlyOverView";
import ProductsTable from "./ProductsTable";

const Dashboard = () => {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={4}>
          <Achievement />
        </Grid2>
        <Grid2 item xs={12} md={8} sx={{flexGrow:1}}>
          <MonthlyOverView />
        </Grid2>
        <Grid2 item xs={12} >
          <ProductsTable/>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Dashboard;
