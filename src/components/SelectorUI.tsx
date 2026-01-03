import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { SelectChangeEvent } from '@mui/material/Select'; // Importación type-only

export default function SelectorUI() {
  const [cityInput, setCityInput] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        value={cityInput}
        label="Ciudad"
        onChange={handleChange}
      >
        <MenuItem disabled>
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>

      {cityInput && (
        <Typography variant="body1" sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          Información del clima en{' '}
          <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {cityInput}
          </span>
        </Typography>
      )}
    </FormControl>
  );
}