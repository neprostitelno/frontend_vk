import React, {useState} from "react";
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setFollow, setIsUser} from "../../Store/slices/UserSlice";
import avatar from "../../assets/img/avatar.svg";
import heart from "../../assets/img/heart.png";
import style from "./User.module.css"
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
import preloaderImg from "../../assets/img/Spinner-1.4s-211px.svg";

const Profile = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {user, follow} = useSelector(state => state.user);
    const [cookies, ,] = useCookies(['currentUser']);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [posts, setPosts] = useState([])
    const [preloader, setPreloader] = useState(false)
    const [firstGet, setFirstGet] = useState(true)


    React.useEffect(() => {
        const postUser = async () => {
            if (firstGet) {
                setPreloader(true)
                setFirstGet(false)
            }
            try {
                const res = await axios.get(`/api/user/${params.id}`)
                dispatch(setIsUser(res.data))
                setPreloader(false)
            } catch (e) {
                console.log(e)
            }
        }
        postUser();
    }, [params.id])

    React.useEffect(() => {
        const FollowCheck = async () => {
            try {
                const res = await axios.get(`/api/user/${params.id}/followcheck`)
                dispatch(setFollow(res.data.follow))
            } catch (e) {
                console.log(e)
            }
        }
        FollowCheck();
    })

    const onSubmitFollow = () => {
        const getPost = async () => {
            try {
                const res = await axios.post(`/api/user/${params.id}/follow`)
            } catch (e) {
                console.log(e)
            }
        }
        getPost();
    }

    const onSubmitUnfollow = () => {
        const getPost = async () => {
            try {
                const res = await axios.delete(`/api/user/${params.id}/unfollow`)
            } catch (e) {
                console.log(e)
            }
        }
        getPost();
    }

    const onSubmitPost = (data, event) => {

        const postPost = async () => {
            try {
                const res = await axios.post('/api/create_post', data)
            } catch (e) {
                console.log(e)
            }
        }
        postPost();
        event.target.reset();
    };
    React.useEffect(() => {
        if (firstGet) {
            setPreloader(true)
            setFirstGet(false)
        }
        if (fetching) {
            const getPosts = async () => {
                try {
                    const res = await axios.get(`/api/user/${params.id}/posts?page=${currentPage}&limit=1`)
                    setPreloader(false)
                    setPosts([...posts, ...res.data.result])
                    setTotalCount(res.data.count)
                    setCurrentPage(prevState => prevState + 1)
                    setFetching(false)

                } catch (e) {
                    console.log(e)
                }
            }
            getPosts();
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
            && posts.length <= totalCount) {
            setFetching(true)
        }
    }

    const onSubmitPhoto = (e) => {
        if (e.target.files.length) {

            const UploadPhoto = async () => {
                try {
                    const formData = new FormData();
                    formData.append('photo', e.target.files[0])
                    const res = await axios.put('/api/upload_photo', formData, {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            }
            UploadPhoto();
        }
        console.log(e.target.files[0])

    }

    return <div> {preloader ? <img src={preloaderImg} alt=''/> :
        <div>
            <div className={style.border}>
                <div>
                    <div>{user.icon ? <img className={style.img} src={user.icon} alt=""/> :
                        <img className={style.img} src={avatar} alt=""/>}
                    </div>
                    <div>{cookies.currentUser === params.id ? <div>
                        Обновление фото:
                        <div><input accept="image" type="file" onChange={onSubmitPhoto}/></div>
                    </div> : null}
                    </div>
                </div>
                <div className={style.info}>
                    <div className={style.name}>
                        {user.name} {user.surname}
                    </div>
                    <div className={style.name}>
                        {user.city}
                    </div>
                    <div className={style.name}>
                        {user.birthday === null || user.birthday === undefined ? " " : user.birthday.slice(0, 10)}
                    </div>
                    <div className={style.name}>
                        {user.university}
                    </div>
                    <div>
                        <div className={style.name}><NavLink to={`/user/${params.id}/follower`}>Подписчики </NavLink>
                        </div>
                        <div className={style.name}><NavLink to={`/user/${params.id}/following`}>Подписки</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.follow}>
                {cookies.currentUser === params.id ? null : <div className={style.following}>
                    {follow === false ?
                        <form onSubmit={handleSubmit(onSubmitFollow)}>
                            <div className={style.name}>
                                <input className={style.button} type={"submit"} value="Подписаться"/>
                            </div>
                        </form> :
                        <form onSubmit={handleSubmit(onSubmitUnfollow)}>
                            <div className={style.name}>
                                <input className={style.button} type={"submit"} value="Отписаться"/>
                            </div>
                        </form>}
                </div>}
            </div>
            {cookies.currentUser === params.id ?
                <div className={style.form}>
                    <form onSubmit={handleSubmit(onSubmitPost)}>
                        <div>
                            Создание поста:
                        </div>
                        <div>
                            <input className={style.input}
                                   placeholder="Введите название" {...register("title", {required: true})}/>
                        </div>
                        <div>
                            <input className={style.input}
                                   placeholder="Введите текст" {...register("content", {required: true})}/>
                        </div>
                        <div>
                            <input className={style.button} type="submit"/>
                        </div>
                    </form>
                </div> : null}

            <div>{posts.length === 0 ? <div className={style.text}>У этого пользователя нет постов...</div> :
                <div>
                    <div className={style.text}>Посты:</div>
                    {posts.map((post, index) => <div key={index} className={style.posts}>
                        <div className={style.follow}>
                            <div>{post.icon ? <img className={style.imgPost} src={post.icon} alt=""/> :
                                <img className={style.imgPost} src={avatar} alt=""/>}</div>
                            <div className={style.content}>
                                <div className={style.author}>{post.name} {post.surname}</div>
                                <div className={style.title}>{post.title}</div>
                                <div>{post.content}</div>
                                <div>{post.postdate.slice(0,10)}</div>
                            </div>
                        </div>
                        <div><img className={style.like} src={heart} alt=""/>
                        </div>
                    </div>)}
                </div>}
            </div>
        </div>}
    </div>
}
export default Profile;