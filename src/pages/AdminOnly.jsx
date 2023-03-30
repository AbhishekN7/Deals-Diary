import React from "react";
import { useSelector } from "react-redux";

export default function AdminOnly({ element }) {
  const { login } = useSelector((state) => state.auth);
  return login && login.admin ? element : "Only Admin Has Dashboard Access!";
}
