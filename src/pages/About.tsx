import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import photographerImage from '../assets/promoteur/promoteur-1.png';

const About: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8, alignItems: 'center' }}>
                    {/* Image Column */}
                    <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 40%' }, width: '100%', position: 'relative' }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: -20,
                                width: '100%',
                                height: '100%',
                                border: '2px solid',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                zIndex: 0,
                            }}
                        />
                        <Paper
                            elevation={4}
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                zIndex: 1,
                                aspectRatio: '3/4',
                            }}
                        >
                            <img
                                src={photographerImage}
                                alt="Le Promoteur"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Paper>
                    </Box>

                    {/* Content Column */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2 }}>
                            À PROPOS
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 1, mb: 4 }}>
                            Le Promoteur
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Biographie
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                Passionné par l'image depuis plus de 10 ans, j'ai fondé Ultimate Studio avec une vision simple : capturer l'authenticité. Mon parcours m'a mené de la photographie de rue aux studios de mode, forgeant un style unique qui mêle spontanéité et maîtrise technique.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                J'ai eu le privilège de travailler avec des marques prestigieuses et de documenter des centaines d'histoires d'amour et de réussite. Aujourd'hui, je mets cette expérience au service de vos projets.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Ma Philosophie
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                "Chaque image doit raconter une histoire."
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                Mon approche est basée sur l'écoute et la connexion. Je ne me contente pas de prendre une photo, je cherche à comprendre qui vous êtes pour le révéler à travers mon objectif. Que ce soit pour un portrait corporate ou un mariage, je privilégie la lumière naturelle et les émotions vraies, tout en apportant une touche éditoriale soignée en post-production.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default About;
