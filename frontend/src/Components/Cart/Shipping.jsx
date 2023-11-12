import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../Utilitys/helpers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../Layout/MetaData";

function Shipping({ shippingIds }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  let navigate = useNavigate();

  const getLocation = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/v1/shipping`,
        config
      );

      if (data.shipping.length > 0) {
        setLocations(data.shipping);
      } else {
        setLocations([]);
        toast.error("You Have No Shipping Address");
        navigate("/shipping/create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  console.log(selectedLocationId);
  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedLocationId) {
      shippingIds(selectedLocationId);
      navigate("/confirm");
    } else {
      toast.error("Please select a shipping address");
    }
  };
  return (
    <Fragment>
      <MetaData title={"Shipping Location"} />
      <CheckoutSteps shipping />
      <div className="bg-white p-10 ">
        <h1 className="bg-white flex justify-center font-bold text-black text-lg">
          Shipping Location
        </h1>
        <form
          className="mx-auto text-center  p-8 max-w-xl"
          onSubmit={submitHandler}
        >
          <div>
            {locations.map((shippings) => (
              <div key={shippings._id} className="mb-4">
                <input
                  type="radio"
                  id={`shipping-${shippings._id}`}
                  name="shipping"
                  className="peer hidden [&:checked_+_label_svg]:block"
                  value={shippings._id}
                  onChange={() => setSelectedLocationId(shippings._id)}
                  checked={selectedLocationId === shippings._id}
                />
                <label
                  htmlFor={`shipping-${shippings._id}`}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-black peer-checked:ring-1 peer-checked:ring-black"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="hidden h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-black">{shippings.address}</p>
                    <p className="text-black">{shippings.city}</p>
                    <p className="text-black">{shippings.postalCode}</p>
                    <p className="text-black">{shippings.country}</p>
                  </div>

                  <p className="text-black">{shippings.phoneNo}</p>
                </label>
              </div>
            ))}
          </div>
          <button
            id="shipping_btn"
            type="submit"
            className="rounded-lg bg-black px-5 py-3 mt-5 text-sm font-medium text-white hover:border-2 hover:border-black hover:bg-white hover:text-black item-left flex"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Shipping;
