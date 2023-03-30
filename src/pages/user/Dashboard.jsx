import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  adminGetAllAds,
  admingetUserAd,
  getUserAd,
  updateUserAd,
} from "../../toolkit/adSlice";
import { admingetAllusers } from "../../toolkit/authSlice";
export default function Dashboard() {
  const { users } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  const [isPublished, setisPublished] = useState();
  const { userAd } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admingetAllusers());
  }, []);

  const checkAdsFunc = (arg) => {
    dispatch(admingetUserAd(arg));
    setShow(!show);
    setSelectedAd(null);
  };

  return (
    <>
      {JSON.stringify(users)}
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            {users &&
              users.map(
                (item) =>
                  !item.admin && (
                    <div class="card my-3">
                      <div class="card-header">
                        <h1>{item.name}</h1>
                      </div>
                      <div class="card-body">
                        <p>{item.email}</p>
                        <button
                          className="btn btn-warning"
                          onClick={(e) => checkAdsFunc(item._id)}
                        >
                          Check Ads
                        </button>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className="col-sm-4">
            <h1>User Ads:</h1>
            {show && userAd
              ? userAd.map((item) => {
                  return (
                    <>
                      <div class="card my-3">
                        <div class="card-header">
                          <h1>{item.title}</h1>
                        </div>
                        <div class="card-body">
                          {item.img && (
                            <img
                              src={`${process.env.REACT_APP_URL}/${item.img}`}
                              alt="ad-image"
                              className="img-fluid card-img-top h-50 w-50"
                            />
                          )}
                          <p>{item.price}</p>
                          <button
                            className="btn btn-info"
                            onClick={(e) => {
                              setSelectedAd(item);
                              setisPublished(item.publish);
                            }}
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
              : "No Ads Found Of the User"}
          </div>
          <div className="col-sm-4">
            {show && selectedAd && (
              <div class="card my-3">
                <div class="card-header">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="id"
                      value={selectedAd.publish}
                      defaultChecked={selectedAd.publish}
                      onClick={(e) => setisPublished(e.target.checked)}
                    />
                    <label class="form-check-label" for="id">
                      Publish
                    </label>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={(e) =>
                        dispatch(
                          updateUserAd({
                            id: selectedAd._id,
                            publish: isPublished,
                          })
                        )
                      }
                    >
                      {isPublished ? "Publish Ad" : "Unpublish Ad"}
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <h1>{selectedAd.title}</h1>
                  {selectedAd.img && (
                    <img
                      src={`${process.env.REACT_APP_URL}/${selectedAd.img}`}
                      alt="ad-image"
                      className="img-fluid card-img-top h-50 w-50"
                    />
                  )}
                  <p>{selectedAd.desc && parse(selectedAd.desc)}</p>
                  <p>{selectedAd.price}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
