import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProduct,
  getAllGlobalProducts,
} from "../../State/Product/Action";
import { Avatar, Button } from "@mui/material";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductsTable() {
  const dispatch = useDispatch();
  const { globalProducts } = useSelector((store) => store.products);
  const [localProducts, setLocalProducts] = React.useState([]); // État local pour les produits

  const data = {
    category: "real madrid",
    colors: [],
    sizes: [],
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: "price_low",
    stock: "",
    pageNumber: 0,
    pageSize: 10,
  };

  // Synchroniser localProducts avec les produits du store au chargement ou après un fetch
  useEffect(() => {
    if (globalProducts?.content) {
      setLocalProducts(globalProducts.content);
    }
  }, [globalProducts]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(getAllGlobalProducts());
        setLocalProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        toast.success("Produit supprimé avec succès !");
      })
      .catch((error) => {
        toast.error("Échec de la suppression du produit !");
      });
  };

  useEffect(() => {
    dispatch(getAllGlobalProducts());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">produit</StyledTableCell>
            <StyledTableCell align="right">categorie</StyledTableCell>
            <StyledTableCell align="right">prix</StyledTableCell>
            <StyledTableCell align="right">quantité</StyledTableCell>
            <StyledTableCell align="right">SUPPRIMER</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localProducts?.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>
                <Avatar
                  alt="Image Produit"
                  src={item.mediaUrls[0] || "https://via.placeholder.com/150"}
                />
              </StyledTableCell>
              <StyledTableCell align="right" scope="row">
                {item.productTypeName}
              </StyledTableCell>

              <StyledTableCell align="right">
                {item.categoryName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.price} F CFA
              </StyledTableCell>
              <StyledTableCell align="right">{item.quantity} </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handleProductDelete(item.id)}
                  variant="outlined"
                  sx={{ color: "red" }}
                >
                  Supprimer
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
