import React from 'react';
import { Container, Typography, Box, FormControl, Paper, Grid, Button, TextField } from '@mui/material';


const Betslip = ({ stake, betType, eachWay, odds }) => {
    // console.log(stake, betType, eachWay);
    return (
        <Paper sx={{ width: '80%', my: 4, p: 2}} elevation={8}>
            <Typography variant='h4' sx={{ mb: 2 }}>Betslip</Typography>
            <Typography variant='h6' sx={{ mb: 2 }}>
                Stake: {stake} {(stake !== null && stake !== '') && (eachWay ? 'Each Way' : 'Win Only')}
            </Typography>            
            <Typography variant='h6' sx={{ mb: 2 }}>Bet Type: {betType}</Typography>
            <Typography variant='h6' sx={{ mb: 2 }}>Odds: {odds.join(', ')}</Typography>
        </Paper>
    );
};

export default Betslip;