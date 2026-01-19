import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import shootingImage from '/shooting_service_composition_1768795530003.png';
import postProductionImage from '/postproduction_service_composition_1768795547698.png';
import formationImage from '/formation_service_composition_1768795564721.png';
import locationImage from '/location_service_composition_1768795581894.png';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface Service {
    id: number;
    title: string;
    description: string;
    details: string[];
    image: string;
    ctaText: string;
    whatsappMessage: string;
}

const services: Service[] = [
    {
        id: 1,
        title: 'Le Shooting (Prise de vue)',
        description: 'Nous capturons vos moments précieux avec professionnalisme et créativité',
        details: [
            'Portraits (professionnels, famille)',
            'Mode & Lookbook',
            'Produit (packshot)',
            'Événementiel (mariage, corporate)',
        ],
        image: shootingImage,
        ctaText: 'Je souhaite réserver un shooting',
        whatsappMessage: 'Bonjour, je souhaite réserver un shooting.',
    },
    {
        id: 2,
        title: 'La Post-production',
        description: 'Sublimez vos images grâce à notre expertise en retouche',
        details: [
            'Retouche photo avancée',
            'Détourage professionnel',
            'Restauration de vieilles photos',
            'Correction colorimétrique',
        ],
        image: postProductionImage,
        ctaText: 'Je souhaite confier mes photos pour retouche',
        whatsappMessage: 'Bonjour, je souhaite confier mes photos pour retouche.',
    },
    {
        id: 3,
        title: 'La Formation',
        description: 'Apprenez les techniques professionnelles de la photographie',
        details: [
            'Stages photo intensifs',
            'Cours de base pour débutants',
            'Masterclass avancée',
            'Formation en studio',
        ],
        image: formationImage,
        ctaText: 'Je souhaite bénéficier d\'une formation',
        whatsappMessage: 'Bonjour, je souhaite bénéficier d\'une formation.',
    },
    {
        id: 4,
        title: 'La Location',
        description: 'Louez notre studio et notre matériel professionnel',
        details: [
            'Location de plateau photo',
            'Matériel haut de gamme',
            'Éclairage professionnel',
            'Tarifs horaires flexibles',
        ],
        image: locationImage,
        ctaText: 'Je souhaite louer le studio',
        whatsappMessage: 'Bonjour, je souhaite louer le studio.',
    },
];

const ServicesSection: React.FC = () => {
    const handleWhatsAppClick = (message: string) => {
        const phoneNumber = '237690000000'; // Replace with actual number if known, or keep placeholder
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Section Header */}
                <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        Nos Activités
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                        Des services complets pour tous vos besoins en photographie
                    </Typography>
                </Box>

                {/* Services Grid - Alternating Layout */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 10 } }}>
                    {services.map((service, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <Box
                                key={service.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        md: isEven ? 'row' : 'row-reverse',
                                    },
                                    alignItems: 'center',
                                    gap: { xs: 3, md: 6 },
                                }}
                            >
                                {/* Image Side */}
                                <Box
                                    sx={{
                                        flex: '0 0 auto',
                                        width: { xs: '100%', md: '45%' },
                                        height: { xs: 250, md: 350 },
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        boxShadow: 3,
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Text Content Side */}
                                <Box sx={{ flex: '1 1 auto', width: { xs: '100%', md: '55%' } }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: 2,
                                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                        }}
                                    >
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ mb: 3, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
                                    >
                                        {service.description}
                                    </Typography>

                                    <Box component="ul" sx={{ pl: 2, m: 0, mb: 3 }}>
                                        {service.details.map((detail, idx) => (
                                            <Typography
                                                key={idx}
                                                component="li"
                                                variant="body2"
                                                sx={{
                                                    mb: 1,
                                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {detail}
                                            </Typography>
                                        ))}
                                    </Box>

                                    {/* CTA Link */}
                                    <Link
                                        component="button"
                                        onClick={() => handleWhatsAppClick(service.whatsappMessage)}
                                        underline="none"
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: 'text.primary',
                                            backgroundColor: 'rgba(255, 215, 0, 0.3)', // Transparent yellow
                                            px: 1,
                                            py: 0.5,
                                            fontStyle: 'italic',
                                            fontWeight: 'medium',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 215, 0, 0.6)',
                                            }
                                        }}
                                    >
                                        <WhatsAppIcon fontSize="small" />
                                        {service.ctaText}
                                    </Link>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
};

export default ServicesSection;
