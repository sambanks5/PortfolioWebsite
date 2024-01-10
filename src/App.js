import './App.css';
import { Container, Typography, Box, FormControl, Paper } from '@mui/material';

function App() {

  return (
    <Container maxWidth='sm'>
        <Paper sx={{ height: 700, my: 4, textAlign: 'center'}} elevation={8}>
          <Typography variant='h2' sx={{ p: 2}}>Bet Calculator</Typography>
          
        </Paper>
    </Container>  
  );
}

export default App;
