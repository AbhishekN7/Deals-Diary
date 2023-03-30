import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAd, updateUserAd } from "../../toolkit/adSlice";
import parse from "html-react-parser";
export default function Account() {
  const dispatch = useDispatch();
  const { userAd } = useSelector((state) => state.ads);
  const [selectedAd, setSelectedAd] = useState({});
  const [isPublished, setisPublished] = useState();
  const [detailsCol, setDetailsCol] = useState(false);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all");
  useEffect(() => {
    dispatch(getUserAd());
  }, []);

  return (
    <>
      {JSON.stringify(isPublished)}
      {JSON.stringify(select)}
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h4 className="text-center">Your Ad's</h4>
              </div>
              <div class="card-body">
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="Search.. Ad"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    class="form-select mt-3"
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="publish">Publish</option>
                    <option value="unpublish">Unpublish</option>
                  </select>
                </div>
                {/* {(filteredArr = )} */}
                {userAd &&
                  userAd
                    .filter((item) =>
                      item.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter(
                      (item) =>
                        (select == "all" && item) ||
                        (select == "publish" && item.publish == true) ||
                        (item.publish == false && select == "unpublish")
                    )
                    .map((item) => {
                      return (
                        <>
                          <div className="d-flex justify-content-between">
                            <h5 className="list-group-item">{item.title}</h5>
                            <h5>{item.price}</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <img
                                src={`${process.env.REACT_APP_URL}/${item.img[0]}`}
                                alt=""
                                height="75"
                                width="75"
                              />
                            </div>

                            <div>
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={(e) => {
                                  setSelectedAd(item);
                                  setisPublished(item.publish);
                                  setDetailsCol(true);
                                }}
                              >
                                Details
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-warning btn-sm"
                                onClick={(e) => setSelectedAd(item)}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })}
              </div>
            </div>
          </div>
          {detailsCol && (
            <div className="col-sm-4">
              <div class="card">
                <div class="card-header">Ad Details</div>
                <div class="card-body">
                  <h1>{selectedAd.title}</h1>
                  <p>{selectedAd.desc && parse(selectedAd.desc)}</p>
                </div>
              </div>
            </div>
          )}
          {detailsCol && (
            <div className="col-sm-4">
              {selectedAd && (
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
                    className="btn btn-warning"
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
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
