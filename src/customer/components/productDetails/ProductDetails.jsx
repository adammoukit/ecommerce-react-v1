"use client";

import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid2, Rating } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ProductReviewsCard from "./ProductReviewsCard";
import { mens_kurta } from "../../../Data/mens/men_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJkQRZ1z9PG77d5PxL1vS6J5scywL1xxC3Qg&s",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9i1EF0GnvD52UIciJlvW5bDOARyrGFmB9qQ&s",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qFXtDueJs07PIpMHpLo3fRm8UQHsAzvSaw&s",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1M00jVqbnasjvHXdcES3L8n1vEOah9u82OA&s",
      alt: "Model wearing plain white basic tee.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCHXKhcn_5jxHPIWIXh3Yl-USec9r2EDQ3Q&s",
      alt: "Model wearing plain gray basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    dispatch(addItemToCart(data));
    console.log("data :", data);
    navigate("/cart");
  };
  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductById(data));
  }, [params.productId]);

  return (
    <div className="bg-white container  mx-auto">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center gap-y-2">
            <div className="overflow-hidden rounded-lg max-w-[300rem] max-h-[35rem]">
              <img
                alt={products.product?.imageUrl}
                src={products.product?.imageUrl}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex items-center  p-3 flex-wrap space-x-5   justify-start">
              {product.images.map((item) => {
                return (
                  <div className=" overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem]">
                    <img
                      alt={item.alt}
                      src={products.product?.imageUrl}
                      className="h-full cursor-pointer w-full object-cover object-top"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {products.product?.brand}
              </h1>
              <p className="text-lg opacity-65">{products.product?.title}</p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-7 text-xs  mt-6 text-gray-900">
                <p className="font-bold ">
                  {products.product?.discountedPrice} CFA
                </p>
                <p className="opacity-50 line-through">
                  {products.product?.price} CFA
                </p>
                <p className="text-green-900 font-semibold">
                  {products.product?.discountPercent}% off
                </p>
              </div>
              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={4} readOnly />
                  <p className="opacity-50 text-sm">56640 notation</p>
                  <p className="text-sm font-semibold text-indigo-300 hover:text-indigo-400 ml-3">
                    3870 Commentaires
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Couleurs
                  </h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    {/* <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup> */}
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border  text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 py-3 px-3 sm:py-4 sm:px-4"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    className="mt-4"
                  >
                    Ajouter
                  </Button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        {/* Commentaires et notations */}
        <section>
          <h1 className="text-lg font-semibold pb-4">
            Dèrnières commentaires et notations
          </h1>
          <div className="border p-5 mb-3">
            <Grid2 container spacing={7} justifyContent="space-between">
              {/* Première colonne contenant les avis sur le produit */}
              <Grid2 item xs={7}>
                <div className="border-spacing-y-4">
                  <ProductReviewsCard />
                </div>
              </Grid2>

              {/* Deuxième colonne contenant la notation et les évaluations du produit */}
              <Grid2 item xs={5}>
                <h1 className="text-lg font-semibold pb-1">Product rating</h1>
                <div className="flex items-center space-x-4">
                  <Rating value={3.5} readOnly precision={0.5} />
                  <p className="opacity-60">56460 ratings</p>
                </div>
                {/* <Box>
                    <Grid2 container  alignContent="center" gap={2}>
                        <Grid2 item xs={2}>
                            <p>Exelente</p>
                        </Grid2>
                        <Grid2 item xs={7}>
                            <LinearProgress variant="determinate" color="success" value={40} />
                        </Grid2>
                    </Grid2>
                </Box> */}
              </Grid2>
            </Grid2>
          </div>
        </section>

        {/* Produits similaires */}
        <section className="pt-4 px-2 flex flex-col justify-center">
          <h1 className="text-lg font-semibold">Les Produits Similaires</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center">
            {mens_kurta.map((item) => (
              <HomeSectionCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
