import React from "react";
import StatCards from "../Components/StatCards/StatCards";

const Dashboard = () => {
  return (
    <div className="bg-slate-100 flex flex-col w-full h-full overflow-y-scroll pb-4 rounded px-2">
      <h1 className="text-2xl font-bold mb-2 opacity-80">Bienvenu sur le Tableau de bord</h1>
     
      {/* Ajouter des graphiques ou des statistiques si nécessaire */}
      <StatCards/>
      
    </div>
  )
};

export default Dashboard;
