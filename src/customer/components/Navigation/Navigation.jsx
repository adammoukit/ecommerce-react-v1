"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Fade,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Actions";
import BackgroundLetterAvatars from "../Avatar/BackgroundLetterAvatars";
import logo from "../../../assets/MOUKIT_LOGO1.png";
import { getCart } from "../../../State/Cart/Action";
import "./Navigation.css";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getUserOrderCount } from "../../../State/Order/Action";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import SearchIcon from '@mui/icons-material/Search';

const navigation = {
  categories: [
    {
      id: "women",
      name: "Femme",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://www.bioderma.fr/sites/fr/files/styles/mobile_media_text/public/2023-11/15_0.jpg.webp?itok=_w25sS7Q",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://www.bioderma.fr/sites/fr/files/styles/mobile_media_text/public/2023-11/7_1.jpg.webp?itok=NnYDyZxq",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [{ name: "Tops", href: "#" }],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [{ name: "Watches", href: "#" }],
        },
        {
          id: "brands",
          name: "Brands",
          items: [{ name: "Full Nelson", href: "#" }],
        },
      ],
    },
    {
      id: "men",
      name: "Homme",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://assets.goal.com/images/v3/blt742b715dc380da3b/France_home_kit_.jpg?auto=webp&format=pjpg&width=3840&quality=60",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc: "https://www.dailymotion.com/thumbnail/video/x8zoh5w",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Real Madrid", href: "#" },

            { name: "PSG", href: "#" },
            { name: "man_city", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [{ name: "Watches", href: "#" }],
        },
        {
          id: "brands",
          name: "Brands",
          items: [{ name: "Re-Arranged", href: "#" }],
        },
      ],
    },
  ],
  pages: [{ name: "Boutique" }, { name: "A propos" }],
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const searchCategoryList = [
  { id: 1, name: "Electronique" },
  { id: 2, name: "Sport" },
  { id: 3, name: "Auto & MOto" },
  { id: 4, name: "Meuble" },
  { id: 5, name: "Cuisine" },
  { id: 6, name: "Sante" },
  { id: 7, name: "Mode" },
  { id: 1, name: "Electronique" },
  { id: 2, name: "Sport" },
  { id: 3, name: "Auto & MOto" },
  { id: 4, name: "Meuble" },
  { id: 5, name: "Cuisine" },
  { id: 6, name: "Sante" },
  { id: 7, name: "Mode" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Récupérer l'état de l'utilisateur connecté depuis le store
  const user = useSelector((state) => state.auth.user);
  const { order } = useSelector((store) => store);

  const store_jwt = useSelector((state) => state.auth.loginResponse);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchCategory = (name) => {
    setSearchInput(name);
    setVisible(false);
  };

  const dispatch = useDispatch();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [zopen, setZOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  // Récupérez le total des articles depuis l'état du store Redux
  const cartTotal = useSelector((state) => state.cart.totalItem);
  const { cart } = useSelector((store) => store);

  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Fonction pour détecter les clics en dehors
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisible(false); // Fermer la liste
    }
  };

  useEffect(() => {
    // Ajouter l'écouteur lors du montage
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Supprimer l'écouteur lors du démontage
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Récupérer les informations utilisateur dès que le JWT est disponible
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getCart());
      dispatch(getUser(jwt));
      console.log("jwt :", jwt);
      console.log("store_jwt :", store_jwt);
    }
  }, [store_jwt]);

  // Récupérer le panier et les commandes une fois l'utilisateur chargé
  useEffect(() => {
    if (user) {
      dispatch(getCart());
      dispatch(getUserOrderCount());
    }
  }, [user, dispatch, store_jwt]);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  useEffect(() => {
    dispatch(getUserOrderCount());
  }, [store_jwt, order.orders, order.orderCount]);

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setZOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  useEffect(() => {
    if (user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [user]);

  const handleCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.name}`);
  };
  const handlePageClick = () => {
    navigate(`/store`);
  };

  return (
    <div className="bg-blue-950 relative z-40 Navigation-typography">
      {zopen && (
        <div
          className="fixed cursor-pointer inset-0 bg-black bg-opacity-50 z-1000"
          onClick={() => setZOpen(false)}
        />
      )}
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-black data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center h-40"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              {/* <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a> */}
                              <button
                                onClick={() =>
                                  handleCategoryClick(category, section, item)
                                }
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            {/* profile */}
            <Box>
              <Popper
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                sx={{ zIndex: 1200 }}
                open={zopen}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <div className="p-2">
                        {/* Vérifiez si l'utilisateur est connecté */}
                        {user ? (
                          <>
                            <div className="flex flex-col justify-center mb-2">
                              <div className="p-2 bg-blue-300 text-white">
                                <div className="flex items-center justify-center ">
                                  <p>{user.firstName} - </p>
                                  <p> {user.lastName}</p>
                                </div>
                                <div>
                                  <p className="text-xs">{user.email}</p>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <p
                              className="text-lg font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                              onClick={() => {
                                navigate("/account/profile");
                                setZOpen(false);
                              }}
                            >
                              Profile
                            </p>
                            <p
                              className="text-lg font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                              onClick={() => {
                                navigate("/account/order");
                                setZOpen(false);
                              }}
                            >
                              My Orders
                            </p>
                            <p
                              className="text-lg font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                              onClick={handleLogout}
                            >
                              Logout
                            </p>
                          </>
                        ) : (
                          <>
                            <p
                              className="text-lg font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                              onClick={handleOpen}
                            >
                              Login
                            </p>
                          </>
                        )}
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Box>

            {/* <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>

      {/* large screen navBar */}

      <header className="relative  bg-white">
        <p className="flex h-10  items-center justify-center bg-blue-400 px-4 text-sm font-bol text-black sm:px-6 lg:px-8">
          Site développé par MOUKIT ADAM
        </p>

        <nav
          aria-label="Top"
          className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="Logo du site" src={logo} className="h-14 w-auto" />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative font-bold text-black flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-[15px] font-bold text-black transition-colors duration-200 ease-out hover:text-gray-800  data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover object-center h-52"
                                      />
                                    </div>
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <p
                                            className="cursor-pointer hover:text-gray-800"
                                            onClick={() =>
                                              handleCategoryClick(
                                                category,
                                                section,
                                                item
                                              )
                                            }
                                          >
                                            {item.name}
                                          </p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {/* les sections de navigations ici */}
                  {navigation.pages.map((page) => (
                    <span
                      key={page.name}
                      className="flex items-center text-[15px] cursor-pointer font-medium text-black hover:text-gray-800"
                      onClick={handlePageClick}
                    >
                      {page.name}
                    </span>
                  ))}
                </div>
              </PopoverGroup>

              {/* La barre recherche Searching Bar */}
              <div className="flex items-center flex-grow relative h-[60%] mx-5 rounded-md ">
                {/* 1ère section dans le conteneur de la barre de recherche */}
                <div
                  onClick={() => setVisible(!visible)}
                  className="flex rounded-tl-md rounded-bl-md items-center font-bold text-lg justify-center cursor-pointer text-black px-2 bg-slate-200 h-full"
                >
                  <p>All </p>
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                </div>

                {/* Liste des catégories, juste en dessous */}
                {visible && (
                  <ul
                    ref={dropdownRef}
                    className="absolute bg-slate-300  left-0 z-50 p-2 w-56 h-80 overflow-y-scroll flex flex-col top-10 shadow-lg rounded-md"
                  >
                    {searchCategoryList.map((item) => (
                      <li
                        key={item.id}
                        className="py-1 px-2 hover:bg-slate-400 rounded-md cursor-pointer"
                        onClick={() => handleSearchCategory(item.name)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 2ème section dans le conteneur de la barre de recherche */}
                <input
                  type="text"
                  placeholder="Rechercher votre produit ici"
                  className="px-2 h-full flex-grow outline-none bg-slate-200 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                {/* 3ème section dans le conteneur de la barre de recherche */}
                <div className="flex items-center justify-center px-2 h-full bg-yellow-600 hover:bg-yellow-400 rounded-tr-md rounded-br-md">
                  <SearchIcon sx={{color:"black", fontSize:"2rem"}}/>
                </div>
              </div>

              {/* Login Avatar and shopping cart Icon */}
              <div className="ml-auto flex items-center ">
                <div
                  onClick={handleClick("bottom-end")}
                  className="ml-4 cursor-pointer relative"
                >
                  {order?.orderCount > 0 && (
                    <span className="absolute rounded-full bg-red-700 px-1 py-1 top-0 border-2 z-50 right-0"></span>
                  )}
                  {user ? (
                    <BackgroundLetterAvatars />
                  ) : (
                    <div>
                      <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <span
                          className=" font-bold mr-5 text-black hover:text-gray-800 underline"
                          style={{ fontSize: "18px" }}
                        >
                          Sign in
                        </span>
                        {/* <span
                          aria-hidden="true"
                          className="h-6 w-px bg-gray-200"
                        />
                        <a
                          href="#"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </a> */}
                      </div>
                    </div>
                  )}
                </div>

                {/* profile */}
                <Box>
                  <Popper
                    // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                    sx={{ zIndex: 1200 }}
                    open={zopen}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <div className="p-2">
                            {/* Vérifiez si l'utilisateur est connecté */}
                            {user ? (
                              <>
                                <div className="flex flex-col justify-center Navigation-typography mb-2">
                                  <div className="p-2 bg-gray-300 text-white">
                                    {user.roles.some(
                                      (role) => role.name === "ROLE_ADMIN"
                                    ) && (
                                      <div>
                                        <p className="text-lg font-bold text-orange-400">
                                          ADMIN
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex items-center justify-center ">
                                      <p>{user.firstName} - </p>
                                      <p> {user.lastName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-green-600 font-bold">
                                        {user.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className="Navigation-typography flex flex-col justify-center  text-black">
                                  <div>
                                    <p
                                      className="text-sm font-semibold flex items-center justify-start opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                                      onClick={() => {
                                        navigate("/account/profile");
                                        setZOpen(false);
                                      }}
                                    >
                                      <PersonIcon />
                                      <span className="ml-2">Mon Profile</span>
                                    </p>
                                    <p
                                      className="text-sm relative flex items-center justify-start font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                                      onClick={() => {
                                        navigate("/account/order");
                                        setZOpen(false);
                                      }}
                                    >
                                      <ShoppingCartIcon />
                                      <span className="ml-2">
                                        Mes Commandes
                                      </span>
                                      <span className="px-1 text-sm rounded-full bg-red-800 text-white absolute border-2 border-white -top-2 right-0">
                                        {order?.orderCount}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="mt-20 flex flex-col gap-2">
                                    <Divider className="bg-black text-lg" />

                                    <p
                                      className="text-sm flex items-center justify-start font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                                      onClick={handleLogout}
                                    >
                                      <LogoutIcon sx={{ color: "red" }} />
                                      <span className="ml-2">Déconnexion</span>
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <p
                                  className="text-lg font-semibold opacity-80 cursor-pointer hover:bg-gray-300 px-5 py-1"
                                  onClick={handleOpen}
                                >
                                  Login
                                </p>
                              </>
                            )}
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>

                {/* Search
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <div
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2 cursor-pointer"
                  >
                    <Tooltip title="Voir le panier" arrow>
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartTotal} color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
