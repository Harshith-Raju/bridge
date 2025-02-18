import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, Avatar } from '@mui/material';
import axios from 'axios';
import {
    Person, Email, Phone, Work, LocationOn, Description, LinkedIn, GitHub, Twitter, Instagram
} from '@mui/icons-material';

const ProfileForm = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        username: '',
        designation: '',
        company: '',
        location: '',
        contactEmail: '',
        phoneNumber: '',
        about: {
            shortBio: '',
            missionStatement: '',
            coreValues: [],
        },
        professionalDetails: {
            currentRole: '',
            companyName: '',
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
        profilePic: null, // Add profilePic to the state
    });

    const [profilePicPreview, setProfilePicPreview] = useState(null); // State for profile picture preview

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
            setProfileData({ ...profileData, profilePic: file }); // Save the file in state
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in profileData) {
            if (key === 'profilePic' && profileData[key]) {
                formData.append(key, profileData[key]); // Append the file
            } else if (typeof profileData[key] === 'object') {
                formData.append(key, JSON.stringify(profileData[key])); // Append nested objects as JSON
            } else {
                formData.append(key, profileData[key]); // Append other fields
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });
            console.log('Profile saved:', response.data);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const icons = [
        <Person key="person" />,
        <Email key="email" />,
        <Phone key="phone" />,
        <Work key="work" />,
        <LocationOn key="location" />,
        <Description key="description" />,
        <LinkedIn key="linkedin" />,
        <GitHub key="github" />,
        <Twitter key="twitter" />,
        <Instagram key="instagram" />
    ];

    const getRandomColor = () => {
        // Generate brighter colors by limiting the range of RGB values
        const r = Math.floor(Math.random() * 128) + 128; // 128-255
        const g = Math.floor(Math.random() * 128) + 128; // 128-255
        const b = Math.floor(Math.random() * 128) + 128; // 128-255
        return `rgb(${r}, ${g}, ${b})`;
    };

    const generateRandomIcons = (count) => {
        return Array.from({ length: count }, (_, index) => {
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const randomTop = Math.random() * 100; // Random top position
            const randomLeft = Math.random() * 100; // Random left position
            const randomAnimationDuration = Math.random() * 5 + 5; // Random duration between 5s and 10s
            const randomColor = getRandomColor(); // Get a random bright color
            return (
                <Box
                    key={index}
                    sx={{
                        position: 'fixed', // Use fixed positioning to place icons outside the container
                        top: `${randomTop}vh`,
                        left: `${randomLeft}vw`,
                        opacity: 0.7,
                        fontSize: '5rem',
                        color: randomColor, // Apply random bright color
                        animation: `float ${randomAnimationDuration}s ease-in-out infinite`,
                        zIndex: 0, // Ensure icons are behind the profile block
                    }}
                >
                    {icon}
                </Box>
            );
        });
    };

    return (
        <Box
            sx={{
                backgroundColor: '#143645', // Updated background color
                minHeight: '100vh',
                padding: '20px 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Icons (Outside the UI Box) */}
            {generateRandomIcons(20)} {/* Generate 20 random icons */}

            {/* Profile Block */}
            <Container
                sx={{
                    position: 'relative',
                    zIndex: 2, // Ensure the profile block is above the icons
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                    Create Your Profile
                </Typography>
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '20px',
                        borderRadius: '8px',
                        position: 'relative',
                        zIndex: 2, // Ensure the profile block is above the icons
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {/* Profile Picture Upload */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            <Avatar
                                src={profilePicPreview || "https://via.placeholder.com/150"} // Show preview or placeholder
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
                                { label: "Company", name: "company", icon: <Work /> },
                                { label: "Location", name: "location", icon: <LocationOn /> },
                                { label: "Contact Email", name: "contactEmail", icon: <Email />, required: true },
                                { label: "Phone Number", name: "phoneNumber", icon: <Phone /> },
                                { label: "Short Bio", name: "about.shortBio", icon: <Description />, multiline: true, rows: 4 },
                            ].map((field, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Typography sx={{ color: 'white', marginBottom: '8px' }}>{field.label}</Typography>
                                    <TextField
                                        fullWidth
                                        name={field.name}
                                        value={profileData[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                        placeholder={`e.g., ${field.label}`}
                                        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                                        InputProps={{
                                            startAdornment: field.icon ? React.cloneElement(field.icon, { sx: { marginRight: 1 } }) : null,
                                        }}
                                        multiline={field.multiline}
                                        rows={field.rows}
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

            {/* Floating Animation CSS */}
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0); }
                    }
                `}
            </style>
        </Box>
    );
};

export default ProfileForm;