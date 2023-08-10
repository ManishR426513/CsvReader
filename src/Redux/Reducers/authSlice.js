import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    accessToken: '',
    user : {},
    officeData:[],
    SingleUserData:[]
  };
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
   
    setAccessToken: (state,action) => {
        state.accessToken = action.payload;
      },

    setuser: (state,action) => {
        state.user=action.payload;
      },

      logout: (state, action) => {
       // state.isAuthenticated = action.payload
        state.user = {}
        state.accessToken = ''
        state.officeData=''
        state.SingleUserData=''
      },

      setofficeData: (state,action) => {
        state.officeData = action.payload;
      },
      delofficeData:(state,action)=>{
        state.officeData=""
      },
      setSingleUserData:(state,action)=>{
        state.SingleUserData=action.payload
      }

    

  }
});

export const { setAccessToken,setofficeData, setuser,delofficeData , logout,setSingleUserData} = authSlice.actions;

export default  authSlice.reducer;

