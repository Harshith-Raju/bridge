// src/components/CompanyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
 const fetchCompanies = async () => {
            const response = await axios.get('http://localhost:5000/api/companies');
            setCompanies(response.data);
        };
        fetchCompanies();
    }, []);

    return (
        <div>
            <h2>Registered Companies</h2>
            <ul>
                {companies.map((company) => (
                    <li key={company._id}>
                        <h3>{company.name}</h3>
                        <p>{company.description}</p>
                        <p>Owner: {company.owner}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;