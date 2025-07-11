import { LogoDev } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { ChevronLeft, ChevronRight, Plus, Users, Package, Settings, LayoutDashboard } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MenuIcon from "@mui/icons-material/Menu";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    exact: true,
  },
  {
    name: "Gestion des Produits",
    icon: Package,
    submenu: [
      { name: "Ajouter un produit", path: "/admin/products/new" },
      { name: "Tous les produits", path: "/admin/products/tous-les-produit" },
      { name: "Ancien Formulaire", path: "/admin/products/ancien" },
    ],
  },
  {
    name: "Commandes",
    icon: ShoppingCartCheckoutIcon,
    submenu: [
      { name: "Ajouter un produit", path: "/admin/products/new" },
      { name: "Tous les produits", path: "/admin/products/tous-les-produit" },
    ],
  },
  {
    name: "Attribut & Type de produits",
    icon: LocalOfferOutlinedIcon,
    submenu: [
      {
        name: "Gestion des Types de produit",
        path: "/admin/products/tous-les-produit",
      },
      { name: "Gestion des attributs", path: "/admin/products/new" },
    ],
  },
  {
    name: "Categorie",
    icon: CategoryOutlinedIcon,
    path: "/admin/categories",
  },
  {
    name: "Utilisateurs",
    icon: Users,
    path: "/admin/users",
  },

  {
    name: "Paramètres",
    icon: Settings,
    path: "/admin/settings",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <aside
      className={`bg-background border-r transition-all duration-300 ${
        isOpen ? "w-45" : "w-20"
      }`}
    >
      <ScrollArea className="h-full p-2">
        <div className="flex flex-col h-full">
          <div className=" mb-4 flex justify-between items-center border-b-4 border-color-black">
            {isOpen && (
              <div className="flex justify-between items-center pl-4 space-x-1">
                <LogoDev className={`h-8 w-8 ${!isOpen && "mx-auto"}`} />
                <h1 className="text-lg font-bold text-blue-700">MOUKIT SHOP</h1>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            >
              {isOpen ? (
                <>
                  <MenuIcon className="h-7 w-7" />
                </>
              ) : (
                <MenuIcon className="h-7 w-7" />
              )}
            </Button>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 ${
                        !isOpen && "justify-center"
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <item.icon className="h-5 w-5" />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left">{item.name}</span>
                          {expandedMenu === item.name ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>

                    {expandedMenu === item.name && isOpen && (
                      <div className="ml-8 space-y-1 p-1 bg-slate-200 rounded">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                                isActive
                                  ? "bg-accent text-blue-500 text-accent-foreground"
                                  : "hover:bg-muted"
                              }`
                            }
                          >
                            {subItem.name === "Ajouter un produit" && (
                              <Plus className="h-4 w-4" />
                            )}

                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground text-blue-500"
                          : "hover:bg-muted"
                      } ${!isOpen && "justify-center"}`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {isOpen && <span>{item.name}</span>}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
