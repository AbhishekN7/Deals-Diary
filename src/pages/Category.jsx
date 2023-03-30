import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [category, setCategory] = useState([]);

  const getAllCategories = async () => {
    const {
      data: { result },
    } = await axios.get(`${process.env.REACT_APP_URL}/api/category/`);
    console.log(result);
    setCategory(result);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      {JSON.stringify(category)}
      {category.map((item, index) => (
        <div className="d-flex">
          <h3>{index + 1} :</h3>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
}
