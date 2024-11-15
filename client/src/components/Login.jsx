import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const notify = (msg) => toast(msg);

export default function Login () {
    const [formData, setFormData] = useState({
        mobileNo: '',
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Login in...');
        const { mobileNo, username, email, password } = formData;
    
        if(!mobileNo && !username && !email){
            setErrors('Please fill in at least one of Mobile, Username, or Email.');
            return;
        }
        if(!password){
            setErrors("Please enter the password");
            return;
        }
        setErrors('');
    
        const backendUrl = '/api/v1/users/login';
    
        axios.post(backendUrl, formData)
            .then(response => {
                toast.success("Login Succesfull",{ id: toastId });
                console.log('Success:', response.data);
                console.log(response.data.accessToken);
                login({ username });
                navigate('/');
            })
            .catch(error => {
                toast.error(`Invalid Details`,{ id: toastId });
                console.error('Error:', error);
                setErrors('An error occurred. Please try again. Maybe check username or password');
            });
    };    

    return (
        <div className="login-container flex justify-center items-center min-h-screen bg-gray-100">
            <div className="login-form bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Log in</h2>
                {errors && <p className="text-red-500 mb-4">{errors}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username*</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobileNo" className="block text-gray-700">Mobile</label>
                        <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} required minLength="4" maxLength="20" onChange={handleChange} className="mt-1 block w-full border-2 border-gray-900 rounded" style={{ padding: '2%' }} />
                    </div>
                    <div className="loginkro flex">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-300 duration-500" style={{ margin: '1%' }}>
                            Submit
                        </button>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-300 duration-500" onClick={() => navigate('./Signup')} style={{ margin: '1%' }}>
                            New?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
