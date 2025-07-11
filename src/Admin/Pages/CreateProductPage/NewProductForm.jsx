import { Box } from 'lucide-react';
import React from 'react'
import WarningIcon from "@mui/icons-material/Warning"; // Icône d'avertissement
import { Typography } from '@mui/material';
import CreateProductTabs from './CreateProductTabs';

const NewProductForm = () => {


    const CreationWarning = () => {
        return (
          <div className='w-full mb-3 p-2 rounded bg-yellow-100 border border-yellow-300 text-yellow-800 flex items-center gap-2'>
           
          
            <WarningIcon sx={{ color: 'black', fontSize: 30 }} />
            
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              <strong>Version alpha :</strong> Ce formulaire est la première version 
              de notre outil de création de produits. Certaines fonctionnalités 
              pourraient être limitées ou en cours de développement.
            </Typography>
          </div>
        );
      };

  return (
    <div className='bg-slate-100 w-full h-full overflow-y-scroll rounded '>
        <CreationWarning />
        <CreateProductTabs/>
      
    </div>
  )
}

export default NewProductForm
