import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import NewDelivery from './pages/admin/NewDelivery';
import GalleryManagement from './pages/admin/GalleryManagement';
import ClientGalleryView from './pages/client/ClientGalleryView';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Shop/CartDrawer';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <Router>
                    {/* Client Gallery View - No Layout */}
                    <Routes>
                        <Route path="/g/:uuid" element={<ClientGalleryView />} />

                        {/* Main Site with Layout */}
                        <Route
                            path="/*"
                            element={
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/portfolio" element={<Portfolio />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/blog" element={<Blog />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />

                                        {/* Admin Routes */}
                                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                        <Route path="/admin/new-delivery" element={<NewDelivery />} />
                                        <Route path="/admin/gallery/:uuid" element={<GalleryManagement />} />
                                    </Routes>
                                </Layout>
                            }
                        />
                    </Routes>
                    <CartDrawer />
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
