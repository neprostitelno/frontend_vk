import React, {useState} from "react";
import axios from "axios";
import style from "./../Profile/AllUsers.module.css"
import avatar from "./../../assets/img/avatar.svg"
import {NavLink, useParams} from "react-router-dom";
import preloaderImg from "../../assets/img/Spinner-1.4s-211px.svg";


const Followings = () =>{

    const params = useParams();
    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [followings, setFollowings] = useState([])
    const [change, setChange] = useState(false)
    const [preloader, setPreloader] = useState(false)
    const [firstGet, setFirstGet] = useState(true)

    React.useEffect(() => {
        if (firstGet) {
            setPreloader(true)
            setFirstGet(false)
        }
        if (fetching) {
            const allUsers = async () => {
                try {
                    const res = await axios.get(`/api/user/${params.id}/following?page=${currentPage}&limit=10`)
                    setFollowings([...followings, ...res.data.result])
                    setTotalCount(res.data.count)
                    setCurrentPage(prevState => prevState + 1)
                    setFetching(false)
                    setPreloader(false)

                } catch (e) {
                    console.log(e)
                }
            }
            allUsers();
        }
    }, [fetching])

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && followings.length <= totalCount) {
            setFetching(true)
        }
    }
    const onSubmit = (user, follow) =>{
        if(follow){
            const onSubmitUnfollow = (user) => {
                setChange(true)
                const getPost = async () => {
                    try {
                        const res = await axios.delete(`/api/user/${user.followingid}/unfollow`)
                        setChange(false)
                    } catch (e) {
                        console.log(e)
                    }
                }
                getPost();
            }
            onSubmitUnfollow(user)
        } else {
            const onSubmitFollow = (user) => {
                setChange(true)
                const getPost = async () => {
                    try {
                        const res = await axios.post(`/api/user/${user.followingid}/follow`)
                        setChange(false)
                    } catch (e) {
                        console.log(e)
                    }
                }
                getPost();
            }
            onSubmitFollow(user)
        }
    }

    return <div className={style.border}>
        <div>Подписки</div>
        {preloader? <img className={style.img} src = {preloaderImg} alt='/'/>: <div>
        {followings.map((user, index) => <div key={index} className={style.users}>
            <div>{user.icon ? <img className={style.img} src={user.icon} alt=""/> :
                <img className={style.img} src={avatar} alt=""/>}</div>
            <div className={style.name}>
                <NavLink to={`/user/${user.followerid}`}>{user.name} {user.surname}</NavLink>

                <div>{!user.following? <button id = "1" disabled={change} className={style.button} onClick={() => {
                        onSubmit(user ,user.following);
                        {user.following = true}
                    }}>Подписаться</button>:
                    <button className={style.button} disabled={change} id = "2" onClick={() => {
                        onSubmit(user, user.following);
                        {user.following = false}
                    }}>Отписаться</button>}
                </div>

            </div>

        </div>)}</div>}

    </div>
}

export default Followings;