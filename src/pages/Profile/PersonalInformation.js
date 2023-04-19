import React, { useState } from "react";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../../redux/usersSlice";
import PageTitle from "../../components/PageTitle";
import {UpdatePersonalInfo} from "../../services/users";
import * as error from "antd";


function PersonalInformation() {
    const { user } = useSelector((state) => state.users);
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const dispatch = useDispatch();

    const handleSave = async () => {
        const updatedUser = {
            ...user,
            name: name,
            age: age,
            email: email,
            phoneNumber: phoneNumber,
        };

        const data = await UpdatePersonalInfo(updatedUser);

        if (data.success) {
            dispatch(SetUser(data.data));
        } else {
            console.error(error.message);
        }
    };

    return (
        <div>
            <PageTitle title="Personal Information" />
            <form className="pb-2">

                <label htmlFor="name" rules={[{ required: true, message: "Please input your name!" }]}>Name:</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="age">Age:</label>
                <Input value={age} onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="email" rules={[{ required: true, message: "Please input your email!" }]}>Email:</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="phone">Phone:</label>
                <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

            </form>

            <Button variant="dark" onClick={handleSave}>
                Save
            </Button>
        </div>
    );
}

export default PersonalInformation;
