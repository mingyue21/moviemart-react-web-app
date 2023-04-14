import React, {useEffect} from "react";
import {Form, message} from "antd";
import Button from "../../components/Button";
import "../../stylesheets/sizes.css";
import {Link, useNavigate} from "react-router-dom";
import {RegisterUser} from "../../apicalls/users";

function Register() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response = await RegisterUser(values);
            if(response.success){
                message.success(response.message);
            }else{
                message.error(response.message);
            }
        }catch (error){
            message.error(error.message);
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
                <h1 className="text-xl">MOVIEMART - REGISTER</h1>
                <hr/>
                <Form layout="vertical"
                      onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required:true, message:"Please enter your name"}]}>
                        <input type="text"/>
                    </Form.Item>
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
                            fullWidth title="REGISTER" type='submit'/>
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register