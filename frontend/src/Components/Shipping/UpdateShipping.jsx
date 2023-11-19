import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { getToken } from "../../Utilitys/helpers";
import axios from "axios";
import { countries } from "countries-list";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateShipping = () => {
  const countriesList = Object.values(countries);
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [postalCode, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const getShippings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/oneshipping/${id}`
      );
      setShipping(data.shipping);
      setLoading(false);
    } catch (error) {
      toast.error("Location cannot be found", {
        position: "top-right",
      });
    }
  };

  const updateLocation = async (id, shippingData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/shipping/${id}`,
        JSON.stringify(shippingData),
        config
      );
      setIsUpdated(data.success);
      setLoading(false);
      toast.success("Location Update Success", {
        position: "top-right",
      });
      navigate("/shippingShow", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("User not saved", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (shipping && shipping._id !== id) {
      getShippings();
    } else {
      setAddress(shipping.address);
      setCity(shipping.city);
      setPhone(shipping.phoneNo);
      setPostal(shipping.postalCode);
      setCountry(shipping.country);
    }
  }, [shipping, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingData = {
      address,
      city,
      phoneNo,
      postalCode,
      country,
    };

    updateLocation(id, shippingData);
  };

  return (
    <Fragment>
      <MetaData title={"Update Location"} />
      <div className="px-4 py-40 sm:px-6 lg:px-8 bg-white">
        <Fragment>
          <div className="mx-auto max-w-lg text-center border-2 p-10 border-black">
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <h1 className="text-2xl font-bold sm:text-3xl text-black">
                Update Location
              </h1>

              <div className="form-group">
                <label
                  htmlFor="address_field"
                  className="text-mg text-black pl-2 text-left flex"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="city_field"
                  className="text-mg text-black pl-2 text-left flex"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="phoneNo_field"
                  className="text-mg text-black pl-2 text-left flex"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNo_field"
                  className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                  value={phoneNo}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="postal_code_field"
                  className="text-mg text-black pl-2 text-left flex"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code_field"
                  className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                  value={postalCode}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="country_field"
                  className="text-mg text-black pl-2 text-left flex"
                >
                  Country
                </label>
                <select
                  id="country_field"
                  className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                id="shipping_btn"
                type="submit"
                className="rounded-lg bg-black px-5 py-3 mt-5 text-sm font-medium text-white hover:border-2 hover:border-black hover:bg-white hover:text-black item-left flex"
              >
                Update
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default UpdateShipping;
