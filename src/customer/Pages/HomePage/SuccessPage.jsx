import { Alert, Button } from "@mui/material";
import React, { useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const SuccessPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // Récupérer l'ID de la commande à partir de l'URL
  const orderId = searchParams.get("order_id");
  return (
    <div className="container mx-auto h-90vh flex items-center justify-center border p-10 rounded-md shadow-lg mb-10 mt-5 ">
      <div className="w-full md:w-2/4 border p-5 rounded-lg bg-slate-900">
        <h1 className="text-green-500 text-xl font-bold mb-5">
          <div className="flex flex-col items-center gap-5 justify-center">
            <TaskAltIcon sx={{fontSize: "6rem"}} />
            <p>
              FELICITATION VOTRE COMMANDE A ETE RECU ,{" "}
              {`votre order id est : ${orderId}`}
            </p>
          </div>
        </h1>
        <div className="flex flex-col items-center gap-5">
          <p className="text-white font-semibold text-lg">
            MERCI D'AVOIR COMMANDER CHEZ <span className="text-amber-600">MOUKIT INF &copy;</span>
          </p>
          <p className="text-white font-medium">PASSER UNE BONNE JOURNEE</p>
          <Button variant="contained">Contained</Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;


