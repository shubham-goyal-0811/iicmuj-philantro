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
        logo: '',
        idProof: '',
    });

    const handleChange = (e) => {
        setNgoData({
            ...ngoData,
            [e.target.name]: e.target.value,
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
        formData.append('logo', ngoData.logo);
        formData.append('idProof', ngoData.idProof);
    
        try {
            const response = await axios.post(
              'http://localhost:8000/api/v1/ngos/register',
              ngoData,
              { withCredentials: true }
            );
            console.log('NGO created successfully:', response.data);
          } catch (error) {
            console.error('Error creating NGO:', error);
            alert('Failed to create NGO. Please check your setup.');
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
                        <label>Logo (URL)</label>
                        <input
                            type="file"
                            name="logo"
                            value={ngoData.logo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>ID Proof</label>
                        <input
                            type="file"
                            name="idProof"
                            value={ngoData.idProof}
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
