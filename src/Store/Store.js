import {configureStore} from '@reduxjs/toolkit'
import AllUsersSlice from "./slices/AllUsersSlice";
import UserSlice from "./slices/UserSlice";
import signInSlice from "./slices/SignInSlice";
import PostSlice from "./slices/PostSlice";
import FriendsSlice from "./slices/FriendsSlice";

const store = configureStore({
    reducer: {
        users: AllUsersSlice,
        user: UserSlice,
        signIn: signInSlice,
        post: PostSlice,
        follow: FriendsSlice
    }
})
export default store;
