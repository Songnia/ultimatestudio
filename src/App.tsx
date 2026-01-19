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
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Shop/CartDrawer';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Layout>
                    <CartDrawer />
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
