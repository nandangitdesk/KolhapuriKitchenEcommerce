import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../actions/cartAction";
import MetaData from "./layouts/MetaData";
import { Country, State } from "country-state-city";
import Loader from "./layouts/Loader";
import Navbar from "./layouts/Navbar";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingInfo, loading } = useSelector(
    (state) => state.cart
  );
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  useEffect(() => {
    if (loading) {
      return <Loader />;
    }
  }, [loading]);

  const handleShippingInfo = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10|| phoneNo.length > 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const shippingData = {
      country,
      state,
      city,
      address,
      pinCode,
      phoneNo,
    };
    dispatch(saveShippingInfo(shippingData));
    navigate('/order/confirm');
  };

  return (
    <>
      <div className="shippingContainer md:mx-20 lg:mx-40 xl:mx-60 mt-20 p-8">
        <MetaData title="shipping details" />
        <Navbar/>
        <CheckoutSteps activeStep={0} />
        <div className="shippingBox md:p-10 lg:p-20 xl:p-30 mt-10">
            <h2 className="shippingHeading text-3xl font-bold mb-5">Shipping Details</h2>
            <form onSubmit={handleShippingInfo} className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
              <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 md:mr-5 lg:mr-10 xl:mr-20">
                <label htmlFor="country" className="text-lg font-medium mb-2">Country:</label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="state" className="text-lg font-medium mb-2">State:</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(country).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-1/2 lg:w-1/2 xl:w-1/2">
                <label htmlFor="city" className="text-lg font-medium mb-2">City:</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                />
                <label htmlFor="address" className="text-lg font-medium mb-2">Address:</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                />
                <label htmlFor="pinCode" className="text-lg font-medium mb-2">Pin Code:</label>
                <input
                  id="pinCode"
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                />
                <label htmlFor="phoneNo" className="text-lg font-medium mb-2">Phone No:</label>
                <input
                  id="phoneNo"
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="w-full p-2 mb-5 border border-gray-400 rounded-lg"
                  required
                />
              </div>
            </form>
            <button
              type="submit"
              onClick={handleShippingInfo}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
        </div>
      </div>
    </>
  );
};

export default Shipping;
