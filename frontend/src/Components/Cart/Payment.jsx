import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../Utilitys/helpers";
import { useFormik } from "formik";
import * as Yup from "yup";

const Payment = ({ cartProducts, ShippingCope }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const [shippingCopeId, setShippingCopeId] = useState(
    localStorage.getItem("ShippingCopeId") || ""
  );

  console.log(shippingCopeId);
  useEffect(() => {
    if (ShippingCope && ShippingCope.id) {
      localStorage.setItem("ShippingCopeId", ShippingCope.id);
      setShippingCopeId(ShippingCope.id);
    }
  }, [ShippingCope]);

  const order = {
    orderItems: cartProducts,
    ShippingCope: shippingCopeId,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const createOrder = async (order) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/order/new`,
        order,
        config
      );
      setLoading(false);
      toast.success("order created", {
        position: "top-right",
      });

      sessionStorage.removeItem("orderInfo");
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("ShippingCope");
      navigate("/");
      window.location.reload();
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred. Please try again.";
      toast.error(message, {
        position: "top-right",
      });
    }
  };

  const submitHandler = async () => {
    document.querySelector("#pay_btn").disabled = true;
    order.paymentInfo = {
      id: "ew_ds32sssew231444",
      status: "succeeded",
    };
    createOrder(order);
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required("Card Number is required"),
    cardExpiry: Yup.string().required("Card Expiry is required"),
    cardCVC: Yup.string().required("Card CVC is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitting Shipping with values:", values);
  
      try {
        order.paymentInfo = {
          id: values.cardNumber,
          status: values.cardExpiry,
          cvc: values.cardCVC,
        };
  
        submitHandler(values);
        
        toast.success("Review Success");
      } catch (error) {
        console.error("Error Shipping review:", error);
      }
    },
  });

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps payment />
      <div className="px-4 py-10 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-lg text-center p-10">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-bold sm:text-3xl text-black">
              Card Info
            </h1>
            <div className="form-group">
              <label
                htmlFor="card_num_field"
                className="text-mg text-black pl-2 text-left flex"
              >
                Card Number
              </label>
              <input
                type="text"
                id="card_num_field"
                name="cardNumber"
                className="form-control w-full rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                onChange={formik.handleChange}
                value={formik.values.cardNumber}
              />
              {formik.errors.cardNumber && formik.touched.cardNumber && (
                <div className="text-red-500 text-sm ml-3">
                  {formik.errors.cardNumber}
                </div>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="card_exp_field"
                className="text-mg text-black pl-2 text-left flex"
              >
                Card Expiry
              </label>
              <input
                type="text"
                id="card_exp_field"
                name="cardExpiry"
                className="form-control w-full rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                onChange={formik.handleChange}
                value={formik.values.cardExpiry}
              />
              {formik.errors.cardExpiry && formik.touched.cardExpiry && (
                <div className="text-red-500 text-sm ml-3">
                  {formik.errors.cardExpiry}
                </div>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="card_cvc_field"
                className="text-mg text-black pl-2 text-left flex"
              >
                Card CVC
              </label>
              <input
                type="text"
                id="card_cvc_field"
                name="cardCVC"
                className="form-control w-full rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                onChange={formik.handleChange}
                value={formik.values.cardCVC}
              />
              {formik.errors.cardCVC && formik.touched.cardCVC && (
                <div className="text-red-500 text-sm ml-3">
                  {formik.errors.cardCVC}
                </div>
              )}
            </div>
            <button
              id="pay_btn"
              type="submit"
              className="rounded-lg bg-black px-5 py-3 mt-5 text-sm font-medium text-white hover:border-2 hover:border-black hover:bg-white hover:text-black item-left flex"
            >
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
