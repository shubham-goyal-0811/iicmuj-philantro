import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

export default function Loginout({ isNgo }) {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        avatar: '',
        fullName: '',
        role: '',
        mobileNo: '',
        donation: [],
    });
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isNGO, setisNGO] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile();
            if (isNgo) {
                setisNGO(true);
            }
        } 
        else {
            setProfile(null);
        }
    }, [isAuthenticated]);

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
            if 
            (data.success) {
                setProfile(data.data);
            } 
            else {
                console.error('Failed to fetch profile:', data.message);
            }
        } 
        catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((n) => n[0]).join('').toUpperCase();
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error('No access token found. Please log in again.');
            localStorage.setItem('isAuthenticated', false);
            localStorage.setItem('username', '');
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('http://localhost:8001/api/v1/users/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('username', '');
                toast.success('Logged out successfully');
                navigate('/');
                window.location.reload();
            } 
            else {
                const data = await response.json();
                toast.error(data.message || 'Logout failed');
            }
        } 
        catch (error) {
            console.error('Error logging out:', error);
            toast.error('An error occurred during logout');
        }
    };

    const handleProfile = () => {
        navigate(`/users/profile`);
    };

    const handleNGOAdd = () => {
        navigate('/ngoadd');
    };

    return (
        <>
            <div className="loginout flex items-center justify-center w-6/12">
                {!isAuthenticated ? (
                    <button className="cta flex justify-center items-center rounded-3xl" onClick={() => navigate('../Login')}>
                        <span>Login</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10" className="flex justify-center items-center">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                ) : (
                    <div className="user w-full flex rounded-lg justify-center">
                        <div className="userinfo flex flex-col items-center relative">
                            <button>
                                <div className="userImg w-[4rem] flex justify-center items-center bg-gray-400 text-white rounded-full hover:bg-gray-700 duration-200" style={{ textAlign: 'center', fontSize: '1.5rem' }} onClick={toggleDropdown} >
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="User Avatar" className="rounded-full w-full h-full object-cover" />
                                    ) : (
                                        <span style={{ lineHeight: '4rem', fontSize: '1.5rem' }}>
                                            {getInitials(profile.username)}
                                        </span>
                                    )}
                                </div>
                            </button>
                            {dropdownVisible && (
                                <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
                                    <div className="text-center mb-2 text-black">Welcome, {profile.username}</div>
                                    <div className="logout flex flex-col justify-center items-center">
                                        <button className="bg-slate-300 text-black rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500" onClick={() => handleLogout()} style={{ padding: '10%', margin: '5%' }} >
                                            Log out
                                        </button>
                                        <button className="bg-slate-300 text-black rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500" onClick={() => handleProfile()} style={{ padding: '10%', margin: '5%' }} >
                                            Profile
                                        </button>
                                        {isNgo && isNGO && (
                                            <button onClick={handleNGOAdd} className="border-2 p-2 rounded-full text-black hover:bg-slate-300 duration-200">
                                                NGO++
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
