import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import BlogCard from '../components/Blog/BlogCard';

const categories = ['All', 'News', 'Tutorials', 'Promos', 'Behind the Scenes'];

const mockArticles = [
    {
        id: 1,
        title: 'FLASH SALE: 1000f Promo for All Sessions',
        excerpt: 'Limited time offer! Get our professional photography services at an unbeatable price. Book now and save on weddings, events, and corporate shoots.',
        date: 'Jan 15, 2026',
        author: 'Ultimata Studios',
        category: 'Promos',
    },
    {
        id: 2,
        title: 'Behind the Lens: Our Latest Wedding Shoot',
        excerpt: 'Take a peek behind the scenes of our recent beach wedding photoshoot. Learn about our process and the magic we create.',
        date: 'Jan 10, 2026',
        author: 'John Doe',
        category: 'Behind the Scenes',
    },
    {
        id: 3,
        title: 'Photography Tips: Lighting for Perfect Portraits',
        excerpt: 'Master the art of portrait lighting with these professional tips. From natural light to studio setups, we cover it all.',
        date: 'Jan 5, 2026',
        author: 'Jane Smith',
        category: 'Tutorials',
    },
    {
        id: 4,
        title: 'New Equipment: Sony A7R V Review',
        excerpt: 'Our hands-on review of the latest Sony mirrorless camera. Is it worth the upgrade? Find out what we think.',
        date: 'Dec 28, 2025',
        author: 'Tech Team',
        category: 'News',
    },
    {
        id: 5,
        title: 'Client Spotlight: Marie & Thomas Wedding',
        excerpt: 'A beautiful love story captured through our lens. See highlights from this stunning ceremony and celebration.',
        date: 'Dec 20, 2025',
        author: 'Ultimata Studios',
        category: 'Behind the Scenes',
    },
    {
        id: 6,
        title: 'Holiday Special: Gift Cards Now Available',
        excerpt: 'Give the gift of memories this holiday season. Our gift cards are perfect for any occasion and never expire.',
        date: 'Dec 15, 2025',
        author: 'Ultimata Studios',
        category: 'Promos',
    },
];

const Blog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredArticles = selectedCategory === 'All'
        ? mockArticles
        : mockArticles.filter(article => article.category === selectedCategory);

    return (
        <Box sx={{ py: { xs: 3, md: 6 } }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        Latest News & Updates
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                        Stay updated with our latest projects, photography tips, special offers, and behind-the-scenes stories.
                    </Typography>
                </Box>

                {/* Category Filters */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 1.5, sm: 2 },
                        mb: { xs: 4, md: 6 },
                        overflowX: 'auto',
                        pb: 1,
                        justifyContent: { xs: 'flex-start', md: 'center' },
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

                {/* Blog Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 3, md: 4 },
                        pb: { xs: 4, md: 8 },
                    }}
                >
                    {filteredArticles.map((article) => (
                        <BlogCard key={article.id} article={article} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Blog;
