import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';

const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

export default function Loginout() {
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
    const { isAuthenticated } = useAuth();
    const { logout } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);

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
            } else {
                console.error('Failed to fetch profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    };
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        logout();
    };
    const handleProfile = () => {
        navigate(`/users/profile`);
    };

    const avatarUrl = getCookieValue('avatar');
    console.log('All Cookies:', document.cookie);
    return (
        <>
            <div className="loginout flex items-center justify-center w-1/12">
                {!isAuthenticated ? (
                    <div onClick={() => navigate('../Login')} className="login rounded-lg" style={{ padding: '10%' }}>
                        <button>Log in</button>
                    </div>
                ) : (
                    <div className="user w-full flex rounded-lg justify-center">
                        <div className="userinfo flex flex-col items-center relative">
                            <button>
                                <div className="userImg w-full flex justify-center items-center bg-gray-400 text-white rounded-full hover:bg-gray-700 duration-200" style={{ width: '4rem', height: '4rem', lineHeight: '4rem', textAlign: 'center', fontSize: '1.5rem' }} onClick={toggleDropdown}>
                                {avatarUrl ? (
                                        <img src={avatarUrl} alt="User Avatar" className="rounded-full w-full h-full object-cover" />) : (
                                        <span style={{ lineHeight: '4rem', fontSize: '1.5rem' }}>
                                            {getInitials(profile.username)}
                                        </span>
                                    )}
                                </div>
                            </button>
                            {dropdownVisible && (
                                <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
                                    <div className="text-center mb-2">Welcome, {profile.username}</div>
                                    <div className="logout flex flex-col justify-center items-center">
                                        <button
                                            className="bg-slate-300 rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500"
                                            onClick={handleLogout} style={{ padding: "10%", margin: "5%" }}>
                                            Log out
                                        </button>
                                        <button
                                            className="bg-slate-300 rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500"
                                            onClick={() => handleProfile()} style={{ padding: "10%", margin: "5%" }}>
                                            Profile
                                        </button>
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