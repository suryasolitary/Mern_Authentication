import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    Loading:false,
    Error:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        SignInStart: (state) => {
            state.Loading=true;
        },
        SignInSuccess: (state,action) =>{
            state.currentUser = action.payload;
            state.Loading=false;
            state.Error=false;
        },
        SignInFaliure: (state,action) => {
            state.Loading = false;
            state.Error = action.payload;
        }
    }
})
export const { SignInStart,SignInSuccess,SignInFaliure } = userSlice.actions;

export default userSlice.reducer