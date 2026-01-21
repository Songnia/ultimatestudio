import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Chip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack as BackIcon, Download as DownloadIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { galleryService } from '../../services/galleryService';
import type { Gallery } from '../../types/gallery';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const GalleryManagement: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();
    const [gallery, setGallery] = useState<Gallery | null>(null);

    useEffect(() => {
        if (uuid) {
            const g = galleryService.getGalleryByUUID(uuid);
            setGallery(g);
        }
    }, [uuid]);

    const handleExportSelections = () => {
        if (!gallery) return;

        const selectedImages = gallery.images.filter(img => img.isLiked);
        const csvContent = 'Filename\n' + selectedImages.map(img => img.filename).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `selections-${gallery.title}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (!gallery) {
        return (
            <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                    Galerie introuvable
                </Typography>
            </Container>
        );
    }

    const selectedCount = gallery.images.filter(img => img.isLiked).length;

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{ mb: 2 }}
                >
                    Retour au dashboard
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {gallery.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {gallery.description}
                        </Typography>
                    </Box>

                    {selectedCount > 0 && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                            onClick={handleExportSelections}
                            sx={{ fontWeight: 'bold' }}
                        >
                            Exporter
                        </Button>
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Chip
                        label={`${gallery.images.length} photos`}
                        sx={{ borderRadius: '8px' }}
                    />
                    <Chip
                        icon={<FavoriteIcon />}
                        label={`${selectedCount} sélectionnées`}
                        color="primary"
                        sx={{ borderRadius: '8px' }}
                    />
                </Box>
            </Box>

            {/* Images Grid */}
            <ResponsiveMasonry
                columnsCountBreakPoints={{
                    350: 1,
                    750: 2,
                    900: 3
                }}
            >
                <Masonry gutter="16px">
                    {gallery.images.map((image) => (
                        <Box
                            key={image.id}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '4px',
                                border: image.isLiked ? '3px solid' : 'none',
                                borderColor: image.isLiked ? 'primary.main' : 'transparent',
                            }}
                        >
                            <img
                                src={image.url}
                                alt={image.filename}
                                style={{ width: '100%', display: 'block' }}
                            />
                            {image.isLiked && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        backgroundColor: 'primary.main',
                                        borderRadius: '50%',
                                        p: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FavoriteIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </Container>
    );
};

export default GalleryManagement;
