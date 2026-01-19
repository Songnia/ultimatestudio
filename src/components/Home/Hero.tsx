import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

import hero1 from '../../assets/hero/hero-1.jpg';
import hero2 from '../../assets/hero/hero-2.jpg';
import hero3 from '../../assets/hero/hero-3.jpg';

const slides = [
    {
        id: 1,
        image: hero1,
        title: "Capturing Life's",
        highlight: "Moments",
        description: "Professional photography for weddings, events, and corporate needs. Book your session today.",
        miniDesc: "CHOOSE US TO IMMORTALIZE YOUR PRECIOUS MOMENTS IN PRICELESS AND IMMERSIVE WORKS OF VISUAL ART"
    },
    {
        id: 2,
        image: hero2,
        title: "Reveal Your",
        highlight: "True Self",
        description: "Studio portraits that tell your unique story with style and elegance.",
        miniDesc: "EXPERT LIGHTING AND COMPOSITION TO BRING OUT THE BEST VERSION OF YOU"
    },
    {
        id: 3,
        image: hero3,
        title: "Unforgettable",
        highlight: "Events",
        description: "We capture the energy and emotion of your special occasions.",
        miniDesc: "FROM INTIMATE GATHERINGS TO GRAND CELEBRATIONS, WE DOCUMENT EVERY DETAIL"
    }
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: { xs: '600px', md: '800px', lg: '90vh' } }}>
            {/* Background Carousel */}
            {slides.map((slide, index) => (
                <Box
                    key={slide.id}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'right center',
                        opacity: currentSlide === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Gradient Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 100%)',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: { xs: 3, sm: 4, md: 6 },
                }}
            >
                <Box sx={{ maxWidth: '800px', mb: 8 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            color: 'white',
                            mb: { xs: 2, md: 3 },
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                            lineHeight: 1.1,
                        }}
                    >
                        Capturing Life's <br />
                        <Box component="span" sx={{ color: 'primary.main', display: 'inline-block' }}>
                            Moments
                        </Box>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: { xs: 4, md: 6 },
                            maxWidth: '600px',
                            color: 'grey.300',
                            fontWeight: 400,
                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                            lineHeight: 1.6,
                        }}
                    >
                        Professional photography for weddings, events, and corporate needs. Book your session today.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            component={RouterLink}
                            to="/portfolio"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                                fontWeight: 'bold',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                boxShadow: 'none',
                                '&:hover': { boxShadow: 'none', transform: 'translateY(-2px)' },
                                transition: 'all 0.3s'
                            }}
                        >
                            View Portfolio
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={RouterLink}
                            to="/contact"
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                                fontWeight: 'bold',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    backgroundColor: 'rgba(242, 242, 13, 0.1)'
                                }
                            }}
                        >
                            Book a Session
                        </Button>
                    </Box>
                </Box>

                {/* Bottom Right Controls & Mini Desc */}
                {/* Bottom Left Controls */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 30, md: 50 },
                        left: { xs: 24, sm: 32, md: 48 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 2
                    }}
                >
                    {/* Indicators */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {slides.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                sx={{
                                    width: currentSlide === index ? 40 : 20,
                                    height: 4,
                                    backgroundColor: currentSlide === index ? 'primary.main' : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    borderRadius: 2
                                }}
                            />
                        ))}
                    </Box>
                    {/* Arrows */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Bottom Right Mini Desc */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 30, md: 50 },
                        right: { xs: 24, sm: 32, md: 48 },
                        maxWidth: '300px',
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.75rem',
                            letterSpacing: 1,
                            lineHeight: 1.6,
                            borderRight: '2px solid',
                            borderColor: 'primary.main',
                            pr: 2,
                            textAlign: 'right',
                            display: 'block'
                        }}
                    >
                        {slides[currentSlide].miniDesc}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;
