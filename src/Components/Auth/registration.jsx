import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "../../Store/slices/SignInSlice";
import {NavLink, useNavigate} from "react-router-dom";
import style from "./Auth.module.css";

const Registration = () => {

    const {register, formState: {errors}, handleSubmit} = useForm();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const onSubmit = (data) => {
        const postUser = async () => {
            try {
                const res = await axios.post('/api/create_user', data)
                if(res.status === 200){
                    dispatch(setIsAuth(true));
                }
            } catch (e) {
                console.log(e)
            }
        }
        postUser();
        navigate('/sign_in')
    };

    return <div  className={style.form}>
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
                Введите имя
                <input className={style.input} {...register("name", {required: true})}
                        aria-invalid={errors.name ? "true" : "false"}/>
                </div>
                <div>
                Введите фамилию
                <input className={style.input} {...register("surname", {required: true})}
                        aria-invalid={errors.surname ? "true" : "false"}/>
                </div>
                <div>
                    Введите дату рождения
                    <input className={style.input} type={"date"} {...register("birthday", {required: true})}
                            aria-invalid={errors.birthday ? "true" : "false"}/>
                </div>
                <div>
                    Введите город
                    <input className={style.input} {...register("city", {required: true})}
                           aria-invalid={errors.city ? "true" : "false"}/>
                </div>
                <div>
                    Введите университет
                    <input className={style.input} {...register("university", {required: true})}
                           aria-invalid={errors.university ? "true" : "false"}/>
                </div>
                <div>
                <input className={style.button} type="submit"/>
                </div>
            </div>
        </form>
        <div className={style.text}><NavLink to={"/sign_in"}>Уже есть аккаунт?</NavLink></div>
    </div>
}
export default Registration;