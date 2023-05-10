import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    users:{
        result:[]
    },
    result: [],
};

export const AllUsersSlice = createSlice({
    name: 'AllUsers',
    initialState,
    reducers: {
        setIsUsers(state, action) {
            state.users = action.payload;
        },
        setIsRes(state, action) {
            state.result = action.payload;
        }
    }
})

export const {setIsUsers, setIsRes} = AllUsersSlice.actions;

export default AllUsersSlice.reducer;


