import { Textarea } from "@/components/ui/textarea";
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";

const DescriptionForm = () => {
  return (
    <div>
      <div className="w-full h-full flex flex-col gap-4  bg-white rounded px-4 lg:px-[60px] py-10 shadow">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <span className="text-[15px] w-full text-left lg:w-[23%] text-gray-700 font-semibold lg:text-right">
            description du produit :
          </span>
          <Textarea
            
           
            placeholder="Description du produit."
            rows={7}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;
