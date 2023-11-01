import React, { Fragment, useEffect, useState } from "react";
import Loader from "./Layout/Loader";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import MetaData from "./Layout/MetaData";
import ReactPaginate from "react-paginate";
import Product from "./Product/Product";

const categories = [
  "Battery",
  "Car Suspension",
  "Turbo",
  "Brake",
  "Chassis",
  "Air Filter",
  "Axle",
  "Shock Absorber",
  "Hood",
  "Alternator",
  "Clutch",
  "Compressor",
  "Air suspension",
  "Brake Caliper",
  "Suspension",
  "Nitrous",
  "Exhaust",
  "Interior Seats",
  "Steering Wheel",
  "Car Rims",
  "Fluids",
];

const Home = () => {
  let { keyword } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [productsCount, setProductsCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [category, setCategory] = useState("");
  const [sliderValue, setSliderValue] = useState([1, 10000]); // Initial slider value

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const getProducts = async (page = 1, keyword = "", price, category = "") => {
    let link = "";

    link = `http://localhost:4000/api/v1/products/?page=${page}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

    if (category) {
      link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
    }

    console.log(link);
    let res = await axios.get(link);
    console.log(res);
    setProducts(res.data.products);
    setResPerPage(res.data.resPerPage);
    setProductsCount(res.data.productsCount);
    setFilteredProductsCount(res.data.filteredProductsCount);
    setLoading(false);
  };

  useEffect(() => {
    getProducts(currentPage, keyword, sliderValue, category); // Use sliderValue here
  }, [currentPage, keyword, sliderValue, category]); // Add sliderValue as a dependency

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value); // Update the slider value
  };

  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Best Auto Parts Product Online"} />
          <div>
            <h1 id="products_heading" className="text-3xl text-center text-black font-bold pt-5">
              Current Products
            </h1>
            <section id="products" className="pt-5 flex items-center justify-center ">
              <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                {keyword ? (
                  <Fragment>
                   <div className="px-9 py-7 ">
                    <p className="px-3 py-4 text-black font-bold">Price Range</p>
                    <div className="col-start-1 col-span-1 flex  ">
        
                      <div className="px-5 pb-[300px]">
                        <Range
                          marks={{
                            1: `$1`,
                            5000: '$5000',
                            10000: `$10000`,
                          }}
                          min={1}
                          max={10000}
                          value={sliderValue} // Use the sliderValue state here
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          onChange={handleSliderChange} // Update the slider state
                        />
                        
                        <hr className="my-5" />
                        
                        <div className="mt-5 px-9 py-5  ">
                          <h4 className="mb-3 text-black text bold text-lg font-bold ">Categories</h4>
                          <ul className="pl-0 text-black ">
                            {categories.map((category) => (
                              <li className="list-none hover:underline"
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="col-start-2 col-span-6 justify-center flex">
                      {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {products.map((product) => (
                            <Product key={product._id} product={product} col={4} />
                          ))}
                          
                        </div>
                      ) : (
                        <div className="col-start-2 px-[436.5px] col-span-3 justify-center flex">
                          <h1 className="text-center text-black font-bold text-2xl ">Product not found.</h1>
                        </div>
                      )}
                    </div>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>

            {resPerPage <= count && (
              <div className="flex justify-center items-center mt-8">
                <ReactPaginate
                  previousLabel={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  nextLabel={
                    <svg
                      xmlns="http://w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(productsCount / resPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={"flex space-x-2 mb-5"}
                  pageClassName={"mx-1"}
                  pageLinkClassName={"px-3 py-2 border border-gray-100 text-center leading-8 hover:bg-black hover-text-white"}
                  activeClassName={"bg-black text-white"}
                  previousClassName={"mx-1"}
                  nextClassName={"mx-1"}
                  previousLinkClassName={"inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 hover:bg-black hover-text-white"}
                  nextLinkClassName={"inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 hover-bg-black hover-text-white"}
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
