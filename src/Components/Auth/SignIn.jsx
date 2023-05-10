import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setError, setIsAuth} from "../../Store/slices/SignInSlice";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import style from './Auth.module.css'

const SignIn = () => {
    const [cookies, setCookies] = useCookies(['currentUser'])
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {error} = useSelector(state => state.signIn)
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const postUser = async () => {
            try {
                const res = await axios.post('/api/sign_in', data)
                if (res.status === 200) {
                    dispatch(setError(res.status))
                    dispatch(setIsAuth(true));
                    setCookies('currentUser', res.data.user, {path: '/', maxAge: 60 * 60 * 24, domain: "neprostitelno.github.io"})
                }

            } catch (e) {
                if(e.response.request.status === 400){
                    dispatch(setError(400))
                }
                console.log(e.response.request.status)
                console.log(error)
            }
        }
        postUser();

    };

    return <div className={style.form}>
        {error === 200 ? <Navigate to="/my"/> :
            <div>
                {error === 400 ? <div className={style.text}>Вы ввели не верный логин или пароль!</div> : null}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.auth}>
                        <div>
                            Введите логин
                            <input className={style.input} {...register("login", {required: true})}
                                   aria-invalid={errors.login ? "true" : "false"}/>
                            {errors.login?.type === 'required' && <p role="alert">Login is required</p>}
                        </div>
                        <div>
                            Введите пароль
                            <input className={style.input} type={"password"} {...register("password", {required: true})}
                                   aria-invalid={errors.password ? "true" : "false"}/>
                            {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
                        </div>
                        <div>
                            <input className={style.button} type="submit" value="Войти"/>
                        </div>
                    </div>
                </form>
            </div>
        }
        <div className={style.text}><NavLink to={"/registration"}>Регистрация</NavLink></div>
    </div>
}
export default SignIn;