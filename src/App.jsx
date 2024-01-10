import React, { useState } from 'react';
import Betslip from './components/betslip';
import './App.css';
import { Container, Typography, FormControlLabel, Switch, Box, FormControl, Paper, Grid, Button, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import { betTypes } from './betcruncher';

function App() {
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState([]);
  const [oddsFormat, setOddsFormat] = useState('decimal');
  const [eachWay, setEachWay] = useState(false);
  const [placeTerms, setPlaceTerms] = useState([]);
  const [betslip, setBetslip] = useState({ stake: null, type: "", eachWay: false });

  const types = Object.keys(betTypes);

  const handleTypeChange = (type) => {
    setBetslip({ ...betslip, type });
  };

  const handleStakeChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value < 0) {
      setError(true);
    } else {
      setError(false);
      setStake(value);
      console.log(value);
    }
  };

  const handleOddsChange = (index, value) => {
    setOdds(prevOdds => {
      const newOdds = [...prevOdds];
      newOdds[index] = value;
      return newOdds;
    });
  };

  const handleStatusChange = (index, value) => {
    setStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[index] = value;
      return newStatus;
    });
  };

  const handleFractionalOddsChange = (index, part, value) => {
    setOdds(prevOdds => {
      const newOdds = [...prevOdds];
      newOdds[index] = { ...newOdds[index], [part]: value };
      return newOdds;
    });
  };

  const handlePlaceTermsChange = (index, value) => {
    setPlaceTerms(prevPlaceTerms => {
      const newPlaceTerms = [...prevPlaceTerms];
      newPlaceTerms[index] = value;
      return newPlaceTerms;
    });
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h2' sx={{ p: 1 }}>Bet Calculator</Typography>
      <FormControlLabel
        control={
          <Switch
            onChange={(event) => setOddsFormat(event.target.checked ? 'fractional' : 'decimal')}
          />
        }
        label="Odds Format"
        labelPlacement="start"
        sx={{ ml: 5 }}
      />
      <Grid container spacing={1} sx={{ my: 7 }}>
        <Grid item sm={12} md={6}>
          <Paper sx={{ minHeight: 700, width: '100%' }} elevation={8}>
            <Box sx={{ p: 2 }}>
              <FormControl>
                <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <TextField
                    variant='filled'
                    label='Stake'
                    type='number'
                    value={stake}
                    onChange={handleStakeChange}
                    error={error}
                    helperText={error ? 'Invalid input. Please enter a positive number.' : ''}
                    sx={{ width: '200px' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={eachWay}
                        onChange={(event) => setEachWay(event.target.checked)}
                      />
                    }
                    label="Each Way"
                    labelPlacement="start"
                    sx={{ ml: 5 }}
                  />
                </Box>
                <Grid container spacing={2}>
                  {types.map((type, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Button variant="outlined" onClick={() => handleTypeChange(type)} fullWidth>
                        {type}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 2 }}>
                  {Array.from({ length: betTypes[betslip.type]?.selections || 0 }).map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
                      <Typography variant='h4' sx={{ width: '20px' }}>{index + 1}</Typography>

                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={status[index] || ''}
                          onChange={(event) => handleStatusChange(index, event.target.value)}
                        >
                          <MenuItem value={'Won'}>Won</MenuItem>
                          <MenuItem value={'Placed'}>Placed</MenuItem>
                          <MenuItem value={'Lost'}>Lost</MenuItem>
                          <MenuItem value={'Void'}>Void</MenuItem>
                        </Select>
                      </FormControl>

                      {oddsFormat === 'decimal' ? (
                        <TextField
                          type="number"
                          onChange={(event) => handleOddsChange(index, event.target.value)}
                          placeholder="Decimal odds"
                        />
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                          <TextField
                            type="number"
                            onChange={(event) => handleFractionalOddsChange(index, 'numerator', event.target.value)}
                          />
                          <TextField
                            type="number"
                            onChange={(event) => handleFractionalOddsChange(index, 'denominator', event.target.value)}
                          />
                        </Box>
                      )}

                      {eachWay && (
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel>Place Terms</InputLabel>
                          <Select
                            value={placeTerms[index] || ''}
                            onChange={(event) => handlePlaceTermsChange(index, event.target.value)}
                          >
                            <MenuItem value={'1/1'}>1/1</MenuItem>
                            <MenuItem value={'1/2'}>1/2</MenuItem>
                            <MenuItem value={'1/3'}>1/3</MenuItem>
                            <MenuItem value={'1/4'}>1/4</MenuItem>
                            <MenuItem value={'1/5'}>1/5</MenuItem>
                            <MenuItem value={'1/6'}>1/6</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  ))}
                </Box>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Betslip stake={stake} betType={betslip.type} eachWay={betslip.eachWay} odds={odds} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;