import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount, openCart } = useCart();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Blog', path: '/blog' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                ULTIMATE STUDIO
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left: Hamburger (Mobile) or Spacer (Desktop) */}
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box sx={{ width: 48 }} />
                )}

                {/* Center: Logo */}
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Ultimate Studio
                    </Typography>
                    <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' }, letterSpacing: 2, color: 'text.secondary' }}>
                        BLUEPRINT MODE V1.0
                    </Typography>
                </Box>

                {/* Right: Links (Desktop) & Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
                            {navItems.map((item) => (
                                <Button key={item.label} component={RouterLink} to={item.path} color="inherit" sx={{ fontWeight: 500 }}>
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={openCart}>
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingBagIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
