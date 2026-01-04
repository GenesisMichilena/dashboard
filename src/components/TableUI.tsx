import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef,
  GridToolbar 
} from '@mui/x-data-grid';
import { Paper, Typography, LinearProgress } from '@mui/material';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  weatherData?: OpenMeteoResponse | null;
}

export default function TableUI({ weatherData }: TableUIProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      // Preparar datos para la tabla (primeras 12 horas)
      const tableData = weatherData.hourly.time.slice(0, 12).map((time, index) => ({
        id: index,
        hora: new Date(time).toLocaleTimeString('es-EC', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        temperatura: weatherData.hourly.temperature_2m[index],
        viento: weatherData.hourly.wind_speed_10m[index],
        fecha: new Date(time).toLocaleDateString('es-EC', {
          day: '2-digit',
          month: 'short'
        })
      }));
      
      setRows(tableData);
      setLoading(false);
    }
  }, [weatherData]);

  const columns: GridColDef[] = [
    { 
      field: 'fecha', 
      headerName: 'Fecha', 
      width: 100,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'hora', 
      headerName: 'Hora', 
      width: 100,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'temperatura', 
      headerName: 'Temperatura (°C)', 
      width: 150,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (value) => `${value.toFixed(1)}°C`
    },
    { 
      field: 'viento', 
      headerName: 'Viento (km/h)', 
      width: 150,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (value) => `${value.toFixed(1)} km/h`
    },
  ];

  if (!weatherData) {
    return (
      <Paper sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1">Cargando datos climáticos...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
        Datos por Hora
      </Typography>
      
      {loading ? (
        <LinearProgress sx={{ my: 2 }} />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#e3f2fd',
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          density="compact"
        />
      )}
    </Paper>
  );
}