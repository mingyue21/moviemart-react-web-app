import React, {useEffect} from "react";
import {Form, message} from "antd";
import Button from "../../components/Button";
import "../../stylesheets/sizes.css";
import {Link, useNavigate} from "react-router-dom";
import {LoginUser} from "../../services/users";
import {useDispatch} from "react-redux";
import {HideLoading, ShowLoading} from "../../redux/loadersSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            }else{
                message.error(response.message);
            }
        }catch (error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/home");
        }
    }, []);


    return (
        <div className="flex justify-center h-screen items-center">
            <div>
                <h1 className="text-xl">MOVIEMART - LOGIN</h1>
                <hr/>
                <Form layout="vertical"
                      onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required:true, message:"Please enter your email"}]}>
                        <input type="text"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required:true, message:"Please enter your password"}]}>
                        <input type="text"/>
                    </Form.Item>
                    <div className="flex flex-column mt-2 gap-1">
                        <Button
                            fullWidth title="LOGIN" type='submit'/>
                        <Link to="/Register">Sign up an account? Register</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login