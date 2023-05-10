import React, {useState} from "react";
import axios from "axios";
import style from "./../Profile/User.module.css"
import avatar from "../../assets/img/avatar.svg";
import heart from "../../assets/img/heart.png";
import preloader from "../../assets/img/Spinner-1.4s-211px.svg";
import {NavLink} from "react-router-dom";

const Posts = () =>{
    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [post, setPost] = useState([])

    React.useEffect(() => {
        if(fetching) {
            const Posts = async () => {
                try {
                    const res = await axios.get(`/api/feed?page=${currentPage}&limit=5`)
                    setPost([...post, ...res.data.result])
                    setTotalCount(res.data.count)
                    setCurrentPage(prevState => prevState + 1)
                    setFetching(false)
                } catch (e) {
                    console.log(e)
                }
            }
            Posts();
        }
    }, [fetching])

    React.useEffect(()=>{
        document.addEventListener('scroll', scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        }
    },[])

    const scrollHandler = (e) =>{
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && post.length <= totalCount){
            setFetching(true)
        }
    }

    return <div>
        <div className={style.post}>Посты</div>
        {post.map((posts, index) => <div key={index} className={style.posts}>
            <div className={style.follow}>
                <div>{posts.icon ? <img className={style.imgPost} src={posts.icon} alt=""/> :
                    <img className={style.imgPost} src={avatar} alt=""/>}</div>
                <div className={style.content}>
                    <div className={style.author}><NavLink to={`/user/${posts.authorid}`}>{posts.name} {posts.surname}</NavLink></div>
                    <div className={style.title}>{posts.title}</div>
                    <div>{posts.content}</div>
                    <div>{posts.postdate}</div>
                </div>
            </div>
            <div><img className={style.like} src={heart} alt=""/>
            </div>
        </div>)}
    </div>
}

export default Posts;