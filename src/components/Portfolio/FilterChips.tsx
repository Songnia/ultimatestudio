import React from 'react';
import { Box, Chip, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const categories = [
    'All Work',
    'Mariages',
    'Grossesse',
    'Bébés & Enfants',
    'Corporate',
    'Events',
    'Studio',
];

const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: '8px',
    height: '36px',
    fontWeight: 500,
    '&.MuiChip-filled': {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.text.primary,
        },
    },
    '&.MuiChip-outlined': {
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.text.primary,
        },
    },
}));

interface FilterChipsProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <Box
            sx={{
                overflowX: 'auto',
                pb: 2,
                display: 'flex',
                gap: { xs: 1, sm: 1.5 },
                px: 0,
                '&::-webkit-scrollbar': {
                    height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '3px',
                },
            }}
        >
            {categories.map((cat) => (
                <StyledChip
                    key={cat}
                    label={cat}
                    variant={selectedCategory === cat ? 'filled' : 'outlined'}
                    icon={selectedCategory === cat ? <CheckIcon style={{ color: 'white' }} /> : undefined}
                    onClick={() => onSelectCategory(cat)}
                    clickable
                    sx={{ minWidth: 'fit-content' }}
                />
            ))}
        </Box>
    );
};

export default FilterChips;
