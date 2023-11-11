import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { getToken } from "../../Utilitys/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ShippingShow() {
  const [shipping, setShipping] = useState([]);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  let navigate = useNavigate();
  const getShipping = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await axios.get(
        `http://localhost:4000/api/v1/shipping`,
        config
      );
      if (response) {
        console.log(response.data);
        setShipping(response.data.shipping);
      } else {
        console.error("No response from server");
      }
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    getShipping();

    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }

    if (deleteError) {
      toast.error(deleteError, {
        position: 'top-center',
      });
    }

    if (isDeleted) {
      toast.success("Product deleted successfully", {
        position: 'top-center',
      });
      navigate("/shippingShow");

      setIsDeleted(false);
      setDeleteError("");
    }
  }, [error, deleteError, isDeleted]);

  const deleteProduct = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/v1/shipping/${id}`,
        config
      );

      if (response) {
        setIsDeleted(response.data.success);
        navigate("/shippingShow", { replace: true });
      } else {
        console.error("No response from server");
      }
      setLoading(false);
    } catch (error) {
      setDeleteError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const Shippinglist = () => {
    const data = {
      columns: [
        {
          label: "Address",
          field: "address",
          sort: "asc",
        
        },
        {
          label: "City",
          field: "city",
          sort: "asc",
      
        },
        {
          label: "PhoneNo",
          field: "phoneNo",
          sort: "asc",
        },
        {
          label: "PostalCode",
          field: "postalCode",
          sort: "asc",
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    shipping.forEach((shippings) => {
      data.rows.push({
        address: shippings.address,
        city: shippings.city,
        phoneNo: shippings.phoneNo,
        postalCode: shippings.postalCode,
        country: shippings.country,
        actions: (
          <Fragment>
            <Link
              to={`/shipping/${shippings._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/></svg>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(shippings._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <Fragment>
      <MetaData title={"Your Shipping Location"} />
<div className="flex flex-col items-center bg-white">
  <h1 className="my-14 font-bold text-lg text-black">Your Shipping Location</h1>
  <div className="flex justify-end">
  <button className="inline-block rounded-lg bg-black ml-[1100px] px-5 py-3 mb-5 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2" >
  <Link to="/shipping/create" >Add Location </Link></button>
</div>
  <div className="flex w-full justify-center container pb-10">
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
<MDBDataTable
    data={Shippinglist()}
    className="table border-2 border-black shadow-lg py-10 text-black"
    bordered
    striped
    hover
    entriesOptions={[10, 20, 30]} 
    entries={10} 
    noBottomColumns
    

/>
      )}
    </Fragment>
  </div>
</div>
    </Fragment>
  );
}

export default ShippingShow;
