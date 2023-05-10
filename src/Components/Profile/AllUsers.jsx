import React, {useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import style from "./AllUsers.module.css"
import avatar from "./../../assets/img/avatar.svg"
import preloaderImg from './../../assets/img/Spinner-1.4s-211px.svg'
import {useDebounce} from "use-debounce";

const AllUsers = () => {

    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [preloader, setPreloader] = useState(false)
    const [firstGet, setFirstGet] = useState(true)

    const onSearchChange = (e) => {
        const {value} = e.target
        setSearch(value)
    }

    React.useEffect(() => {
            if (firstGet) {
                setPreloader(true)
                setFirstGet(false)
            }
            if (debouncedSearch[0] !== '') {
                const allUsers = async () => {
                    const res = await axios.get(`/api/user?search=${search}&page=${currentPage}&limit=10`)
                    setPreloader(false)
                    setUsers(res.data.result)
                }
                allUsers()
            } else {
                if (fetching) {
                    const allUsers = async () => {
                        const res = await axios.get(`/api/user?page=${currentPage}&limit=10`)
                        setPreloader(false)
                        setUsers([...users, ...res.data.result])
                        setTotalCount(res.data.count)
                        setCurrentPage(prevState => prevState + 1)
                        setFetching(false)
                    }
                    allUsers()
                }
            }
        }, [debouncedSearch[0], fetching]
    )

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && users.length <= totalCount) {
            setFetching(true)
        }
    }

    return (
        <div className={style.border}>
            <div>Пользователи</div>
            {preloader ? <img src={preloaderImg} alt=''/> : <div>
                <div>
                    <input className={style.search} placeholder='Поиск' type="search" value={search}
                           onChange={onSearchChange}/>
                </div>
                {users.map((user, index) => <div key={index} className={style.users}>
                    <div>{user.icon ? <img className={style.img} src={user.icon} alt=""/> :
                        <img className={style.img} src={avatar} alt=""/>}</div>
                    <div className={style.name}>
                        <NavLink to={`/user/${user.id}`}>{user.name} {user.surname}</NavLink>
                    </div>
                </div>)}</div>}
        </div>
    )
}
export default AllUsers;