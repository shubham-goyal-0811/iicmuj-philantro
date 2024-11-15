import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

export default function Profile() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        avatar: '',
        fullName: '',
        role: '',
        mobileNo: '',
        donation: [],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                setProfile(data.data);
                setUpdatedProfile(data.data);
            } else {
                console.error('Failed to fetch profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleChange = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/profile/update', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: updatedProfile.fullName,
                    username: updatedProfile.username,
                    email: updatedProfile.email,
                    mobileNo: updatedProfile.mobileNo,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setProfile({ ...profile, ...updatedProfile });
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordChangeSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/change-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Password changed successfully!');
                setIsChangingPassword(false);
                navigate('/Login');
            } else {
                alert('Failed to change password: ' + data.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-off-white flex justify-center items-center bg-[#d2c9c9]">
                <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl hover:scale-105 duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="name">
                            <h1 className="text-3xl font-bold">{updatedProfile.fullName}</h1>
                        </div>
                        <div className="">
                            {!isEditing && !isChangingPassword && (
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 duration-200" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            )}
                            {!isChangingPassword && !isEditing && (
                                <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 ml-4 duration-200" onClick={() => setIsChangingPassword(true)}>
                                    Change Password
                                </button>
                            )}
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={updatedProfile.fullName}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={updatedProfile.username}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Mobile Number</label>
                                <input
                                    type="number"
                                    name="mobileNo"
                                    value={updatedProfile.mobileNo}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                                onClick={handleChange}
                            >
                                Save Changes
                            </button>
                            <button
                                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : isChangingPassword ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Current Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwords.oldPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                                onClick={handlePasswordChangeSubmit}
                            >
                                Change Password
                            </button>
                            <button
                                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                onClick={() => setIsChangingPassword(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <img src={profile.avatar} alt="avatar" className="rounded-full w-24 h-24 mr-6" />
                                <div>
                                    <p>{profile.role}</p>
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold text-2xl">Username:</label>
                                <p className="text-xl">{profile.username}</p>
                            </div>
                            <div>
                                <label className="block font-semibold text-2xl">Email:</label>
                                <p className="text-xl">{profile.email}</p>
                            </div>
                            <div>
                                <label className="block font-semibold text-2xl">Mobile No:</label>
                                <p className="text-xl">{profile.mobileNo}</p>
                            </div>
                            <div>
                                <label className="block font-semibold">Donations:</label>
                                <ul>
                                    {profile.donation.map((donation, index) => (
                                        <li key={index}>{donation}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}