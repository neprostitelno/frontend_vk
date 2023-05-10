import React from "react";
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Registration from "./Components/Auth/registration";
import Profile from "./Components/Profile/Profile";
import AllUsers from "./Components/Profile/AllUsers";
import SignIn from "./Components/Auth/SignIn";
import Followers from "./Components/Friends/Followers";
import Posts from "./Components/Posts/Posts";
import Messages from "./Components/Messages/Messages";
import {useCookies, withCookies} from "react-cookie";
import MyProfile from "./Components/Profile/MyProfile";
import Followings from "./Components/Friends/Followings";


function App() {
    const [cookies, ,] = useCookies(['currentUser']);

    return <div className='app-wrapper' id='app-wrapper'>
        <main className="main">
            <div className="app-wrapper__container">
                <Header/>
                {cookies.currentUser ? <>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route exact path='/my'
                                   element={<MyProfile/>}/>
                            <Route exact path='/posts'
                                   element={<Posts/>}/>
                            <Route exact path='/user/:id/follower'
                                   element={<Followers/>}/>
                            <Route exact path='/user/:id/following'
                                   element={<Followings/>}/>
                            <Route exact path='/messages'
                                   element={<Messages/>}/>
                            <Route exact path='/all_users'
                                   element={<AllUsers/>}/>
                            <Route exact path='/user/:id'
                                   element={<Profile/>}/>
                        </Routes>
                    </div>
                </> : <>
                    <div className='app-wrapper-auth'>
                    <Routes>
                        <Route exact path ='/'
                        element={<SignIn/>}/>
                    <Route exact path="/sign_in"
                           element={<SignIn/>}/>
                    <Route exact path='/registration'
                           element={<Registration/>}/>
                </Routes>
                    </div>
                </>}
                <Footer/>
            </div>
        </main>
    </div>
}

export default withCookies(App);
