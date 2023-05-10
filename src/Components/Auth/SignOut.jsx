import {setIsAuth} from "../../Store/slices/SignInSlice";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";
import style from "./../Navbar/Navbar.module.css"
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const [cookies, setCookies, removeCookies] = useCookies(['currentUser'])
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const logout = () => {
        dispatch(setIsAuth(false));
        removeCookies('currentUser', {path: '/'});
        navigate('/sign_in')
    }
    return <div>
            <button className={style.button} onClick={logout}><div className={style.textButton}>Выйти</div>
                </button>
        </div>
}

export default SignOut;
