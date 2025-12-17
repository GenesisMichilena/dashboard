import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Grid, Paper, Typography, Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: '#fafafa', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        
        {/* Encabezado: xs:12, md:12 */}
        <Grid item xs={12} md={12}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">Elemento: Encabezado</Typography>
          </Paper>
        </Grid>

        {/* Alertas: xs:12, md:12 */}
        <Grid item xs={12} md={12}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff4e5' }}>Elemento: Alertas</Paper>
        </Grid>

        {/* Selector: xs:12, md:3 */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>Elemento: Selector</Paper>
        </Grid>

        {/* Indicadores: xs:12, md:9 */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 2 }}>Elemento: Indicadores</Paper>
        </Grid>

        {/* Gráfico: Oculto en xs, bloque en md */}
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{ display: { xs: "none", md: "block"} }}
        >
          <Paper elevation={2} sx={{ p: 4, height: '150px' }}>Elemento: Gráfico</Paper>
        </Grid>

        {/* Tabla: Oculta en xs, bloque en md */}
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Paper elevation={2} sx={{ p: 4, height: '150px' }}>Elemento: Tabla</Paper>
        </Grid>

        {/* Información adicional: xs:12, md:12 */}
        <Grid item xs={12} md={12}>
          <Paper elevation={2} sx={{ p: 2 }}>Elemento: Información adicional</Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default App;