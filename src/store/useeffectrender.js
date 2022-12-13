import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stateNumber: 0,
}

const useeffectrender = createSlice({
    name: "useeffectrender",
    initialState,
    reducers: {
        setStateNumber: (state, action) => {
            state.stateNumber = action.payload
            console.log("state.stateNumber")
        }
    }
})


export const { setStateNumber } = useeffectrender.actions;
export default useeffectrender.reducer;
