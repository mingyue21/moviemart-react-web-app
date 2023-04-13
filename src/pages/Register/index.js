import React from "react";
import {Form} from "antd";
import Button from "../../components/Button";
import "../../stylesheets/sizes.css";
import {Link} from "react-router-dom";

function Register() {
    return (
        <div className="flex justify-center h-screen items-center">
            <div>
                <h1 className="text-xl">MOVIEMART - REGISTER</h1>
                <hr/>
                <Form layout="vertical">
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