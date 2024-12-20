import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import "./style.css";

function valuetext(value) {
  return `${value}°C`;
}

const FilterSectionComponent = ({ addFilter }) => {
  const [value, setValue] = React.useState([0, 37]);

  const [expandedPrix, setExpandedPrix] = useState(true);

  const [expandedCategory, setExpandedCategory] = useState(false);

  const [expandedMarque, setExpandedMarque] = useState(false);

  const [expandedType, setExpandedType] = useState(false);

  const handleExpansionPrix = () => {
    setExpandedPrix((prevExpanded) => !prevExpanded);
  };

  const handleExpansionCategory = () => {
    setExpandedCategory((prevExpanded) => !prevExpanded);
  };

  const handleExpansionMarque = () => {
    setExpandedMarque((prevExpanded) => !prevExpanded);
  };

  const handleExpansionType = () => {
    setExpandedType((prevExpanded) => !prevExpanded);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCategoryClick = (category) => {
    addFilter(category);
  };

  const handleBrandClick = (brand) => {
    addFilter(brand);
  };
  const handleTypeClick = (brand) => {
    addFilter(brand);
  };

  return (
    <div className="filterSide">
      <Box sx={{ padding: "5px", paddingY: "15px" }}>
        <h2> MES FILTRES</h2>

        <Accordion
          expanded={expandedPrix}
          onChange={handleExpansionPrix}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expandedPrix
              ? {
                  [`& .${accordionClasses.region}`]: {
                    height: "auto",
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "block",
                  },
                }
              : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span className="font-bold">prix</span>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography> */}
            <Slider
              sx={{ color: "black", opacity: "70" }}
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expandedCategory}
          onChange={handleExpansionCategory}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expandedCategory
              ? {
                  [`& .${accordionClasses.region}`]: {
                    height: "auto",
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "block",
                  },
                }
              : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span className="font-bold opacity-70">Categorie</span>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li onClick={() => handleCategoryClick("Electronique")} className="py-1 px-2 hover:bg-slate-400 text-black font-bold text-sm cursor-pointer rounded-md">
                <Typography></Typography>Electronique
              </li>
              <li onClick={() => handleCategoryClick("Sante")} className="py-1 px-2 hover:bg-slate-400 text-black font-bold text-sm cursor-pointer rounded-md">
                <Typography></Typography>Sante
              </li>
              <li onClick={() => handleCategoryClick("Mode")} className="py-1 px-2 hover:bg-slate-400 text-black font-bold text-sm cursor-pointer rounded-md">
                <Typography></Typography>Mode
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expandedMarque}
          onChange={handleExpansionMarque}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expandedMarque
              ? {
                  [`& .${accordionClasses.region}`]: {
                    height: "auto",
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "block",
                  },
                }
              : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span className="font-bold opacity-70">Marque</span>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li onClick={() => handleBrandClick("SONY")} className="py-1 px-2 hover:bg-slate-400 text-black font-bold text-sm cursor-pointer rounded-md">
                <Typography></Typography>SONY
              </li>
              <li  onClick={() => handleBrandClick("NIKE")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>NIKE
              </li>
              <li onClick={() => handleBrandClick("ZARA")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>ZARA
              </li>
              <li onClick={() => handleBrandClick("AKLAAA")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>AKLAAA
              </li>
              <li onClick={() => handleBrandClick("BUGATTY")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>BUGATTY
              </li>
              <li onClick={() => handleBrandClick("VERIZON")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>VERIZON
              </li>
              <li onClick={() => handleBrandClick("CALVIN KLEIN")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>CALVIN KLEIN
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        {/* ici c'est pour le type de produit */}
        <Accordion
          expanded={expandedType}
          onChange={handleExpansionType}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expandedType
              ? {
                  [`& .${accordionClasses.region}`]: {
                    height: "auto",
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "block",
                  },
                }
              : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span className="font-bold opacity-70">TYPE DE PRODUIT</span>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li onClick={() => handleTypeClick("SmartPhone")} className="py-1 px-2 hover:bg-slate-400 text-black font-bold text-sm cursor-pointer rounded-md">
                <Typography></Typography>SmartPhone
              </li>
              <li  onClick={() => handleTypeClick("Télévision")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Télévision
              </li>
              <li onClick={() => handleTypeClick("Ordinateur Portable")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Ordinateur Portable
              </li>
              <li onClick={() => handleTypeClick("Imprimante")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Imprimante
              </li>
              <li onClick={() => handleTypeClick("Casque Audio")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Casque Audio
              </li>
              <li onClick={() => handleTypeClick("Machine à Laver")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Machine à Laver
              </li>
              <li onClick={() => handleTypeClick("Jeux Vidéo")} className="py-1 px-2 hover:bg-slate-400 cursor-pointer font-bold text-sm rounded-md">
                <Typography></Typography>Jeux Vidéo
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default FilterSectionComponent;
