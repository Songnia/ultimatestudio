import React from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import ProductCard from '../components/Shop/ProductCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const categories = ['All', 'Prints', 'Frames', 'Goodies', 'Second-Hand'];

const mockProducts = [
    { id: 1, name: 'Professional Print A4', price: '$45.00', purchaseType: 'whatsapp' as const, category: 'Prints' },
    { id: 2, name: 'Gallery Frame Black', price: '$89.00', purchaseType: 'whatsapp' as const, category: 'Frames' },
    { id: 3, name: 'Film Roll Pack', price: '$25.00', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/film-roll', category: 'Goodies' },
    { id: 4, name: 'Vintage Camera Lens', price: '$120.00', purchaseType: 'whatsapp' as const, category: 'Second-Hand' },
    { id: 5, name: 'Studio Lighting Kit', price: '$350.00', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/lighting-kit', category: 'Goodies' },
    { id: 6, name: 'Matte Photo Paper', price: '$30.00', purchaseType: 'whatsapp' as const, category: 'Prints' },
    { id: 7, name: 'Tripod Stand', price: '$75.00', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/tripod', category: 'Goodies' },
    { id: 8, name: 'Lens Cleaning Kit', price: '$15.00', purchaseType: 'whatsapp' as const, category: 'Goodies' },
];

import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const { cartCount, openCart } = useCart();

    const filteredProducts = selectedCategory === 'All'
        ? mockProducts
        : mockProducts.filter(product => product.category === selectedCategory);

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: { xs: 3, md: 6 },
                px: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Box sx={{ mb: { xs: 3, md: 5 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
                        }}
                    >
                        Shop Products
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Blueprint Mode / v1.0
                    </Typography>
                </Box>
            </Box>

            {/* Filters */}
            <Box
                sx={{
                    display: 'flex',
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 3, md: 5 },
                    overflowX: 'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px',
                    },
                }}
            >
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        onClick={() => setSelectedCategory(cat)}
                        variant={selectedCategory === cat ? 'filled' : 'outlined'}
                        color={selectedCategory === cat ? 'primary' : 'default'}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            px: 1,
                            height: '40px',
                            fontSize: '0.9rem',
                            borderWidth: selectedCategory === cat ? 0 : 1,
                            '&:hover': {
                                backgroundColor: selectedCategory === cat ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                            },
                        }}
                    />
                ))}
            </Box>

            {/* Product Grid using CSS Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)', // 2 columns on mobile
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: { xs: 2, sm: 3, md: 4 },
                    pb: { xs: 8, md: 4 },
                }}
            >
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>

            {/* Checkout FAB */}
            <Box sx={{ position: 'fixed', bottom: { xs: 16, md: 32 }, right: { xs: 16, md: 32 }, zIndex: 1000 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingBagIcon />}
                    onClick={openCart}
                    sx={{
                        borderRadius: 3,
                        px: { xs: 2, md: 3 },
                        py: 2,
                        fontWeight: 'bold',
                        boxShadow: 4,
                        border: '2px solid',
                        borderColor: 'text.primary',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                >
                    Checkout ({cartCount})
                </Button>
            </Box>
        </Container>
    );
};

export default Shop;
