import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllAds } from "../toolkit/adSlice";

export default function Geo() {
  const [geoCity, setgeoCity] = useState();
  const [geopostCode, setGeopostcode] = useState();
  const dispatch = useDispatch();
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  };

  const getData = async () => {
    try {
      const mapData = await getGeoLocation();
      console.log(mapData);
      const lat = mapData.coords.latitude;
      const long = mapData.coords.longitude;
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=1672fee6fded46a480e7e4a78186f434`
      );
      console.log(data.results[0].components.city);
      setgeoCity(data?.results[0].components.city);
      setGeopostcode(data?.results[0].components.postcode);
      dispatch(getAllAds({ geoCity, geopostCode }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/* <h1>Latitude : {response && response.latitude}</h1>;
      <h1>Longitude : {response && response.longitude}</h1>; */}
    </>
  );
}
