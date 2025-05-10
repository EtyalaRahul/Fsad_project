import { Paper, Typography } from '@mui/material';
import { useAddress } from '../context/AddressContext';

const AddressCard = () => {
  const { selectedAddress } = useAddress();

  if (!selectedAddress) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2">No address selected.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold">{selectedAddress.name}</Typography>
      <Typography variant="body2" gutterBottom>
        {selectedAddress.street}<br />
        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}
      </Typography>
      <Typography variant="body2">
        <strong>Phone Number:</strong> {selectedAddress.phone}
      </Typography>
    </Paper>
  );
};

export default AddressCard;
