import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, Avatar } from '@mui/material';
import axios from 'axios';
import {
    Person, Email, Phone, Work, Description, LinkedIn, GitHub, Twitter, Instagram
} from '@mui/icons-material';

const ProfileForm = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        username: '',
        designation: '',
        contactEmail: '',
        phoneNumber: '',
        about: {
            shortBio: '',
            missionStatement: '',
            coreValues: [],
        },
        professionalDetails: {
            currentRole: '',
            yearsOfExperience: '',
            industry: '',
            skills: [],
            certifications: [],
            achievements: [],
        },
        socialLinks: {
            linkedIn: '',
            github: '',
            twitter: '',
            instagram: '',
            other: [],
        },
        profilePic: null,
    });

    const [profilePicPreview, setProfilePicPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProfileData({
                ...profileData,
                [parent]: {
                    ...profileData[parent],
                    [child]: value
                }
            });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData({ ...profileData, profilePic: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in profileData) {
            if (key === 'profilePic' && profileData[key]) {
                formData.append(key, profileData[key]);
            } else if (typeof profileData[key] === 'object') {
                formData.append(key, JSON.stringify(profileData[key]));
            } else {
                formData.append(key, profileData[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile saved:', response.data);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#143645',
                minHeight: '100vh',
                padding: '20px 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                    Create Your Profile
                </Typography>
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '20px',
                        borderRadius: '8px',
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                            <Avatar
                                src={profilePicPreview || "https://via.placeholder.com/150"}
                                alt="Profile Picture"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: '10px',
                                    border: '2px solid white',
                                }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                style={{ display: 'none' }}
                                id="profile-pic-upload"
                            />
                            <label htmlFor="profile-pic-upload">
                                <Button variant="contained" component="span">
                                    Upload Profile Picture
                                </Button>
                            </label>
                        </Box>

                        <Grid container spacing={2}>
                            {[
                                { label: "Full Name", name: "fullName", icon: <Person /> },
                                { label: "Username", name: "username", icon: <Person /> },
                                { label: "Designation", name: "designation", icon: <Work /> },
                                { label: "Contact Email", name: "contactEmail", icon: <Email />, required: true },
                                { label: "Phone Number", name: "phoneNumber", icon: <Phone /> },
                                { label: "Short Bio", name: "about.shortBio", icon: <Description />, multiline: true, rows: 4 },
                            ].map((field, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Typography sx={{ color: 'white', marginBottom: '8px' }}>{field.label}</Typography>
                                    <TextField
                                        fullWidth
                                        name={field.name}
                                        value={profileData[field.name.split('.')[0]]?.[field.name.split('.')[1]] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                        placeholder={`Enter ${field.label}`}
                                        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default ProfileForm;