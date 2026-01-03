import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert'; // Importación type-only

export interface AlertConfig {
  description: string;
  severity?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
  variant?: 'standard' | 'filled' | 'outlined';
}

export const AlertUI = ({ config }: { config: AlertConfig }) => {
  return (
    <Alert 
      severity={config.severity || "success"} 
      variant={config.variant || "outlined"}
    >
      {config.description}
    </Alert>
  );
};