import { Checkbox } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VariantTemplate = ({ variantType, variants, onVariantChange }) => {
  const handleFieldChange = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    onVariantChange(updatedVariants);
  };

  // Détermine les colonnes à afficher selon le type de variation
  const getColumns = () => {
    switch (variantType) {
      case "couleur":
        return ["Couleur"];
      case "taille":
        return ["Taille"];
      case "couleur-taille":
        return ["Couleur", "Taille"];
      default:
        return [];
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const SKUFeedbackDialog = () => {
    return (
      <React.Fragment>
        <Button onClick={handleClickOpen}>
          <HelpOutlineIcon />
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
           
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom variant="subtitle1">
              🏷️ SKU (Code Article) - Votre identifiant unique pour :
            </Typography>

            <Typography gutterBottom>
              • Suivre chaque variante en stock
              <br />
              • Analyser les ventes par caractéristique
              <br />• Automatiser la gestion des commandes
            </Typography>

            <Typography gutterBottom variant="subtitle1" sx={{ mt: 2 }}>
              📝 Comment le créer ?
            </Typography>

            <Typography gutterBottom>
              Structure type :<br />
              <strong>[Catégorie]-[Couleur]-[Taille]</strong>
              <br />
              Ex: <code>TSHIRT-ROUGE-M</code> ou <code>CHAUSS-42-NOIR</code>
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Astuce : Utilisez des abréviations courtes et cohérentes
            </Typography>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </React.Fragment>
    );
  };

  return (
    <div className="w-full h-full overflow-x-auto mb-[70px]">
      <div className="min-w-[800px] flex flex-col gap-4">
        {/* En-têtes */}
        <div className="grid grid-cols-12 gap-4 bg-gray-100 p-2 rounded-t border">
          <div className="col-span-1 font-bold text-sm text-gray-600">
            Action
          </div>
          {getColumns().map((col, index) => (
            <div
              key={index}
              className="col-span-2 font-bold text-sm text-gray-600"
            >
              {col}
            </div>
          ))}
          <div className="col-span-2 font-bold text-sm flex gap-2 items-center text-gray-600">
            <span>SKU</span>
            <SKUFeedbackDialog />
          </div>
          <div className="col-span-2 font-bold text-sm text-gray-600">
            Condition de l'article
          </div>
          <div className="col-span-3 font-bold text-sm text-gray-600">
            Prix (XOF)
          </div>
        </div>
        <div className="grid grid-cols-12 w-full  h-[60px] rounded  bg-gray-200">
          <div className="col-span-1  h-full  p-2 gap-2">
            <Checkbox inputProps={{ "aria-label": "controlled" }} />
          </div>
        </div>

        {/* Ligne exemple */}
        {variants.map((variant, index) => (
          <div
            key={variant.id}
            className="grid grid-cols-12 gap-4 p-2 border-b hover:bg-gray-50"
          >
            <div className="col-span-1 flex items-center gap-2">
              <Checkbox
                checked={variant.selected}
                onChange={(e) =>
                  handleFieldChange(index, "selected", e.target.checked)
                }
              />
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                ✏️
              </button>
            </div>

            {variantType.includes("couleur") && (
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={variant.couleur}
                  onChange={(e) =>
                    handleFieldChange(index, "couleur", e.target.value)
                  }
                />
              </div>
            )}

            {variantType.includes("taille") && (
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={variant.taille}
                  onChange={(e) =>
                    handleFieldChange(index, "taille", e.target.value)
                  }
                />
              </div>
            )}

            <div className="col-span-2">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={variant.sku}
                onChange={(e) =>
                  handleFieldChange(index, "sku", e.target.value)
                }
              />
            </div>

            <div className="col-span-2">
              <select
                className="w-full p-2 border text-[13px] text-gray-600 rounded bg-white"
                value={variant.condition}
                onChange={(e) =>
                  handleFieldChange(index, "condition", e.target.value)
                }
              >
                <option>Neuf</option>
                <option>Occasion</option>
                <option>Reconditionné</option>
              </select>
            </div>

            <div className="col-span-3">
              <div className="flex items-center">
                <span className="font-semibold text-[15px] text-gray-600 p-2 rounded-tl rounded-bl bg-gray-100 border-2">
                  XOF
                </span>
                <input
                  type="number"
                  min={0}
                  className="w-full p-2 border rounded"
                  value={variant.prix}
                  onChange={(e) =>
                    handleFieldChange(index, "prix", e.target.value)
                  }
                  placeholder=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantTemplate;
