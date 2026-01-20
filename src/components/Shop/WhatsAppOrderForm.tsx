import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from '../../context/CartContext';

interface WhatsAppOrderFormProps {
    open: boolean;
    onClose: () => void;
}

const WhatsAppOrderForm: React.FC<WhatsAppOrderFormProps> = ({ open, onClose }) => {
    const { items, cartTotal } = useCart();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ name: false, phone: false });

    const validate = () => {
        const newErrors = {
            name: !name.trim(),
            phone: !phone.trim(),
        };
        setErrors(newErrors);
        return !newErrors.name && !newErrors.phone;
    };

    const handleOrder = () => {
        if (!validate()) return;

        // Construct the message
        let message = "Bonjour, je souhaite commander:\n";
        items.forEach(item => {
            message += `• ${item.name} x${item.quantity} - ${item.price}\n`;
        });
        message += `\nTotal: ${cartTotal.toLocaleString()} Fcfa\n\n`;
        message += "Mes informations:\n";
        message += `Nom: ${name}\n`;
        message += `Téléphone: ${phone}`;

        // Encode and redirect
        const encodedMessage = encodeURIComponent(message);
        // Replace with the actual business phone number
        const phoneNumber = "237690000000"; // Placeholder, should be configurable
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Finaliser la commande
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                    <TextField
                        label="Nom"
                        required
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        helperText={errors.name ? "Le nom est obligatoire" : ""}
                    />
                    <TextField
                        label="Téléphone"
                        required
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                        helperText={errors.phone ? "Le téléphone est obligatoire" : ""}
                    />

                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                            Votre commande:
                        </Typography>
                        <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: 'text.secondary' }}>
                            {"Bonjour, je souhaite commander:\n"}
                            {items.map(item => `• ${item.name} x${item.quantity} - ${item.price}\n`)}
                            {`\nTotal: ${cartTotal.toLocaleString()} Fcfa`}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Annuler
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOrder}
                    startIcon={<WhatsAppIcon />}
                    sx={{ fontWeight: 'bold', color: 'white' }}
                >
                    Commander sur WhatsApp
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WhatsAppOrderForm;
