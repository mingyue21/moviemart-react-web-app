import React from "react";
import {Form} from "antd";
import Button from "../../components/Button";
import "../../stylesheets/sizes.css";
import {Link} from "react-router-dom";

function Login() {
    const onFinish = (values) => {
        console.log("Success: ", values)
    }

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