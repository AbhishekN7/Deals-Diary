import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const createAd = createAsyncThunk("ad/create", async (adData, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.login.token
        const config = {
            headers: {
                authorization: token
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/ad`, adData, config)
        return data.result
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})

export const getAllAds = createAsyncThunk("ad/get", async (arg, { rejectWithValue }) => {
    try {
        console.log(arg);
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/ad`)
        return data.result
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})

export const adminGetAllAds = createAsyncThunk("admin/ad/get", async (e, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/user/admin/ad`)
        return data.result
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})



export const getSingleAd = createAsyncThunk("ad/get-single", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/ad/${id}`)
        return data.result
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})

export const getUserAd = createAsyncThunk("ad/get-user", async (e, { getState, rejectWithValue }) => {
    try {
        const id = getState().auth.login.id
        console.log(id);
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/ad/user/${id}`)
        return data.result;
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})

export const admingetUserAd = createAsyncThunk("admin/get-user-ad", async (id, { getState, rejectWithValue }) => {
    try {
        console.log(id);
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/user/admin/ad/${id}`)
        return data.result;
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})


export const updateUserAd = createAsyncThunk("ad/update-ad", async (arg, { getState, rejectWithValue }) => {
    try {
        console.log(arg);
        const config = {
            headers: {
                authorization: getState().auth.login.token
            }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/ad/user/${arg.id}`, { publish: arg.publish }, config)
        return data.result;
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})

export const handleAdOrder = createAsyncThunk("ad/order-ad", async (e, { getState, rejectWithValue }) => {
    try {
        const loginId = getState().auth.login.id
        const adId = getState().ads.singleAd._id
        console.log(loginId, adId);
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/user/order/`, { userId: loginId, adId: adId })
        return data.result;
    } catch (error) {
        return rejectWithValue("error" + error)
    }
})



const adSlice = createSlice({
    name: "Ad",
    initialState: { ad: [], userAd: [], allAds: [] },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createAd.pending, (state, { payload }) => {
            state.createLoading = true
        })
            .addCase(createAd.fulfilled, (state, { payload }) => {
                state.createLoading = false
                state.adAdded = true

            })
            .addCase(createAd.rejected, (state, { payload }) => {
                state.createLoading = false
                state.createError = payload
            })
            .addCase(getAllAds.pending, (state, { payload }) => {
                state.getLoading = true
            })
            .addCase(getAllAds.fulfilled, (state, { payload }) => {
                state.getLoading = false
                state.ad = payload
            })
            .addCase(getAllAds.rejected, (state, { payload }) => {
                state.getLoading = false
                state.getAdError = payload
            }).addCase(getSingleAd.pending, (state, { payload }) => {
                state.getSingleLoading = true
            }).addCase(getSingleAd.fulfilled, (state, { payload }) => {
                state.getSingleLoading = false
                state.singleAd = payload

            }).addCase(getSingleAd.rejected, (state, { payload }) => {
                state.getSingleLoading = false
                state.getSingleError = payload
            }).addCase(getUserAd.pending, (state, { payload }) => {
                state.getUserAdLoading = true
            }).addCase(getUserAd.fulfilled, (state, { payload }) => {
                state.getUserAdLoading = false
                state.userAd = payload
            }).addCase(getUserAd.rejected, (state, { payload }) => {
                state.getUserAdLoading = false
                state.userAdError = payload
            }).addCase(updateUserAd.pending, (state, { payload }) => {
                state.updateUserAdloading = true
            }).addCase(updateUserAd.rejected, (state, { payload }) => {
                state.updateUserAdloading = false
                state.updateUserAdError = payload
            }).addCase(updateUserAd.fulfilled, (state, { payload }) => {
                state.updateUserAdloading = false
                state.updateUserAdSuccess = true
            }).addCase(adminGetAllAds.pending, (state, { payload }) => {
                state.adminGetAllAdsloading = true
            }).addCase(adminGetAllAds.fulfilled, (state, { payload }) => {
                state.allAds = payload
                state.adminGetAllAdsloading = false
            }).addCase(adminGetAllAds.rejected, (state, { payload }) => {
                state.adminGetAllAdsError = payload
                state.adminGetAllAdsloading = false
            }).addCase(admingetUserAd.pending, (state, { payload }) => {
                state.admingetUserAdloading = true
            }).addCase(admingetUserAd.fulfilled, (state, { payload }) => {
                state.admingetUserAdloading = false
                state.userAd = payload
            }).addCase(admingetUserAd.rejected, (state, { payload }) => {
                state.admingetUserAdloading = false
                state.error = payload

            }).addCase(handleAdOrder.pending, (state, { payload }) => {
                state.handleAdOrderloading = true

            }).addCase(handleAdOrder.fulfilled, (state, { payload }) => {
                state.handleAdOrderloading = false
                state.order = true

            }).addCase(handleAdOrder.rejected, (state, { payload }) => {
                state.handleAdOrderloading = false
                state.error = payload
            })
    }
})
export default adSlice.reducer;