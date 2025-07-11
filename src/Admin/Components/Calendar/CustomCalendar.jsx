import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CustomCalendar = () => {
  const [date, setDate] = React.useState();

  const [deviceWidth, setDeviceWidth] = useState(() => window.innerWidth);
  const mdWidth = 780;

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setDeviceWidth(newWidth);
    console.log(`Nouvelle largeur détectée : ${newWidth}`);
   
    
  };
  
  let isMobile ;
  

 

  useEffect(() => {
    // Initialisation de la largeur au montage
    handleResize();

    // Ajout du listener
    window.addEventListener("resize", handleResize);
    isMobile = deviceWidth < mdWidth
    console.log("is Mobile ? :" , isMobile)
    
    // Nettoyage lors du démontage
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start  lg:w-auto text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date
            ? format(date, "PPP")
            : deviceWidth > mdWidth && <span>Choisir la date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomCalendar;
