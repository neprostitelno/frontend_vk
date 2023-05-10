import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    followers:{
        result:[]
    },
    followings:{
        result:[]
    },
};

export const FriendsSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        setIsFollowers(state, action) {
            state.followers = action.payload;
        },
        setIsFollowings(state, action) {
            state.followings = action.payload;
        }
    }
})

export const {setIsFollowers, setIsFollowings} = FriendsSlice.actions;

export default FriendsSlice.reducer;


