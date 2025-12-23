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

function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil');
  const [refreshKey, setRefreshKey] = useState(0);

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
              description: "No se preveen lluvias para las próximas 24 horas", 
              severity: "success",
              variant: "filled"
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

        {/* Indicadores Principales */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: 2,
            bgcolor: '#fff'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2c3e50' }}>
              Indicadores Climáticos
            </Typography>
            <Grid2 container spacing={3}>
              {/* Temperatura */}
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 24, color: '#e74c3c', mb: 1 }}>🌡️</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {currentData.temp}°C
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Temperatura
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(currentData.temp / 40) * 100} 
                      sx={{ mt: 2 }}
                      color="error"
                    />
                  </CardContent>
                </Card>
              </Grid2>

              {/* Humedad */}
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 24, color: '#3498db', mb: 1 }}>💧</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {currentData.humidity}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Humedad
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={currentData.humidity} 
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid2>

              {/* Viento */}
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 24, color: '#1abc9c', mb: 1 }}>💨</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {currentData.wind} km/h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Velocidad del Viento
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(currentData.wind / 20) * 100} 
                      sx={{ mt: 2 }}
                      color="success"
                    />
                  </CardContent>
                </Card>
              </Grid2>

              {/* Condición */}
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 24, color: '#9b59b6', mb: 1 }}>☁️</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {currentData.condition}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Condición Actual
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
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