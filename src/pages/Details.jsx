import React from "react";
import { useSelector } from "react-redux";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSingleAd } from "../toolkit/adSlice";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  // const [x] = useSearchParams();
  // console.log(x.get("redirect"));
  // console.log([...x]);
  const { ad, singleAd } = useSelector((state) => state.ads);
  const { login } = useSelector((state) => state.auth);
  // console.log(id);

  // const handleRedirect = () => {
  //   if (login.name) {
  //     navigate("/checkout");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  useEffect(() => {
    dispatch(getSingleAd(id));
  }, []);
  return (
    <>
      {singleAd && <h1>{singleAd.title}</h1>}
      <Link to={"/checkout"} type="button" className="btn btn-primary">
        Proceed To Checkout
      </Link>
    </>
  );
}
