import React from 'react';
import { Box, Container, Typography, Card, CardContent, CardActions, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const packages = [
    {
        title: 'Forfait Découverte',
        price: '50.000 FCFA',
        description: 'Idéal pour une première expérience ou des besoins simples.',
        features: [
            '1 Heure de shooting',
            '1 Tenue',
            '5 Photos retouchées HD',
            'Galerie privée en ligne',
        ],
        buttonText: 'Réserver',
        highlight: false,
    },
    {
        title: 'Forfait Premium',
        price: '100.000 FCFA',
        description: 'Notre best-seller pour des souvenirs inoubliables.',
        features: [
            '2 Heures de shooting',
            '3 Tenues',
            '15 Photos retouchées HD',
            'Maquillage inclus',
            'Galerie privée en ligne',
        ],
        buttonText: 'Choisir ce forfait',
        highlight: true,
    },
    {
        title: 'Forfait Ultimate',
        price: '250.000 FCFA',
        description: 'L\'expérience complète pour les professionnels et les grands événements.',
        features: [
            'Demi-journée de shooting',
            'Tenues illimitées',
            '30 Photos retouchées HD',
            'Tous les fichiers sources',
            'Maquillage & Coiffure inclus',
        ],
        buttonText: 'Nous contacter',
        highlight: false,
    },
];

const PricingSection: React.FC = () => {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2 }}>
                        TARIFS
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, mb: 2 }}>
                        Nos Forfaits
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                        Des offres claires et transparentes adaptées à tous vos besoins.
                    </Typography>
                </Box>

                {/* Pricing Cards */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, alignItems: 'end' }}>
                    {packages.map((pkg, index) => (
                        <Box key={index}>
                            <Card
                                elevation={pkg.highlight ? 8 : 1}
                                sx={{
                                    borderRadius: 4,
                                    position: 'relative',
                                    overflow: 'visible',
                                    border: pkg.highlight ? '2px solid' : '1px solid',
                                    borderColor: pkg.highlight ? 'primary.main' : 'divider',
                                    transform: pkg.highlight ? { md: 'scale(1.05)' } : 'none',
                                    zIndex: pkg.highlight ? 2 : 1,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: pkg.highlight ? { md: 'scale(1.08)' } : 'translateY(-8px)',
                                    },
                                }}
                            >
                                {pkg.highlight && (
                                    <Chip
                                        icon={<StarIcon sx={{ color: 'black !important' }} />}
                                        label="Recommandé"
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            top: -16,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontWeight: 'bold',
                                            color: 'black',
                                        }}
                                    />
                                )}
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {pkg.title}
                                    </Typography>
                                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                                        {pkg.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                        {pkg.description}
                                    </Typography>

                                    <List sx={{ textAlign: 'left', mb: 2 }}>
                                        {pkg.features.map((feature, idx) => (
                                            <ListItem key={idx} disablePadding sx={{ mb: 1.5 }}>
                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                    <CheckCircleIcon sx={{ color: pkg.highlight ? 'primary.main' : 'grey.400' }} />
                                                </ListItemIcon>
                                                <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <CardActions sx={{ p: 4, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant={pkg.highlight ? 'contained' : 'outlined'}
                                        color="primary"
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            borderRadius: 2,
                                            boxShadow: pkg.highlight ? '0 8px 16px rgba(242, 242, 13, 0.3)' : 'none',
                                        }}
                                    >
                                        {pkg.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default PricingSection;
