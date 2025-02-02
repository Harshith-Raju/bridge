// src/components/RegisterCompany.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterCompany = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/companies', { name, description, owner });
        setName('');
        setDescription('');
        setOwner('');
        alert('Company registered successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} required />
            <button type="submit">Register Company</button>
        </form>
    );
};

export default RegisterCompany;