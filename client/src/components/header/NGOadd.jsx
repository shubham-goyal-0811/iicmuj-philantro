import React, { useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';

export default function NGOadd() {
    const [ngoData, setNgoData] = useState({
        name: '',
        email: '',
        description: '',
        address: '',
        category: '',
        contactNo: '',
        logo: null,
        idProof: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setNgoData({
            ...ngoData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', ngoData.name);
        formData.append('email', ngoData.email);
        formData.append('description', ngoData.description);
        formData.append('address', ngoData.address);
        formData.append('category', ngoData.category);
        formData.append('contactNo', ngoData.contactNo);
        if (ngoData.logo) formData.append('logo', ngoData.logo);
        if (ngoData.idProof) formData.append('idProof', ngoData.idProof);

        try {
            const response = await axios.post(
                'http://localhost:8001/api/v1/ngo/register',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );
            console.log('NGO created successfully:', response.data);
            alert('NGO created successfully');
        } catch (error) {
            console.error('Error creating NGO:', error);
            alert('Failed to create NGO. Please check your input.');
        }
    };

    return (
        <>
            <Header />
            <div className="ngo-form p-5">
                <h2>Create a New NGO</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={ngoData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={ngoData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={ngoData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={ngoData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <select
                            name="category"
                            value={ngoData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Charitable Organizations">Charitable Organizations</option>
                            <option value="Advocacy NGOs">Advocacy NGOs</option>
                            <option value="Social Welfare Organizations">Social Welfare Organizations</option>
                            <option value="Environmental NGOs">Environmental NGOs</option>
                            <option value="Educational NGOs">Educational NGOs</option>
                            <option value="Healthcare NGOs">Healthcare NGOs</option>
                            <option value="Cultural NGOs">Cultural NGOs</option>
                            <option value="Microfinance NGOs">Microfinance NGOs</option>
                            <option value="Religious NGOs">Religious NGOs</option>
                            <option value="Research and Policy NGOs">Research and Policy NGOs</option>
                            <option value="Disaster Relief NGOs">Disaster Relief NGOs</option>
                            <option value="Rural Development NGOs">Rural Development NGOs</option>
                            <option value="Youth and Sports NGOs">Youth and Sports NGOs</option>
                            <option value="Women Empowerment NGOs">Women Empowerment NGOs</option>
                        </select>
                    </div>
                    <div>
                        <label>Contact No</label>
                        <input
                            type="text"
                            name="contactNo"
                            value={ngoData.contactNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Logo</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>ID Proof</label>
                        <input
                            type="file"
                            name="idProof"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Create NGO</button>
                </form>
            </div>
        </>
    );
}
