import React, {useEffect, useState}from "react";
import {Form, message, Input} from "antd";
import Button from "../../components/Button";
import "../../stylesheets/sizes.css";
import "../../stylesheets/alignment.css";
import "../../stylesheets/theme.css";
import {Link, useNavigate} from "react-router-dom";
import {LoginUser} from "../../services/users";
import {useDispatch} from "react-redux";
import {HideLoading, ShowLoading} from "../../redux/loadersSlice";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onFinish = async(values) => {
        if (loginClicked) {
            try {
                dispatch(ShowLoading());
                const response = await LoginUser(values);
                dispatch(HideLoading());
                if (response.success) {
                    message.success(response.message);
                    localStorage.setItem("token", response.data);
                    window.location.href = "/";
                } else {
                    message.error(response.message);
                }
            } catch (error) {
                dispatch(HideLoading());
                message.error(error.message);
            }
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);


    return (
        <div className="flex justify-center h-screen items-center">
            <div>
                <h1 className="text-xl mb-1" >MOVIEMART - LOGIN</h1>
                <hr/>
                <Form layout="vertical"
                      onFinish={onFinish}>
                    <div className="mt-1">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required:true, message:"Please enter your email"}]}>
                            <input type="email"/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required:true, message:"Please enter your password"}]}>
                            <div className="position-rel">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button onClick={handleTogglePasswordVisibility}
                                        className="position-abs justify-center flex right border-none
                                                    items-center top bg-transparent pr-5px">
                                    {showPassword ?
                                        <i className="ri ri-eye-line"></i>
                                        : <i className="ri ri-eye-off-line"></i>}
                                </button>
                            </div>
                        </Form.Item>
                    </div>

                    <div className="flex flex-column mt-2 gap-1">
                        <Button
                            fullWidth title="LOGIN" type='submit'
                        onClick={() => setLoginClicked(true)}/>
                        <Link to="/Register">Sign up an account? Register</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login