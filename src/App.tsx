import './App.css';
import { Grid2, Paper, Box } from '@mui/material';
import { HeaderUI } from './components/HeaderUI';
import { AlertUI } from './components/AlertUI'; // Importar AlertUI

function App() {
  return (
    <Box sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: '#fafafa', display: 'flex', alignItems: 'center' }}>
      <Grid2 container spacing={5} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        
        {/* Encabezado: xs:12, md:12 */}
        <Grid2 size={{ xs: 12, md: 12 }}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <HeaderUI />
          </Paper>
        </Grid2>

        {/* Alertas: xs:12, md:12 - Convertido en contenedor */}
        <Grid2 
          size={{ xs: 12, md: 12 }}
          container 
          justifyContent="right" 
          alignItems="center"
        >
          <Paper elevation={2} sx={{ p: 2, bgcolor: '#fff4e5', width: '100%' }}>
            <AlertUI config={{ description: "No se preveen lluvias" }} />
          </Paper>
        </Grid2>

        {/* Selector: xs:12, md:3 */}
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            Elemento: Selector
          </Paper>
        </Grid2>

        {/* Indicadores: xs:12, md:9 */}
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            Elemento: Indicadores
          </Paper>
        </Grid2>

        {/* Gráfico: Oculto en xs, bloque en md */}
        <Grid2 
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block"} }}
        >
          <Paper elevation={2} sx={{ p: 4, height: '150px' }}>
            Elemento: Gráfico
          </Paper>
        </Grid2>

        {/* Tabla: Oculta en xs, bloque en md */}
        <Grid2 
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Paper elevation={2} sx={{ p: 4, height: '150px' }}>
            Elemento: Tabla
          </Paper>
        </Grid2>

        {/* Información adicional: xs:12, md:12 */}
        <Grid2 size={{ xs: 12, md: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            Elemento: Información adicional
          </Paper>
        </Grid2>

      </Grid2>
    </Box>
  );
}

export default App;