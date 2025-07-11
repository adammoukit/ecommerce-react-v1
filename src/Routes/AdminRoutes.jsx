import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "@/Admin/AdminLayout";
import Dashboard from "@/Admin/Pages/Dashboard";
import Users from "@/Admin/Pages/Users";
import Products from "@/Admin/Pages/Products";
import Setting from "@/Admin/Pages/Setting";
import CreateProductStarter from "@/Admin/Pages/CreateProductPage/CreateProductStarter";
import ProductCreateForm from "@/Admin/Components/Form/ProductCreateForm";
import NewProductForm from "@/Admin/Pages/CreateProductPage/NewProductForm";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Setting />} />
          <Route path="products/tous-les-produit" element={<Products />} />
          <Route path="products/new" element={<CreateProductStarter />} />
          <Route path="products/ancien" element={<ProductCreateForm />} />
          <Route
            path="products/new/nouveau-produit"
            element={<NewProductForm />}
          />

          {/* <Route path="products/:id" element={<ProductDetail />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
