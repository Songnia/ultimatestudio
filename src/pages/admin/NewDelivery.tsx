import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';
import DualUploadZone from '../../components/Delivery/DualUploadZone';
import ShareDialog from '../../components/Delivery/ShareDialog';
import { galleryService } from '../../services/galleryService';
import type { GalleryImage } from '../../types/gallery';

const NewDelivery: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [createdUuid, setCreatedUuid] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [zipUploading, setZipUploading] = useState(false);
    const [zipProgress, setZipProgress] = useState(0);
    const [imagesUploading, setImagesUploading] = useState(false);
    const [imagesProgress, setImagesProgress] = useState(0);

    const handleImagesSelected = (files: File[]) => {
        setImages(files);
        // Simulate upload progress
        setImagesUploading(true);
        setImagesProgress(0);
        const interval = setInterval(() => {
            setImagesProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setImagesUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    const handleZipSelected = (files: File[]) => {
        if (files.length > 0) {
            setZipFile(files[0]);
            // Simulate upload progress
            setZipUploading(true);
            setZipProgress(0);
            const interval = setInterval(() => {
                setZipProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setZipUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    const handleSave = () => {
        if (!title.trim()) {
            setSnackbarMessage('Veuillez entrer un titre');
            setSnackbarOpen(true);
            return;
        }

        if (images.length === 0) {
            setSnackbarMessage('Veuillez ajouter au moins une image');
            setSnackbarOpen(true);
            return;
        }

        setUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            // Create mock image URLs (In production, these would be uploaded to a server)
            const mockImages: Omit<GalleryImage, 'isLiked'>[] = images.map((file, index) => ({
                id: `img-${Date.now()}-${index}`,
                filename: file.name,
                url: URL.createObjectURL(file), // In production, this would be a server URL
            }));

            // Create mock ZIP URL
            const mockZipUrl = zipFile ? URL.createObjectURL(zipFile) : '#';
            const zipSize = zipFile ? `${(zipFile.size / (1024 * 1024)).toFixed(2)} MB` : '0 MB';

            const newGallery = galleryService.createGallery({
                title,
                description,
                images: mockImages,
                zipFileUrl: mockZipUrl,
                zipFileSize: zipSize,
            });

            setCreatedUuid(newGallery.uuid);
            setUploading(false);
            setShareDialogOpen(true);
        }, 1500);
    };

    const handleDialogClose = () => {
        setShareDialogOpen(false);
        navigate('/admin/dashboard');
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{ mb: 2 }}
                >
                    Retour
                </Button>

                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Nouvelle Livraison
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Créez une galerie photo pour partager avec vos clients
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Stack spacing={3}>
                    {/* Title */}
                    <TextField
                        fullWidth
                        label="Titre de l'événement"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Mariage Alice & Bob"
                        required
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Une brève description de l'événement..."
                    />

                    {/* Upload Zone A - Images */}
                    <Box>
                        <DualUploadZone
                            title="Zone A: Images JPG"
                            subtitle="Glissez vos photos ici ou cliquez pour sélectionner (format JPG, PNG)"
                            acceptedTypes="image/jpeg,image/jpg,image/png"
                            multiple={true}
                            onFilesSelected={handleImagesSelected}
                            uploading={imagesUploading}
                            uploadProgress={imagesProgress}
                        />
                        {images.length > 0 && !imagesUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {images.length} image(s) sélectionnée(s)
                            </Typography>
                        )}
                    </Box>

                    {/* Upload Zone B - ZIP */}
                    <Box>
                        <DualUploadZone
                            title="Zone B: Fichier ZIP (optionnel)"
                            subtitle="Package haute résolution pour téléchargement (format ZIP)"
                            acceptedTypes=".zip"
                            multiple={false}
                            onFilesSelected={handleZipSelected}
                            uploading={zipUploading}
                            uploadProgress={zipProgress}
                        />
                        {zipFile && !zipUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {zipFile.name} ({(zipFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/dashboard')}
                            disabled={uploading}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={uploading}
                            sx={{ fontWeight: 'bold' }}
                        >
                            {uploading ? 'Enregistrement...' : 'Enregistrer & Partager'}
                        </Button>
                    </Box>
                </Stack>
            </Box>

            {/* Share Dialog */}
            <ShareDialog
                open={shareDialogOpen}
                onClose={handleDialogClose}
                uuid={createdUuid}
            />

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="warning" variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewDelivery;
