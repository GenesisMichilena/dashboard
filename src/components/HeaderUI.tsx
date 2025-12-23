// src/components/HeaderUI.tsx
import Typography from '@mui/material/Typography';

export const HeaderUI = () => {
  return (
    <Typography 
      variant="h2" 
      component="h1" 
      sx={{ fontWeight: "bold" }}
    >
      Dashboard del Clima
    </Typography>
  );
};