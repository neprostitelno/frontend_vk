import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user:[],
    follow: false
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setIsUser(state, action) {
            state.user = action.payload;
        },
        setFollow(state, action){
            state.follow = action.payload;
        }
    }
})

export const {setIsUser, setFollow} = UserSlice.actions;

export default UserSlice.reducer;


