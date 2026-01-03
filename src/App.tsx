import './App.css';
import { useState } from 'react';
import { 
  Grid2, 
  Paper, 
  Box, 
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import { HeaderUI } from './components/HeaderUI';
import { AlertUI } from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';

function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Usar el custom hook para obtener datos de la API
  const weatherDataAPI = useFetchData();

  const weatherData = {
    guayaquil: { temp: 32, humidity: 75, wind: 12, condition: 'Soleado' },
    quito: { temp: 18, humidity: 65, wind: 8, condition: 'Parcialmente nublado' },
    manta: { temp: 28, humidity: 80, wind: 15, condition: 'Lluvioso' },
    cuenca: { temp: 20, humidity: 70, wind: 10, condition: 'Nublado' }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const currentData = weatherData[selectedCity as keyof typeof weatherData];

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh', 
      bgcolor: '#f5f7fa',
      p: { xs: 2, md: 4 }
    }}>
      <Grid2 container spacing={3} justifyContent="center">
        
        {/* Encabezado */}
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            textAlign: 'center',
            bgcolor: '#2196F3',
            borderRadius: 2,
            color: 'white'
          }}>
            <HeaderUI />
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              Monitoreo climático en tiempo real
            </Typography>
          </Paper>
        </Grid2>

        {/* Alertas */}
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ 
            p: 2, 
            borderRadius: 2,
            bgcolor: '#fff',
            borderLeft: '6px solid #4CAF50'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                Estado del Clima
              </Typography>
              <Tooltip title="Actualizar datos">
                <IconButton onClick={handleRefresh} sx={{ bgcolor: '#2196F3', color: 'white' }}>
                  ↻
                </IconButton>
              </Tooltip>
            </Box>
            <AlertUI key={refreshKey} config={{ 
              description: "No se preveen lluvias para las próximas 24 horas"
            }} />
          </Paper>
        </Grid2>

        {/* Selector de Ciudad */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            height: '100%',
            borderRadius: 2,
            bgcolor: '#fff'
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Seleccionar Ciudad
            </Typography>
            <SelectorUI />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Selecciona una ciudad para ver su información climática
            </Typography>
          </Paper>
        </Grid2>

        {/* Indicadores Principales desde API */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: '#fff'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2c3e50' }}>
              Indicadores Climáticos en Tiempo Real
            </Typography>
            
            {/* Mostrar loading o datos */}
            {!weatherDataAPI ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                Cargando datos del clima...
              </Typography>
            ) : (
              <Grid2 container spacing={3}>
                {/* Temperatura (2m) */}
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                    title="Temperatura (2m)" 
                    description={weatherDataAPI.current.temperature_2m.toFixed(1)}
                    unit={weatherDataAPI.current_units.temperature_2m}
                  />
                </Grid2>

                {/* Temperatura Aparente */}
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                    title="Temperatura Aparente" 
                    description={weatherDataAPI.current.apparent_temperature.toFixed(1)}
                    unit={weatherDataAPI.current_units.apparent_temperature}
                  />
                </Grid2>

                {/* Velocidad del Viento */}
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                    title="Velocidad del Viento" 
                    description={weatherDataAPI.current.wind_speed_10m.toFixed(1)}
                    unit={weatherDataAPI.current_units.wind_speed_10m}
                  />
                </Grid2>

                {/* Humedad Relativa */}
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                  <IndicatorUI 
                    title="Humedad Relativa" 
                    description={weatherDataAPI.current.relative_humidity_2m.toString()}
                    unit={weatherDataAPI.current_units.relative_humidity_2m}
                  />
                </Grid2>
              </Grid2>
            )}
          </Paper>
        </Grid2>

        {/* Gráfico de Temperatura (Solo MD) */}
        <Grid2 
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Paper elevation={3} sx={{ 
            p: 3, 
            height: '250px',
            borderRadius: 2,
            bgcolor: '#fff'
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
              Temperatura por Horas
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 'calc(100% - 40px)' }}>
              {[24, 28, 32, 30, 26, 24].map((temp, index) => (
                <Box key={index} sx={{ flex: 1, textAlign: 'center', mx: 1 }}>
                  <Box sx={{ 
                    height: `${temp * 3}px`, 
                    bgcolor: '#ff7e5f',
                    borderRadius: '4px 4px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {temp}°
                  </Box>
                  <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {['6h', '9h', '12h', '15h', '18h', '21h'][index]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid2>

        {/* Tabla de Datos (Solo MD) */}
        <Grid2 
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Paper elevation={3} sx={{ 
            p: 3, 
            height: '250px',
            borderRadius: 2,
            bgcolor: '#fff'
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
              Datos por Ciudad
            </Typography>
            <TableContainer sx={{ maxHeight: 200 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ciudad</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Temp (°C)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Humedad (%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Viento (km/h)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(weatherData).map(([city, data]) => (
                    <TableRow 
                      key={city}
                      hover
                      selected={city === selectedCity}
                      onClick={() => setSelectedCity(city)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ textTransform: 'capitalize' }}>{city}</TableCell>
                      <TableCell align="right">{data.temp}</TableCell>
                      <TableCell align="right">{data.humidity}</TableCell>
                      <TableCell align="right">{data.wind}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        {/* Información Adicional */}
        <Grid2 size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: '#2c3e50',
            color: 'white'
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Información Adicional
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <strong>Pronóstico:</strong> Estable para las próximas 48 horas
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <strong>Índice UV:</strong> Moderado (5.2)
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="body2">
                  <strong>Calidad del Aire:</strong> Buena
                </Typography>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>

      </Grid2>
    </Box>
  );
}

export default App;