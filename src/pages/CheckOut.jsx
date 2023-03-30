import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAdOrder } from "../toolkit/adSlice";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [adData, setAdData] = useState();
  const { singleAd } = useSelector((state) => state.ads);
  const { login } = useSelector((state) => state.auth);
  const handleOrder = () => {
    dispatch(handleAdOrder());
  };
  return (
    <>
      <h1>{singleAd.title}</h1>
      <h1>{singleAd.price}</h1>
      <button className="btn btn-info" onClick={handleOrder}>
        Use Cod
      </button>
    </>
  );
}
