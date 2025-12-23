import Alert from '@mui/material/Alert';


export interface AlertConfig {
  description: string;
}


export const AlertUI = ({ config }: { config: AlertConfig }) => {
  return (
    <Alert 
      severity="success" 
      variant="outlined"
    >
      {config.description}
    </Alert>
  );
};