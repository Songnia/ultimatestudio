import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
        if (errors[field as keyof typeof errors]) {
            setErrors({ ...errors, [field]: false });
        }
    };

    const validate = () => {
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
            subject: !formData.subject.trim(),
            message: !formData.message.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Format message as email
        let whatsappMessage = `Nouveau message de contact\n\n\n`;
        whatsappMessage += `De: ${formData.name}\n`;
        whatsappMessage += `Email: ${formData.email}\n`;
        whatsappMessage += `Sujet: ${formData.subject}\n\n\n`;
        whatsappMessage += `Message:\n${formData.message}`;

        // Encode and redirect to WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = "237690000000"; // Replace with actual business number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: { xs: 4, md: 8 },
                px: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 } }}>
                {/* Contact Info */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 40%' } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
                        }}
                    >
                        Get in Touch
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <LocationOnIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    123 Studio Lane, Creative District<br />
                                    Abidjan, Côte d'Ivoire
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <PhoneIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    +225 07 00 00 00 00
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <EmailIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    hello@ultimatestudio.com
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Contact Form */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 60%' } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 4 },
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Send us a message
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    required
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    error={errors.name}
                                    helperText={errors.name ? "Le nom est obligatoire" : ""}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    error={errors.email}
                                    helperText={errors.email ? "Email valide requis" : ""}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                label="Subject"
                                variant="outlined"
                                required
                                value={formData.subject}
                                onChange={handleChange('subject')}
                                error={errors.subject}
                                helperText={errors.subject ? "Le sujet est obligatoire" : ""}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                required
                                value={formData.message}
                                onChange={handleChange('message')}
                                error={errors.message}
                                helperText={errors.message ? "Le message est obligatoire" : ""}
                            />
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                fullWidth
                                onClick={handleSubmit}
                                startIcon={<WhatsAppIcon />}
                                sx={{ fontWeight: 'bold', color: 'white' }}
                            >
                                Envoyer sur WhatsApp
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Contact;
