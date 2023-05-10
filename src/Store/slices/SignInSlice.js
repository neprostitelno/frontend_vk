import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    isAuth: false,
    error: null,
    isFetching: false,

};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
})

export const {setIsAuth, setError} = signInSlice.actions;

export default signInSlice.reducer;


