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
        },
        updateUserStart: (state) => {
            state.Loading = true
        },
        updateUserSuccess: (state,action) =>{
            state.currentUser = action.payload,
            state.Loading = true,
            state.Error = false 
        },
        updateUserFailure: (state,action) => {
            state.Loading = false,
            state.Error = action.payload
        },
        DeleteUserStart: (state) => {
            state.Loading = true
        },
        DeleteUserSuccess: (state) =>{
            state.currentUser = null,
            state.Loading = true,
            state.Error = false 
        },
        DeleteUserFailure: (state,action) => {
            state.Loading = false,
            state.Error = action.payload
        },
        SignOut:(state)=>{
            state.currentUser= null,
            state.Loading=false,
            state.Error=false
        }
    }
})
export const { SignOut,SignInStart,SignInSuccess,SignInFaliure,updateUserStart,updateUserSuccess,updateUserFailure,DeleteUserStart,DeleteUserSuccess,DeleteUserFailure } = userSlice.actions;

export default userSlice.reducer