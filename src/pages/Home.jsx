import React from "react";
import AdCard from "../components/AdCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllAds } from "../toolkit/adSlice";
// import { getAllAds } from "../../redux/actions/adActions";

export default function Home() {
  const dispatch = useDispatch();
  const { ad } = useSelector((state) => state.ads);
  const { userAd } = useSelector((state) => state.ads);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    if (login && login.name) {
      dispatch(getAllAds());
    }
  }, []);
  return (
    <>
      {JSON.stringify(ad)}
      <div className="container">
        <div className="row">
          {login && !login.admin ? (
            ad
              .filter((item) => item.ownerId != login.id)
              .map((ad) => (
                <div key={ad.title} className="col-sm-6">
                  <h1>
                    <AdCard ad={ad} />
                  </h1>
                </div>
              ))
          ) : login && login.admin ? (
            <h4>Admin cannot access this page</h4>
          ) : (
            !login && <h4>Login To See The Ads</h4>
          )}
        </div>
      </div>
    </>
  );
}
