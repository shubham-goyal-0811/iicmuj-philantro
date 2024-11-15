import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNo: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        picture: null
    });
    const [errors, setErrors] = useState('');
    const [FundRaiser, setFundRaiser] = useState(false);
    const [secondFormVisible, setSecondFormVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const { mobileNo, username, email, confirmpassword, password, fullName } = formData;

        if (password !== confirmpassword) {
            setErrors('Passwords do not match');
            return;
        }

        if (!password || !confirmpassword) {
            setErrors('Please enter the password');
            return;
        }

        setErrors('');

        if (FundRaiser) {
            setSecondFormVisible(true);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); 
        const { mobileNo, username, email, confirmpassword, password, fullName, idProof, avatar } = formData;

        if (password !== confirmpassword) {
            setErrors('Passwords do not match');
            return;
        }
        if (!password || !confirmpassword) {
            setErrors('Please enter the password');
            return;
        }
        if (!mobileNo) {
            setErrors('Please enter a valid Mobile Number');
            return;
        }
        if (!username) {
            setErrors('Please enter a valid Username');
            return;
        }
        setErrors('');

        const backendUrl = '/api/v1/users/register';

        const formDataToSend = new FormData();
        formDataToSend.append('fullName', fullName);
        formDataToSend.append('mobileNo', mobileNo);
        formDataToSend.append('username', username);
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);
        formDataToSend.append('confirmpassword', confirmpassword);

        //checking if fundraiser or donor
        if (FundRaiser) {
            formDataToSend.append('role', 'NGO');
        } else {
            formDataToSend.append('role', 'User');
        }

        //avatar for your profile pic
        if(avatar){
            formDataToSend.append('avatar',avatar);
        }

        //id for human or not
        if (idProof) {
            formDataToSend.append('idProof', idProof);
        }

        //sending the ngo document
        if (FundRaiser && formData.NGODOC) {
            formDataToSend.append('NGODOC', formData.NGODOC);
        }

        try {
            const response = await axios.post(backendUrl, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response.data);
            navigate('/Login');
        }
        catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setErrors('An error occurred. Please try again.');
        }
    };
    const handleSecondFormSubmit = (e) => {
        handleSubmit(e);
    };
    function handleFund() {
        setFundRaiser(true);
    }
    function handleFund2() {
        setFundRaiser(false);
    }
    return (
        <>
            <div className="login-container flex justify-center items-center min-h-screen bg-gray-100">
                <div className="login-form bg-white p-8 rounded shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                    {errors && <p className="text-red-500 mb-4">{errors}</p>}
                    <form onSubmit={handleSubmit1}>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                            <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobileNo" className="block text-gray-700">Mobile Number</label>
                            <input type="text" id="mobileNo" name="mobileNo" required value={formData.mobileNo} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                            <input type="text" id="username" name="username" required value={formData.username} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} required minLength="4" maxLength="20" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmpassword" className="block text-gray-700">Confirm Password</label>
                            <input type="password" id="confirmpassword" name="confirmpassword" value={formData.confirmpassword} required minLength="4" maxLength="20" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="picture" className="block text-gray-700">Upload id Proof</label>
                            <input type="file" id="idProof" name="idProof" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="picture" className="block text-gray-700">Upload avatar</label>
                            <input type="file" id="avatar" name="avatar" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" />
                        </div>
                        <div className="mb-4 flex flex-col">
                            <h1 className="text-2xl font-bold">SignUp as?</h1>
                            <div className="inputs flex">
                                <label htmlFor="picture" className="block text-gray-700">Donor</label>
                                <input type="radio" id="donorRadio" name="fav_language" value="Donor" onClick={handleFund2} className="mt-1 block w-full border-2 border-gray-900 rounded" />
                                <label htmlFor="picture" className="block text-gray-700" >FundRaiser</label>
                                <input type="radio" id="FundRaiserRadio" name="fav_language" value="FundRaiser" onClick={handleFund} className="mt-1 block w-full border-2 border-gray-900 rounded" />
                            </div>
                        </div>
                        <div className="flex">
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-300 duration-500" style={{ margin: '1%' }}>
                                Submit
                            </button>
                            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-300 duration-500" onClick={() => navigate('./Login')} style={{ margin: '1%' }}>
                                Already Exists?
                            </button>
                        </div>
                    </form>
                </div>
                {secondFormVisible && (
                    <div className="fundraiserDocmain absolute w-full h-screen">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="fundraiserDoc-form bg-white p-8 rounded shadow-2xl w-full max-w-md">
                                <h1 className="text-2xl font-bold">Upload NGO Document</h1>
                                <form onSubmit={handleSecondFormSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="NGODOC" className="block text-gray-700">Upload NGO Document</label>
                                        <input type="file" id="NGODOC" name="NGODOC" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" />
                                    </div>
                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-300">
                                        Submit Document
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
