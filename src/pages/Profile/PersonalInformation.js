import React, {useEffect, useState} from "react";
import {Input, Button, Modal, message} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../../redux/usersSlice";
import PageTitle from "../../components/PageTitle";
import {UpdatePersonalInfo} from "../../services/users";

function PersonalInformation() {
    const { user } = useSelector((state) => state.users);
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleSave = async () => {
        // if the name and email is empty, show the modal
        if (!name || !email) {
            setModalVisible(true);
            return;
        }

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
            message.success("Update information successfully");
        } else {
            setErrorModalVisible(true);
        }
    };

    return (
        <div>
            <PageTitle title="Personal Information" />
            <form className="pb-2" >

                <label htmlFor="name">Name:</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="age">Age:</label>
                <Input value={age} onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="email">Email:</label>
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

            <Modal
                title="Error"
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <p>The name and email can't be empty!</p>
            </Modal>

            <Modal
                title="Error"
                visible={errorModalVisible}
                onOk={() => setErrorModalVisible(false)}
                onCancel={() => setErrorModalVisible(false)}
            >
                <p>The email is already in use!</p>
            </Modal>



        </div>
    );
}

export default PersonalInformation;
