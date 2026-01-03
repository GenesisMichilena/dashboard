import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title?: string;
  description?: string;
  unit?: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', height: '100%' }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {props.description}
          {props.unit && <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>{props.unit}</span>}
        </Typography>
        <Typography variant="body2" component="p" color="text.secondary" sx={{ mt: 1 }}>
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}