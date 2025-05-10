import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAddress } from '../context/AddressContext';

const savedAddresses = [
  {
    name: 'Raam Shah',
    street: 'Mumbai, Gokuldham Market, New Shivam Building, 400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    phone: '9038429384',
  },
  {
    name: 'Seeta Mehta',
    street: 'Bandra West, Hill Road, 400050',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400050',
    phone: '9023456789',
  },
];

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSelectedAddress } = useAddress();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation: only alphabets
    const nameRegex = /^[A-Za-z\s]+$/;
    // Zip and Phone validation: only numbers
    const numberRegex = /^[0-9]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    else if (!nameRegex.test(formData.firstName)) newErrors.firstName = 'First Name must contain only letters';

    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    else if (!nameRegex.test(formData.lastName)) newErrors.lastName = 'Last Name must contain only letters';

    if (!formData.street.trim()) newErrors.street = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    if (!formData.zip.trim()) newErrors.zip = 'Zip Code is required';
    else if (!numberRegex.test(formData.zip)) newErrors.zip = 'Zip Code must be numeric';

    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!numberRegex.test(formData.phone)) newErrors.phone = 'Phone Number must be numeric';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDeliverHere = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newAddress = {
      name: `${formData.firstName} ${formData.lastName}`,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      phone: formData.phone,
    };

    setSelectedAddress(newAddress);
    searchParams.set('step', '3');
    navigate(`?${searchParams.toString()}`);
  };

  const handleSelectSavedAddress = (address) => {
    setSelectedAddress(address);
    searchParams.set('step', '3');
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {/* Left: Saved Addresses */}
      <Box sx={{ flex: 1, minWidth: '300px' }}>
        <Typography variant="h6" gutterBottom>Saved Addresses</Typography>
        {savedAddresses.map((address, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ p: 2, mb: 2, cursor: 'pointer', border: '1px solid #ccc' }}
            onClick={() => handleSelectSavedAddress(address)}
          >
            <Typography variant="subtitle1" fontWeight="bold">{address.name}</Typography>
            <Typography variant="body2" gutterBottom>
              {address.street}<br />
              {address.city}, {address.state} {address.zip}
            </Typography>
            <Typography variant="body2">
              <strong>Phone Number:</strong> {address.phone}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Right: New Address Form */}
      <Box sx={{ flex: 1, minWidth: '300px' }}>
        <Typography variant="h6" gutterBottom>Enter New Address</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth label="First Name" name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Last Name" name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Address" name="street"
              value={formData.street}
              onChange={handleInputChange}
              error={!!errors.street}
              helperText={errors.street}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="City" name="city"
              value={formData.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="State/Province/Region" name="state"
              value={formData.state}
              onChange={handleInputChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Zip / Postal Code" name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Phone Number" name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
          <Button
  variant="contained"
  fullWidth
  onClick={handleDeliverHere}
  sx={{
    background: 'linear-gradient(to right, #7fb0d6, #d4e5f2)',
    color: '#1e293b',
    fontWeight: 'bold',
    '&:hover': {
      background: 'linear-gradient(to right, #6aa1c8, #c0d9ea)',
    },
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  DELIVER HERE
</Button>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DeliveryAddressForm;
