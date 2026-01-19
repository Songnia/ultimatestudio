import React from 'react';
import { Box, Container, Typography, Avatar, Paper } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
    {
        id: 1,
        name: 'Sarah & Julien',
        role: 'Mariage',
        content: "Ultimate Studio a su capturer l'essence même de notre mariage. Les photos sont naturelles, lumineuses et pleines d'émotion. Un grand merci à toute l'équipe pour leur professionnalisme !",
        rating: 5,
        avatar: 'https://source.unsplash.com/random/100x100?couple',
    },
    {
        id: 2,
        name: 'Marc Dubois',
        role: 'Directeur Marketing, TechCorp',
        content: "Nous avons fait appel à eux pour nos portraits d'entreprise et le résultat est impeccable. Le studio est moderne et l'équipe met tout le monde à l'aise. Je recommande vivement.",
        rating: 5,
        avatar: 'https://source.unsplash.com/random/100x100?man',
    },
    {
        id: 3,
        name: 'Elodie Martin',
        role: 'Shooting Mode',
        content: "Une expérience incroyable ! Le photographe a su me guider tout au long de la séance. Les retouches sont subtiles et mettent vraiment en valeur. J'adore mon book !",
        rating: 5,
        avatar: 'https://source.unsplash.com/random/100x100?woman',
    },
];

const TestimonialsSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'grey.50' }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2 }}>
                        TÉMOIGNAGES
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, mb: 2 }}>
                        Ce que disent nos clients
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                        La satisfaction de nos clients est notre plus belle récompense.
                    </Typography>
                </Box>

                {/* Testimonials Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 4,
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <Paper
                            key={testimonial.id}
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                backgroundColor: 'white',
                                border: '1px solid',
                                borderColor: 'divider',
                                position: 'relative',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 4,
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                            <FormatQuoteIcon
                                sx={{
                                    position: 'absolute',
                                    top: 24,
                                    right: 24,
                                    fontSize: 40,
                                    color: 'primary.main',
                                    opacity: 0.2,
                                }}
                            />

                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Typography key={i} component="span" sx={{ color: '#FFD700' }}>★</Typography>
                                ))}
                            </Box>

                            <Typography variant="body1" sx={{ mb: 4, fontStyle: 'italic', lineHeight: 1.6 }}>
                                "{testimonial.content}"
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    sx={{ width: 48, height: 48, border: '2px solid', borderColor: 'primary.main' }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                        {testimonial.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {testimonial.role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;
