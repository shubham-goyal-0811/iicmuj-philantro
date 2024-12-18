import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import toast from 'react-hot-toast';

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
    const [newAvatar, setNewAvatar] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/v1/users/profile', {
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
            } 
            else {
                console.error('Failed to fetch profile:', data.message);
            }
        } 
        catch (error) {
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
            const response = await fetch('http://localhost:8001/api/v1/users/profile/update', {
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
                toast.success("Profile Updated Successfully!!")
                // alert('Profile updated successfully!');
            } 
            else {
                toast.error(`Failed to update profile: ${data.message}`)
                // alert('Failed to update profile: ' + data.message);
            }
        } 
        catch (error) {
            toast.error(`Failed to update profile`)
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordChangeSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/v1/users/change-password', {
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
                toast.success('Password changed successfully!');
                setIsChangingPassword(false);
                navigate('/Login');
            } 
            else {
                toast.error('Failed to change password: ' + data.message);
            }
        } 
        catch (error) {
            toast.error('Failed to change password ');
            console.error('Error changing password:', error);
        }
    };
    const handleAvatarChange = async (e) => {
        const formData = new FormData();
        formData.append('avatar', newAvatar);

        try {
            const response = await fetch('http://localhost:8001/api/v1/users/profile/update-avatar', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    avatar: data.data.avatar,
                }));
                toast.success('Avatar updated successfully!');
            } 
            else {
                toast.error('Failed to update avatar: ' + data.message);
            }
        } 
        catch (error) {
            toast.error('Failed to update avatar');
            console.error('Error updating avatar:', error);
        }
    };

    const handleAvatarFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex justify-center items-center bg-[#ffffff]">
                <div className="bg-[#faf8ff] p-10 rounded-2xl shadow-2xl w-full max-w-4xl duration-300 relative">
                    <div className="editname flex items-center justify-between mb-6">
                        <div className="name">
                            <h1 className="text-5xl font-bold">{updatedProfile.fullName}</h1>
                        </div>
                        <div className="editing">
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
                                <input type="text" name="fullName" value={updatedProfile.fullName} onChange={handleInputChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block font-semibold">Username</label>
                                <input type="text" name="username" value={updatedProfile.username} onChange={handleInputChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block font-semibold">Email</label>
                                <input type="email" name="email" value={updatedProfile.email} onChange={handleInputChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block font-semibold">Mobile Number</label>
                                <input type="number" name="mobileNo" value={updatedProfile.mobileNo} onChange={handleInputChange} className="w-full border p-2 rounded-lg" />
                            </div>
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700" onClick={handleChange} >
                                Save Changes
                            </button>
                            <button className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={() => setIsEditing(false)} >
                                Cancel
                            </button>
                        </div>
                    ) : isChangingPassword ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Current Password</label>
                                <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">New Password</label>
                                <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700" onClick={handlePasswordChangeSubmit} >
                                Change Password
                            </button>
                            <button className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={() => setIsChangingPassword(false)} >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="photochange flex items-center">
                                <img src={profile.avatar} alt="avatar" className="rounded-full border-2 w-3/12 mr-6" />
                                <div>
                                    <p className="font-bold">User Role: {profile.role}</p>
                                </div>
                                <div className="">
                                    <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" id="avatar-upload" />
                                    <label htmlFor="avatar-upload" className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700">
                                        Change Avatar
                                    </label>
                                    {newAvatar && (
                                        <button className="ml-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700" onClick={handleAvatarChange} >
                                            Save Avatar
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex">
                                    <label className="block font-semibold text-2xl">Username:</label>
                                    <p className="text-xl flex items-center ml-5">{profile.username}</p>
                                </div>
                                <div className="flex">
                                    <label className="block font-semibold text-2xl">Email:</label>
                                    <p className="mail text-xl flex items-center ml-5">{profile.email}</p>
                                </div>
                                <div className="flex">
                                    <label className="block font-semibold text-2xl">Mobile No:</label>
                                    <p className="text-xl flex items-center ml-5">{profile.mobileNo}</p>
                                </div>
                                <div className="w-auto ">
                                    <label className="block text-2xl font-semibold">Donations:</label>
                                    <ul className="displaydonations flex">
                                        {profile.donation.map((donation, index) => (
                                            <li className="text-xl p-4 border-2 m-2" key={index}>
                                                <p><strong className="underline">NGO Name:</strong> {donation.ngoId.name}</p>
                                                <p><strong className="underline">Amount Donated:</strong> ₹{donation.amount}</p>
                                                <p className="text-xl flex justify-center items-center p-1">
                                                    <strong className="underline">Donated On: </strong>
                                                    {new Date(donation.createdAt).getFullYear()}/
                                                    {String(new Date(donation.createdAt).getMonth() + 1).padStart(2, '0')}/
                                                    {String(new Date(donation.createdAt).getDate()).padStart(2, '0')}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex">
                                    <label className="block font-semibold text-2xl p-1">Created At:</label>
                                    <p className="text-xl flex justify-center items-center p-1">
                                        {new Date(profile.createdAt).getFullYear()}/
                                        {String(new Date(profile.createdAt).getMonth() + 1).padStart(2, '0')}/
                                        {String(new Date(profile.createdAt).getDate()).padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}