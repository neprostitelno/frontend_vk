import React from "react";
import style from "./Navbar.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import SignOut from "../Auth/SignOut";
const Navbar = () => {

    return <div className={style.navbar}>
        <div className={style.navbarContent}>
            <div><NavLink to="/my">Моя страница</NavLink></div>
            <div><NavLink to="/posts">Лента</NavLink></div>
            <div><NavLink to="/messages">Сообщения</NavLink></div>
            <div><NavLink to="/all_users">Все пользователи</NavLink></div>
            <div><SignOut/></div>
        </div>
    </div>
}
export default Navbar;