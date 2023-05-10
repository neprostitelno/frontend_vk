import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    post:{
        result:[]
    }
};

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setIsPost(state, action) {
            state.post = action.payload;
        }
    }
})

export const {setIsPost} = PostSlice.actions;

export default PostSlice.reducer;


