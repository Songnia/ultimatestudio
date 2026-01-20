import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo/logo2.svg';

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
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Box
                component={RouterLink}
                to="/"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    textDecoration: 'none'
                }}
            >
                <img src={logo} alt="Ultimate Studio Logo" style={{ height: '40px' }} />
            </Box>
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
                        alignItems: 'center',
                        position: 'absolute',
                        left: { xs: '50%', md: '10%' },
                        transform: { xs: 'translateX(-50%)', md: 'none' },
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <img src={logo} alt="Ultimate Studio Logo" style={{ height: isMobile ? '32px' : '45px' }} />
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
