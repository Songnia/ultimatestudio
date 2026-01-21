import type { Gallery, GalleryImage, CreateGalleryData } from '../types/gallery';
import { storageService, GALLERIES_KEY } from './storageService';

// Generate a simple UUID-like string
const generateUUID = (): string => {
    return Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 4);
};

// Get current date in ISO format
const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const galleryService = {
    // Get all galleries
    getAllGalleries: (): Gallery[] => {
        return storageService.get<Gallery[]>(GALLERIES_KEY, []);
    },

    // Get gallery by UUID
    getGalleryByUUID: (uuid: string): Gallery | null => {
        const galleries = storageService.get<Gallery[]>(GALLERIES_KEY, []);
        return galleries.find(g => g.uuid === uuid) || null;
    },

    // Create new gallery
    createGallery: (data: CreateGalleryData): Gallery => {
        const galleries = storageService.get<Gallery[]>(GALLERIES_KEY, []);

        const newGallery: Gallery = {
            uuid: generateUUID(),
            title: data.title,
            description: data.description,
            createdAt: getCurrentDate(),
            images: data.images.map(img => ({ ...img, isLiked: false })),
            zipFileUrl: data.zipFileUrl,
            zipFileSize: data.zipFileSize,
            pin: data.pin,
        };

        galleries.push(newGallery);
        storageService.set(GALLERIES_KEY, galleries);

        return newGallery;
    },

    // Delete gallery
    deleteGallery: (uuid: string): void => {
        const galleries = storageService.get<Gallery[]>(GALLERIES_KEY, []);
        const filtered = galleries.filter(g => g.uuid !== uuid);
        storageService.set(GALLERIES_KEY, filtered);
    },

    // Toggle image like
    toggleImageLike: (uuid: string, imageId: string): void => {
        const galleries = storageService.get<Gallery[]>(GALLERIES_KEY, []);
        const gallery = galleries.find(g => g.uuid === uuid);

        if (gallery) {
            const image = gallery.images.find(img => img.id === imageId);
            if (image) {
                image.isLiked = !image.isLiked;
                storageService.set(GALLERIES_KEY, galleries);
            }
        }
    },

    // Get selected (liked) images
    getSelectedImages: (uuid: string): GalleryImage[] => {
        const gallery = galleryService.getGalleryByUUID(uuid);
        return gallery ? gallery.images.filter(img => img.isLiked) : [];
    },

    // Get stats for a gallery
    getGalleryStats: (uuid: string): { totalImages: number; likedCount: number } => {
        const gallery = galleryService.getGalleryByUUID(uuid);
        if (!gallery) return { totalImages: 0, likedCount: 0 };

        return {
            totalImages: gallery.images.length,
            likedCount: gallery.images.filter(img => img.isLiked).length,
        };
    },
};
