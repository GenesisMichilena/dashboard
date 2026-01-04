import { useState, useEffect } from 'react';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
  weatherData?: OpenMeteoResponse | null;
}

export default function ChartUI({ weatherData }: ChartUIProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<'temperatura' | 'viento'>('temperatura');

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      // Preparar datos para el gráfico (primeras 12 horas)
      const chartData = weatherData.hourly.time.slice(0, 12).map((time, index) => ({
        hora: new Date(time).toLocaleTimeString('es-EC', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        temperatura: weatherData.hourly.temperature_2m[index],
        viento: weatherData.hourly.wind_speed_10m[index],
      }));
      
      setChartData(chartData);
    }
  }, [weatherData]);

  const handleVariableChange = (event: SelectChangeEvent) => {
    setSelectedVariable(event.target.value as 'temperatura' | 'viento');
  };

  if (!weatherData) {
    return (
      <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1">Cargando datos para gráfico...</Typography>
      </Paper>
    );
  }

  const variableConfig = {
    temperatura: {
      dataKey: 'temperatura',
      color: '#ff7300',
      name: 'Temperatura',
      unit: '°C',
      domain: ['auto', 'auto'] as [number | string, number | string]
    },
    viento: {
      dataKey: 'viento',
      color: '#0088fe',
      name: 'Velocidad del Viento',
      unit: 'km/h',
      domain: [0, 'auto'] as [number | string, number | string]
    }
  };

  const config = variableConfig[selectedVariable];

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Gráfico de Datos Climáticos
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="variable-select-label">Variable</InputLabel>
          <Select
            labelId="variable-select-label"
            value={selectedVariable}
            label="Variable"
            onChange={handleVariableChange}
          >
            <MenuItem value="temperatura">Temperatura (°C)</MenuItem>
            <MenuItem value="viento">Velocidad del Viento (km/h)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hora" 
            tick={{ fontSize: 12 }}
            label={{ 
              value: 'Hora del día', 
              position: 'insideBottom', 
              offset: -5,
              fontSize: 12
            }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ 
              value: `${config.name} (${config.unit})`, 
              angle: -90, 
              position: 'insideLeft',
              fontSize: 12
            }}
            domain={config.domain}
          />
          <Tooltip 
            formatter={(value) => [`${value} ${config.unit}`, config.name]}
            labelFormatter={(label) => `Hora: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name={config.name}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}