import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, SpeedDial, SpeedDialAction, SpeedDialIcon, ToggleButton, ToggleButtonGroup, CardContent, Typography, FormControlLabel, Switch, Box, FormControl, Paper, Grid, Button, TextField, InputAdornment, MenuItem, Select, Grow, Card } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
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
	const [runners, setRunners] = useState([]);
	const [stake, setStake] = useState("");
	const [odds, setOdds] = useState([]);
	const [error, setError] = useState(false);
	const [oddsFormat, setOddsFormat] = useState("fractional");
	const [status, setStatus] = useState(Array(betslip.selections).fill(1));
	const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const actions = [
		{ icon: "D", name: "decimal" },
		{ icon: "F", name: "fractional" },
	];
	const betTypeDescriptions = {
		single: "Arguably the most common betting type. A straight win bet, placed on a single event.",
		double: "A single bet on two outcomes in different events. Both selections must win to guarantee a return.",
		treble: "A single bet on three outcomes in different events. All three selections must win to guarantee a return.",
		fourfold: "An accumulator that comprises of four selections in one bet. All of the selections must win to guarantee a return.",
		fivefold: "An accumulator that comprises of five selections in one bet. All of the selections must win to guarantee a return.",
		sixfold: "An accumulator that comprises of six selections in one bet. All of the selections must win to guarantee a return.",
		sevenfold: "An accumulator that comprises of seven selections in one bet. All of the selections must win to guarantee a return.",
		eightfold: "An accumulator that comprises of eight selections in one bet. All of the selections must win to guarantee a return.",
		trixie: "A bet comprising three selections and four bets - three doubles and a treble. A minimum of two selections must win to guarantee a return. For example, a £2.50 Trixie would cost £10. A £2.50 each-way Trixie would cost £20.",
		yankee: "A bet consisting of four selections and 11 bets - six doubles, four trebles and a fourfold. A minimum of two selections must win to guarantee you a return. For example, a £2 Yankee would cost £22.",
		superyankee: "Also known as a Canadian, a Super Yankee is a bet on five selections consisting of 26 bets - ten doubles, ten trebles, five fourfolds and a fivefold accumulator.",
		heinz: 'The Heinz bet is a six-selection bet consisting of 57 bets: 15 doubles, 20 trebles, 15 fourfolds, six fivefolds and a one sixfold accumulator. Aptly named after the 57 "varieties" company slogan from Heinz, this 57 bet wager is a unique bet that combines every permutation of the 6 selections into one single wager.',
		superheinz: "A Super Heinz consists of 120 bets involving 7 selections in different events. The bet includes 21 doubles, 35 trebles, 35 fourfolds, 21 fivefolds, 7 sixfolds and a sevenfold accumulator. A minimum of 2 of your selections must be successful to get a return.",
		goliath: "A Goliath is a bet on eight selections taking part in various events consisting of 28 doubles, 56 trebles, 70 fourfolds, 56 fivefolds, 28 sixfolds, eight sevenfolds and an eightfold accumulator totalling 247 bets. Two selections must win to ensure any returns.",
		patent: "A bet involving three selections and seven bets - three singles, three doubles and one treble. Equivalent to a Trixie plus three singles. One winning selection will guarantee a return.",
		lucky15: "A Lucky 15 is a bet on four selections taking part in different events consisting of 15 bets - four singles, six doubles, four trebles and a fourfold accumulator. The Lucky 15 is a popular bet and the advantage of this bet is that it only takes one successful selection to guarantee a return.",
		lucky31: "A Lucky 31 is a bet featuring five selections and 31 bets, including five singles, ten doubles, ten trebles, five fourfolds and a fivefold accumulator. A minimum of one selection must win for you to get a return.",
		lucky63: "A Lucky 63 is a bet featuring six selections and 63 bets, including six singles, 15 doubles, 20 trebles, 15 fourfolds, six fivefolds and a sixfold accumulator. A minimum of one selection must win for you to get a return.",
		lucky127: "A Lucky 127 is a bet featuring seven selections and 127 bets, including seven singles, 21 doubles, 35 trebles, 35 fourfolds, 21 fivefolds, seven sixfolds and a sevenfold accumulator. A minimum of one selection must win for you to get a return.",
		lucky255: "A Lucky 255 is a bet featuring eight selections and 255 bets, including eight singles, 28 doubles, 56 trebles, 70 fourfolds, 56 fivefolds, 28 sixfolds, eight sevenfolds and an eightfold accumulator. A minimum of one selection must win for you to get a return.",
	};

	const initializeRunners = (numSelections) => {
		setRunners((prevRunners) => {
			if (numSelections > prevRunners.length) {
				// If numSelections has increased, add new runners
				const newRunners = [...prevRunners];
				for (let i = prevRunners.length; i < numSelections; i++) {
					newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
				}
				return newRunners;
			} else if (numSelections < prevRunners.length) {
				// If numSelections has decreased, remove runners
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
	const types = Object.keys(betTypes);

	console.log(betslip);

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
	const handleStatusChange = (index, value) => {
		setStatus((prevStatus) => {
			const newStatus = [...prevStatus];
			newStatus[index] = parseInt(value, 10);
			return newStatus;
		});
	};

	useEffect(() => {
		setRunners((prevRunners) => {
			return prevRunners.map((runner, index) => {
				return { ...runner, position: status[index] };
			});
		});
	}, [status]);

	const handleOddsChange = (index, value) => {
		setRunners((prevRunners) => {
			const newRunners = [...prevRunners];
			newRunners[index] = { ...newRunners[index], odds: value };
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

	const handleFractionalOddsChange = (index, part, value) => {
		setRunners((prevRunners) => {
			const newRunners = [...prevRunners];
			let currentOdds = newRunners[index].odds;
			if (typeof currentOdds === "string") {
				currentOdds = currentOdds.split("/");
				if (part === "numerator") {
					currentOdds[0] = value;
				} else if (part === "denominator") {
					currentOdds[1] = value;
				}
				newRunners[index] = { ...newRunners[index], odds: currentOdds.join("/") };
			}
			return newRunners;
		});
	};

	return (
		<Container maxWidth="xl">
      <Box sx={{ position: "sticky", top: "10px", right: "10px", display: "flex", flexDirection: "row", justifyContent: "end" }}>
      Bet Calculator
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
				sx={{ width: 120 }}>
				<ToggleButton value="fractional">Fractional</ToggleButton>
				<ToggleButton value="decimal">Decimal</ToggleButton>
			</ToggleButtonGroup>
      </Box>

			<Grid
				container
				spacing={2}
				sx={{ my: 1, minHeight: "180vh" }}>
				<Grid
					item
					xs={12}>
					<Grid
						container
						direction="row"
						spacing={2}>
						<Grid
							item
							sm={12}
							md={6}
							sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<FormControl>
								<Box
									id="stake-input-container"
									sx={{ minWidth: 200, display: "flex", flexDirection: "column", alignItems: "center" }}>
									<TextField
										variant="standard"
										type="amount"
										autoFocus={true}
										placeholder="Stake"
										value={stake}
										onChange={handleStakeChange}
										error={error}
										helperText={error ? "Please enter a positive number." : ""}
										sx={{ width: 200 }}
										InputProps={{
											startAdornment: <InputAdornment position="start">£</InputAdornment>,
											style: { fontSize: "3rem", letterSpacing: "0.3rem", paddingLeft: "1rem", paddingRight: "1rem" },
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
										sx={{ m: 2, width: 200 }}>
										<ToggleButton value="Win Only">Win Only</ToggleButton>
										<ToggleButton value="Each Way">Each Way</ToggleButton>
									</ToggleButtonGroup>
									{/* <ToggleButtonGroup
										value={oddsFormat}
										size="small"
										exclusive
										orientation="vertical"
										onChange={(event, newFormat) => {
											if (newFormat !== null) {
												setOddsFormat(newFormat);
											}
										}}
										sx={{ width: 120 }}>
										<ToggleButton value="fractional">Fractional</ToggleButton>
										<ToggleButton value="decimal">Decimal</ToggleButton>
									</ToggleButtonGroup> */}
									<Select
										value={betslip.type}
										variant="standard"
										onChange={handleTypeChange}
										sx={{ minWidth: 500, minHeight: 100, fontSize: "4rem", letterSpacing: "0.3rem", textAlign: "center" }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '300px',
                          overflow: 'auto',
                        },
                      },
                    }}>
										{types.map((type, index) => (
											<MenuItem
												value={type}
												key={index}>
												{type.charAt(0).toUpperCase() + type.slice(1)}
											</MenuItem>
										))}
									</Select>
								</Box>
							</FormControl>
						</Grid>
						<Grid
							item
							sm={12}
							md={6}
							sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
							<Box
								id="bet-info-container"
								sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: 400, m: 2 }}>
								<Card
									sx={{
										":hover": {
											boxShadow: 6,
										},
									}}>
									<CardContent>
										<Typography
											variant="h5"
											component="div">
											{betslip.type.charAt(0).toUpperCase() + betslip.type.slice(1)}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary">
											{betTypeDescriptions[betslip.type]}
										</Typography>
									</CardContent>
								</Card>
							</Box>
						</Grid>
					</Grid>
					<Box sx={{ borderRadius: 5, p: 2, maxWidth: 1000}}>
						<Grid
							container
							spacing={0}
							id="Yes">
							<TransitionGroup
								component={Grid}
								container
								item
								xs={12}
								spacing={2}>
								{Array.from({ length: numSelections }).map((_, index) => (
									<Grow
										in={true}
										key={index}>
										<Grid
											item
											xs={12}
											sm={12}
											md={6}>
											<Grid
												id="selection-container"
												container
												sx={{ p: 1 }}>
												<Paper
													sx={{
														p: 1,
														display: "flex",
														flexDirection: "row",
														alignItems: "center",
														justifyContent: "space-between",
														width: "100%",
														elevation: 3,
														minWidth: 400,
														":hover": {
															boxShadow: 6,
														},
													}}>
													<Grid item>
														<Typography
															variant="h3"
															sx={{ p: 2 }}>
															#{index + 1}
														</Typography>
													</Grid>
													<Grid item>
														<FormControl>
															<Select
																variant="standard"
																sx={{ minWidth: "100px", my: 1 }}
																value={status[index] !== undefined ? status[index] : 1}
																onChange={(event) => handleStatusChange(index, parseInt(event.target.value, 10))}>
																<MenuItem value={1}>Won</MenuItem>
																<MenuItem value={2}>Placed</MenuItem>
																<MenuItem value={0}>Lost</MenuItem>
																<MenuItem value={-1}>Void</MenuItem>
															</Select>
														</FormControl>
													</Grid>
													<Grid
														item
														sx={{ minWidth: "150px", display: "flex", justifyContent: "center" }}>
														{oddsFormat === "decimal" ? (
															<TextField
																variant="standard"
																type="number"
																defaultValue="2.0"
																onChange={(event) => handleOddsChange(index, event.target.value)}
																sx={{ width: "100px" }}
															/>
														) : (
															<Grid
																container
																alignItems="center">
																<Grid item>
																	<TextField
																		variant="standard"
																		type="number"
																		defaultValue="1"
																		sx={{ width: "50px", mb: 1.5 }}
																		onChange={(event) => handleFractionalOddsChange(index, "numerator", event.target.value)}
																	/>
																</Grid>
																<Grid item>
																	<Typography
																		variant="h2"
																		sx={{ mx: 1 }}>
																		/
																	</Typography>
																</Grid>
																<Grid item>
																	<TextField
																		variant="standard"
																		type="number"
																		defaultValue="1"
																		sx={{ width: "50px", mt: 1.5 }}
																		onChange={(event) => handleFractionalOddsChange(index, "denominator", event.target.value)}
																	/>
																</Grid>
															</Grid>
														)}
													</Grid>
													<Grid item>
														<FormControl>
															<Select
																variant="standard"
																value={"1/4"}
																onChange={(event) => handlePlaceTermsChange(index, event.target.value)}
																disabled={!betslip.eachWay}>
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
				<Grid
					id="betslip-container"
					item
					sm={12}
					lg={3}>
					<Betslip
						betslip={betslip}
						runners={runners}
					/>
				</Grid>
			</Grid>
			<Box sx={{ position: "sticky", bottom: "0", right: "50px", display: "flex", flexDirection: "row", justifyContent: "end" }}>
				<Typography
					variant="h5"
					sx={{ p: 1.5, textAlign: "left", marginBottom: "0" }}>
					Sam Banks 2024
				</Typography>

				<Link
					href="https://github.com/sambanks5"
					target="_blank"
					rel="noopener noreferrer">
					<IconButton>
						<GitHubIcon />
					</IconButton>
				</Link>
			</Box>
		</Container>
	);
}

export default App;
