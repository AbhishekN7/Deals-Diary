import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  return (
    <>
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
      <div class="card">
        <div class="card-body d-flex m-3">
          <img
            src={`${process.env.REACT_APP_URL}/${ad.img[0]}`}
            alt="ad-image"
            className="img-fluid card-img-top h-25 w-25"
          />
          <div className="px-3">
            <h3>Ad Title: {ad.title}</h3>
            <h3>City: {ad.city}</h3>
            <p>Details: {parse(ad.desc)}</p>
          </div>
        </div>
        <button className="btn btn-warning ">
          <Link className="text-decoration-none" to={`/details/${ad._id}`}>
            Show Details
          </Link>
        </button>
      </div>
    </>
  );
}
