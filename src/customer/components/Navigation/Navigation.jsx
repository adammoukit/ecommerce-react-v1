"use client";

import { Fragment, useEffect, useState } from "react";
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
import { Avatar, Box, Fade, Paper, Popper, Typography } from "@mui/material";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Actions";
import BackgroundLetterAvatars from "../Avatar/BackgroundLetterAvatars";
import logo from "../../../assets/MOUKIT_LOGO1.png";
import { getCart } from "../../../State/Cart/Action";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
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
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WHIndeP9HK4GT_otRtTYWVSNsluXQ-RJgA&s",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U1KLPqZ8RRe1-rQDKreWwAFt_t9YaDe48Q&s",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Real Madrid", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
            { name: "PSG", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Récupérer l'état de l'utilisateur connecté depuis le store
  const user = useSelector((state) => state.auth.user);

  const store_jwt = useSelector((state) => state.auth.jwt);

  const dispatch = useDispatch();
  const location = useLocation();

  const jwt = localStorage.getItem("jwt");

  const [anchorEl, setAnchorEl] = useState(null);
  const [zopen, setZOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const cartTotal = useSelector((state) => state.cart?.cart?.totalItem);
  const { cart } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItems, cart.deleteCartItems]);

  console.log("cart :", cart);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, store_jwt]);

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

  return (
    <div className="bg-white relative z-40">
      {zopen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-1000"
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
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
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
                              className="object-cover object-center"
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
        <p className="flex h-10  items-center justify-center bg-yellow-500 px-4 text-sm font-medium text-black sm:px-6 lg:px-8">
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
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800  data-[open]:text-indigo-600">
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
                                        className="object-cover object-center"
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

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div
                  onClick={handleClick("bottom-end")}
                  className="ml-4 cursor-pointer"
                >
                  {user ? (
                    <BackgroundLetterAvatars />
                  ) : (
                    <div>
                      <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <a
                          href="#"
                          className="text-sm font-medium mr-5 text-gray-700 hover:text-gray-800"
                        >
                          Sign in
                        </a>
                        <span
                          aria-hidden="true"
                          className="h-6 w-px bg-gray-200"
                        />
                        <a
                          href="#"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Devise */}
                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">XOF</span>
                    <span className="sr-only">, change currency</span>
                  </a>
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
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartTotal}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
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
