import React, { type ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', m: 0, p: 0 }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, width: '100%', m: 0, p: 0 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
