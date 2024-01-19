import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, Fab, Drawer, Divider, ToggleButton, ToggleButtonGroup, CardContent, Typography, FormControlLabel, Switch, Box, FormControl, Paper, Grid, Button, TextField, InputAdornment, MenuItem, Select, Grow, Card } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TuneIcon from "@mui/icons-material/Tune";
import CalculateIcon from "@mui/icons-material/Calculate";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { betTypes } from "./betcruncher";

function App() {
  const betcruncher = require("./betcruncher");

  const [betslip, setBetslip] = useState({
    stake: "",
    type: "single",
    eachWay: false,
  });
  const types = Object.keys(betTypes);
  const [runners, setRunners] = useState([]);
  const [stake, setStake] = useState("");
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(false);
  const [oddsFormat, setOddsFormat] = useState("fractional");
  const [position, setPosition] = useState(Array(betslip.selections).fill(1));
  const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const betTypeDescriptions = {
    single: {
      description: "Arguably the most common betting type. A straight win bet, placed on a single event.",
      numBets: 1,
    },
    double: {
      description: "A single bet on two outcomes in different events. Both selections must win to guarantee a return.",
      numBets: 2,
    },
    treble: {
      description: "A single bet on three outcomes in different events. All three selections must win to guarantee a return.",
      numBets: 3,
    },
    fourfold: {
      description: "An accumulator that comprises of four selections in one bet. All of the selections must win to guarantee a return.",
      numBets: 4,
    },
    fivefold: {
      description: "An accumulator that comprises of five selections in one bet. All of the selections must win to guarantee a return.",
      numBets: 5,
    },
    sixfold: {
      description: "An accumulator that comprises of six selections in one bet. All of the selections must win to guarantee a return.",
      numBets: 6,
    },
    sevenfold: {
      description: "An accumulator that comprises of seven selections in one bet. All of the selections must win to guarantee a return.",
      numBets: 7,
    },
    eightfold: {
      description: "An accumulator that comprises of eight selections in one bet. All of the selections must win to guarantee a return.",
      numBets: 8,
    },
    trixie: {
      description: "A bet comprising three selections and four bets - three doubles and a treble. A minimum of two selections must win to guarantee a return. For example, a £2.50 Trixie would cost £10. A £2.50 each-way Trixie would cost £20.",
      numBets: 4,
    },
    yankee: {
      description: "A bet consisting of four selections and 11 bets - six doubles, four trebles and a fourfold. A minimum of two selections must win to guarantee you a return. For example, a £2 Yankee would cost £22.",
      numBets: 11,
    },
    superyankee: {
      description: "Also known as a Canadian, a Super Yankee is a bet on five selections consisting of 26 bets - ten doubles, ten trebles, five fourfolds and a fivefold accumulator.",
      numBets: 26,
    },
    heinz: {
      description: 'The Heinz bet is a six-selection bet consisting of 57 bets: 15 doubles, 20 trebles, 15 fourfolds, six fivefolds and a one sixfold accumulator. Aptly named after the 57 "varieties" company slogan from Heinz, this 57 bet wager is a unique bet that combines every permutation of the 6 selections into one single wager.',
      numBets: 57,
    },
    superheinz: {
      description: "A Super Heinz consists of 120 bets involving 7 selections in different events. The bet includes 21 doubles, 35 trebles, 35 fourfolds, 21 fivefolds, 7 sixfolds and a sevenfold accumulator. A minimum of 2 of your selections must be successful to get a return.",
      numBets: 120,
    },
    goliath: {
      description: "A Goliath is a bet on eight selections taking part in various events consisting of 28 doubles, 56 trebles, 70 fourfolds, 56 fivefolds, 28 sixfolds, eight sevenfolds and an eightfold accumulator totalling 247 bets. Two selections must win to ensure any returns.",
      numBets: 247,
    },
    patent: {
      description: "A bet involving three selections and seven bets - three singles, three doubles and one treble. Equivalent to a Trixie plus three singles. One winning selection will guarantee a return.",
      numBets: 7,
    },
    lucky15: {
      description: "A Lucky 15 is a bet on four selections taking part in different events consisting of 15 bets - four singles, six doubles, four trebles and a fourfold accumulator. The Lucky 15 is a popular bet and the advantage of this bet is that it only takes one successful selection to guarantee a return.",
      numBets: 15,
    },
    lucky31: {
      description: "A Lucky 31 is a bet featuring five selections and 31 bets, including five singles, ten doubles, ten trebles, five fourfolds and a fivefold accumulator. A minimum of one selection must win for you to get a return.",
      numBets: 31,
    },
    lucky63: {
      description: "A Lucky 63 is a bet featuring six selections and 63 bets, including six singles, 15 doubles, 20 trebles, 15 fourfolds, six fivefolds and a sixfold accumulator. A minimum of one selection must win for you to get a return.",
      numBets: 63,
    },
    lucky127: {
      description: "A Lucky 127 is a bet featuring seven selections and 127 bets, including seven singles, 21 doubles, 35 trebles, 35 fourfolds, 21 fivefolds, seven sixfolds and a sevenfold accumulator. A minimum of one selection must win for you to get a return.",
      numBets: 127,
    },
    lucky255: {
      description: "A Lucky 255 is a bet featuring eight selections and 255 bets, including eight singles, 28 doubles, 56 trebles, 70 fourfolds, 56 fivefolds, 28 sixfolds, eight sevenfolds and an eightfold accumulator. A minimum of one selection must win for you to get a return.",
      numBets: 255,
    },
  };

  const initializeRunners = (numSelections) => {
    setRunners((prevRunners) => {
      if (numSelections > prevRunners.length) {
        // If numSelections has increased, add new runners
        const newRunners = [...prevRunners];
        for (let i = prevRunners.length; i < numSelections; i++) {
          newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
        }
        // Also update the status state
        setPosition((prevPosition) => [...prevPosition, ...new Array(numSelections - prevPosition.length).fill(1)]);
        return newRunners;
      } else if (numSelections < prevRunners.length) {
        // If numSelections has decreased, remove runners
        // Also update the status state
        setPosition((prevPosition) => prevPosition.slice(0, numSelections));
        return prevRunners.slice(0, numSelections);
      } else {
        // If numSelections hasn't changed, return the existing runners
        return prevRunners;
      }
    });
  };

  // Call this function whenever numSelections changes
  useEffect(() => {
    initializeRunners(numSelections);
  }, [numSelections]);

  console.log(runners);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setBetslip({ ...betslip, type });
    setNumSelections(betTypes[type]?.selections || 0);
  };

  const handleStakeChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value < 0) {
      setError(true);
    } else {
      setError(false);
      setStake(value);
      setBetslip((prevBetslip) => ({ ...prevBetslip, stake: value }));
    }
  };

  const handlePositionChange = (index, value) => {
    setPosition((prevPosition) => {
      const newPosition = [...prevPosition];
      newPosition[index] = parseInt(value, 10);
      return newPosition;
    });
  };

  useEffect(() => {
    setRunners((prevRunners) => {
      return prevRunners.map((runner, index) => {
        return { ...runner, position: position[index] };
      });
    });
  }, [position]);

  const oddsConverter = require("./oddsconverter.js");

  const handleOddsChange = (index, value) => {
    if (!value) {
      // Value is undefined, null, or empty. Handle this case as needed.
      return;
    }

    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      const decimalOdds = oddsConverter(value).decimal; // Convert to decimal
      newRunners[index] = { ...newRunners[index], odds: decimalOdds };
      return newRunners;
    });
  };

  const handleFractionalOddsChange = (index, part, value) => {
    if (!value) {
      // Value is undefined, null, or empty. Handle this case as needed.
      return;
    }

    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      let currentOdds = newRunners[index].fractionalOdds || { numerator: "1", denominator: "1" };
      if (part === "numerator") {
        currentOdds.numerator = value;
      } else if (part === "denominator") {
        currentOdds.denominator = value;
      }
      const fractionalOdds = `${currentOdds.numerator}/${currentOdds.denominator}`;
      const decimalOdds = oddsConverter(fractionalOdds).decimal; // Convert to decimal
      newRunners[index] = { ...newRunners[index], odds: decimalOdds, fractionalOdds: currentOdds };
      return newRunners;
    });
  };

  const handlePlaceTermsChange = (index, value) => {
    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      newRunners[index] = { ...newRunners[index], terms: value };
      return newRunners;
    });
  };

  return (
    <Container maxWidth="lg">



      <Box sx={{ position: "sticky", top: "10px", right: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        Bet Calculator
        <Fab color="secondary" variant="extended" aria-label="add" onClick={handleDrawerOpen}>
          <TuneIcon />
        </Fab>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Options
            </Typography>
            <ToggleButtonGroup
              value={oddsFormat}
              size="small"
              exclusive
              orientation="vertical"
              onChange={(event, newFormat) => {
                if (newFormat !== null) {
                  setOddsFormat(newFormat);
                }
              }}
              sx={{ width: 150 }}>
              <ToggleButton value="fractional">Fractional</ToggleButton>
              <ToggleButton value="decimal">Decimal</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ p: 2, position: "absolute", bottom: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h5">Sam Banks 2024</Typography>

              <Link href="https://github.com/sambanks5" target="_blank" rel="noopener noreferrer">
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </Box>



      <Grid container spacing={2} sx={{ my: 1, minHeight: "180vh" }}>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={2}>
            <Grid item sm={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <FormControl>
                <Box id="stake-input-container" sx={{ minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <TextField
                    variant="standard"
                    type="amount"
                    autoFocus={true}
                    placeholder="Stake"
                    value={stake}
                    onChange={handleStakeChange}
                    error={error}
                    helperText={error ? "Please enter a positive number." : ""}
                    sx={{ width: 280 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>,
                      style: { fontSize: "3rem", letterSpacing: "0.3rem", paddingLeft: ".5rem", paddingRight: "3rem" },
                    }}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                  <ToggleButtonGroup
                    value={betslip.eachWay ? "Each Way" : "Win Only"}
                    exclusive
                    orientation="horizontal"
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setBetslip((prevBetslip) => ({
                          ...prevBetslip,
                          eachWay: newValue === "Each Way",
                        }));
                      }
                    }}
                    sx={{ m: 2 }}>
                    <ToggleButton value="Win Only">Win Only</ToggleButton>
                    <ToggleButton value="Each Way">Each Way</ToggleButton>
                  </ToggleButtonGroup>
                  <Select
                    value={betslip.type}
                    variant="standard"
                    onChange={handleTypeChange}
                    sx={{ minWidth: 500, minHeight: 100, fontSize: "4rem", letterSpacing: "0.3rem", textAlign: "center" }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: "300px",
                          overflow: "auto",
                        },
                      },
                    }}>
                    {types.map((type, index) => (
                      <MenuItem value={type} key={index}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Grid>

            <Grid item sm={12} md={6} sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Box id="bet-info-container" sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", textAlign: "center", width: 400, m: 2 }}>
                <Card
                  sx={{
                    ":hover": {
                      boxShadow: 6,
                    },
                  }}>
                  <CardContent>
                    <Typography variant="h2" component="div">
                      Bet Info
                    </Typography>
                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", my: 1 }}>
                      <Typography variant="h4" component="div">
                        Unit Stake: £{stake}
                      </Typography>
                      <Typography variant="h4" component="div">
                        Total Stake: £{betslip.eachWay ? stake * betTypeDescriptions[betslip.type].numBets * 2 : stake * betTypeDescriptions[betslip.type].numBets}
                      </Typography>
                    </Box>

                    <Typography variant="h4" component="div">
                      {betslip.type.charAt(0).toUpperCase() + betslip.type.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {betTypeDescriptions[betslip.type].description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box id="hello" sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={0} id="Yes" sx={{ maxWidth: 800 }}>
              <TransitionGroup component={Grid} container item xs={12} spacing={1}>
                {Array.from({ length: numSelections }).map((_, index) => (
                  <Grow in={true} key={index}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Grid id="selection-container" container sx={{ p: 1 }}>
                        <Paper
                          sx={{
                            p: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
							              minWidth: "350px",
                            elevation: 3,
                            ":hover": {
                              boxShadow: 6,
                            },
                          }}>
                          <Grid item>
                            <Typography variant="h3" sx={{ p: 2 }}>
                              #{index + 1}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <FormControl>
                              <Select variant="standard" sx={{ minWidth: "100px", my: 1 }} value={position[index] !== undefined ? position[index] : 1} onChange={(event) => handlePositionChange(index, parseInt(event.target.value, 10))}>
                                <MenuItem value={1}>Won</MenuItem>
                                <MenuItem value={2}>Placed</MenuItem>
                                <MenuItem value={0}>Lost</MenuItem>
                                <MenuItem value={-1}>Void</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item sx={{ minWidth: "150px", display: "flex", justifyContent: "center" }}>
                            {oddsFormat === "decimal" ? (
                              <TextField variant="standard" type="number" defaultValue="2.0" onChange={(event) => handleOddsChange(index, event.target.value)} sx={{ width: "100px" }} />
                            ) : (
                              <Grid container id="fractions-container" alignItems="center" justifyContent="center">
                                <Grid item>
                                  <TextField variant="standard" type="number" defaultValue="1" sx={{ width: "40px", mb: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "numerator", event.target.value)} />
                                </Grid>
                                <Grid item>
                                  <Typography variant="h2" sx={{ mx: 1, mt: 1 }}>
                                    /
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <TextField variant="standard" type="number" defaultValue="1" sx={{ width: "40px", mt: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "denominator", event.target.value)} />
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                          <Grid item>
                            <FormControl>
                              <Select variant="standard" value={"1/4"} onChange={(event) => handlePlaceTermsChange(index, event.target.value)} disabled={!betslip.eachWay}>
                                <MenuItem value={"1/1"}>1/1</MenuItem>
                                <MenuItem value={"1/2"}>1/2</MenuItem>
                                <MenuItem value={"1/3"}>1/3</MenuItem>
                                <MenuItem value={"1/4"}>1/4</MenuItem>
                                <MenuItem value={"1/5"}>1/5</MenuItem>
                                <MenuItem value={"1/6"}>1/6</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grow>
                ))}
              </TransitionGroup>
            </Grid>
          </Box>
        </Grid>
        <Grid id="betslip-container" item sm={12}>
          <Betslip betslip={betslip} runners={runners} />
        </Grid>
      </Grid>
      <Fab color="secondary" variant="extended" aria-label="add" sx={{position: "sticky", top: 700, right: 350}}>
        <CalculateIcon sx={{ mr: 1 }} />
        Calculate
      </Fab>
    </Container>
  );
}

export default App;
