import {
  Avatar,
  AvatarGroup,
  Button,
  Fade,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Orders/Action";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

const OrderTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
    console.log("orders :", adminOrder);
  }, [
    adminOrder.shipped,
    adminOrder.confirmed,
    adminOrder.placed,
    adminOrder.delivered,
    adminOrder.canceled,
  ]);

  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    console.log("confirm order: ", orderId);
  };

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    console.log("shipped order: ", orderId);
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
  };

  return (
    <div>
      <h2>
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          className="py-3 text-center"
        >
          LISTES DES COMMANDES
        </Typography>
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Image
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  ID paiyement
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Client
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Prix Total
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Quantité Commandée
                </Typography>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Statut
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  MAJ statut
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  SUPPRIMER
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder?.orders?.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>
                  <AvatarGroup className="cursor-pointer" max={2}>
                    {item?.orderItems?.map((orderItem) => (
                      <Avatar
                        key={orderItem?.product?.id}
                        alt="Image Produit"
                        src={orderItem?.product?.imageUrl}
                      />
                    ))}
                  </AvatarGroup>
                </StyledTableCell>
                <StyledTableCell align="right" scope="row">
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    className=""
                  >
                    {item.payementDetails.paymentId}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <p className="py-1 px-2 bg-green-500 rounded-full text-center">
                    {item.user.email}
                  </p>
                </StyledTableCell>
                <StyledTableCell  align="right">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#39A070FF",
                    }}
                  >
                    {item.totalPrice} F CFA
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                    {item.totalItem}{" "}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography
                    sx={{ fontSize: "15px", fontWeight: "bold" }}
                    className={`px-5 py-2 text-white rounded-full text-center ${
                      item.orderStatus === "PENDING"
                        ? "bg-[#db8888]"
                        : item.orderStatus === "PAID"
                        ? "bg-[#05c46b]"
                        : item.orderStatus === "SHIPPED"
                        ? "bg-[#5b77c5]"
                        : item.orderStatus === "CONFIRMED"
                        ? "bg-[#9ab134]"
                        : item.orderStatus === "PAID"
                        ? "bg-[#05c46b]"
                        : "bg-[#3a581e]"
                    }`}
                  >
                    {item.orderStatus}{" "}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          {...bindTrigger(popupState)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Statut <ArrowDropDownIcon sx={{ fontSize: "30px" }} />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem
                            onClick={() => {
                              handleShippedOrder(item.id);
                              popupState.close();
                            }}
                          >
                            SHIPPED
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleConfirmOrder(item.id);
                              popupState.close();
                            }}
                          >
                            CONFIRM
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDeliveredOrder(item.id);
                              popupState.close();
                            }}
                          >
                            DELIVERED
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </StyledTableCell>
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
    </div>
  );
};

export default OrderTable;
