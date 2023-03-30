import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import adSlice from "./adSlice";
import authSlice from "./authSlice";
// import adSlice from "./adSlice";



const toolkitStore = configureStore({
    reducer: {
        ads: adSlice,
        auth: authSlice
    },
})

export default toolkitStore;