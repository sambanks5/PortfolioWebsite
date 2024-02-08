import React, { useState } from "react";
import { Divider, ToggleButton, ToggleButtonGroup, CardContent, Typography, Box, FormControl, Paper, Grid, TextField, InputAdornment, MenuItem, Select, Grow, Card } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { betTypes } from "../betcruncher";
const types = Object.keys(betTypes);

const Calculator = ({ runners, betTypeDescriptions, oddsFormat, showRule4, rule4Deduction, onRule4Change, betslip, setBetslip, stake, position, terms, numSelections, error, onStakeChange, onTypeChange, onPositionChange, onTermsChange, onDecimalChange, onFractionalChange, onAmericanChange }) => {
   const [oddsSign, setOddsSign] = useState("positive");

   const handleOddsSignChange = (event, newOddsSign) => {
      setOddsSign(newOddsSign);
   };

   return (
      <Grid
         container
         spacing={2}
         sx={{ my: 1, minHeight: 550 }}>
         <Grid
            item
            xs={12}>
            <Grid
               container
               direction="row"
               spacing={2}>
               <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <FormControl>
                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                           variant="standard"
                           type="amount"
                           autoFocus={true}
                           placeholder="Stake"
                           value={stake}
                           onChange={onStakeChange}
                           error={error}
                           helperText={error ? "Please enter a positive number." : ""}
                           sx={{ width: 280 }}
                           InputProps={{
                              startAdornment: <InputAdornment position="start">£</InputAdornment>,
                              style: { fontSize: "3rem", letterSpacing: "0.3rem", paddingLeft: ".5rem", paddingRight: "3rem" },
                           }}
                           inputProps={{ style: { textAlign: "center" }, maxLength: 6 }}
                        />
                        <ToggleButtonGroup
                           value={betslip.eachWay ? "Each Way" : "Win Only"}
                           exclusive
                           size="small"
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
                           onChange={onTypeChange}
                           sx={{ minWidth: 500, minHeight: 100, fontSize: "4rem", letterSpacing: "0.3rem", textAlign: "center" }}
                           MenuProps={{
                              PaperProps: {
                                 style: {
                                    maxHeight: "300px",
                                    overflow: "auto",
                                 },
                              },
                           }}
                           displayEmpty>
                           <MenuItem
                              value=""
                              disabled>
                              Select a bet type
                           </MenuItem>
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
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <Box
                     id="bet-info-container"
                     sx={{ m: 2, p: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", textAlign: "center", width: { md: 400, sm: 600 } }}>
                     <Card
                        sx={{
                           ":hover": {
                              boxShadow: 6,
                           },
                        }}>
                        <CardContent>
                           <Typography
                              variant="h2"
                              component="div">
                              Bet Info
                           </Typography>
                           <Divider sx={{ my: 1 }} />

                           <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", my: 1 }}>
                              <Typography
                                 variant="h4"
                                 component="div">
                                 Unit Stake: {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(stake)}
                              </Typography>
                              <Typography
                                 variant="h4"
                                 component="div">
                                 Total Stake: {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(betslip.eachWay ? stake * betTypeDescriptions[betslip.type].numBets * 2 : stake * betTypeDescriptions[betslip.type].numBets)}
                              </Typography>
                           </Box>

                           <Typography
                              variant="h4"
                              component="div">
                              {betslip.type.charAt(0).toUpperCase() + betslip.type.slice(1)}
                           </Typography>

                           <Typography
                              variant="body2"
                              color="text.secondary">
                              {betTypeDescriptions[betslip.type].description}
                           </Typography>
                        </CardContent>
                     </Card>
                  </Box>
               </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
               <Grid
                  container
                  spacing={0}
                  id="Yes"
                  sx={{ maxWidth: 950 }}>
                  <TransitionGroup
                     component={Grid}
                     container
                     item
                     xs={12}
                     spacing={1}>
                     {Array.from({ length: numSelections }).map((_, index) => (
                        <Grow
                           in={true}
                           key={index}>
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={numSelections === 1 ? 12 : 6}>
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
                                       justifyContent: "space-around",
                                       width: "100%",
                                       minWidth: "350px",
                                       elevation: 3,
                                       ":hover": {
                                          boxShadow: 6,
                                       },
                                    }}>
                                    <Grid item>
                                       <Typography
                                          variant="h3"
                                          sx={{ p: 1 }}>
                                          #{index + 1}
                                       </Typography>
                                    </Grid>
                                    <Divider
                                       orientation="vertical"
                                       sx={{ mr: 1 }}
                                    />
                                    <Grid
                                       item
                                       sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                       <FormControl>
                                          <Select
                                             variant="standard"
                                             sx={{ minWidth: "80px", mx: 1, textAlign: "center" }}
                                             value={position[index] !== undefined ? position[index] : 1}
                                             onChange={(event) => onPositionChange(index, parseInt(event.target.value, 10))}>
                                             <MenuItem value={1}>Won</MenuItem>
                                             <MenuItem value={2}>Placed</MenuItem>
                                             <MenuItem value={0}>Lost</MenuItem>
                                             <MenuItem value={-1}>Void</MenuItem>
                                          </Select>
                                       </FormControl>
                                       {showRule4 && (
                                          <Grid item>
                                             <FormControl>
                                                <Select
                                                   variant="standard"
                                                   displayEmpty
                                                   value={rule4Deduction[index] !== undefined ? rule4Deduction[index] : 0}
                                                   onChange={(event) => onRule4Change(index, event.target.value)}
                                                   sx={{ minWidth: "60px", mx: 1, textAlign: "center" }}>
                                                   <MenuItem
                                                      value=""
                                                      disabled>
                                                      Rule 4
                                                   </MenuItem>
                                                   <MenuItem value={0}>0%</MenuItem>
                                                   <MenuItem value={0.05}>5%</MenuItem>
                                                   <MenuItem value={0.1}>10%</MenuItem>
                                                   <MenuItem value={0.15}>15%</MenuItem>
                                                   <MenuItem value={0.2}>20%</MenuItem>
                                                   <MenuItem value={0.25}>25%</MenuItem>
                                                   <MenuItem value={0.3}>30%</MenuItem>
                                                   <MenuItem value={0.35}>35%</MenuItem>
                                                   <MenuItem value={0.4}>40%</MenuItem>
                                                   <MenuItem value={0.45}>45%</MenuItem>
                                                   <MenuItem value={0.5}>50%</MenuItem>
                                                   <MenuItem value={0.55}>55%</MenuItem>
                                                   <MenuItem value={0.6}>60%</MenuItem>
                                                   <MenuItem value={0.65}>65%</MenuItem>
                                                   <MenuItem value={0.7}>70%</MenuItem>
                                                   <MenuItem value={0.75}>75%</MenuItem>
                                                   <MenuItem value={0.8}>80%</MenuItem>
                                                   <MenuItem value={0.85}>85%</MenuItem>
                                                   <MenuItem value={0.9}>90%</MenuItem>
                                                   <MenuItem value={0.95}>95%</MenuItem>
                                                </Select>
                                             </FormControl>
                                          </Grid>
                                       )}
                                    </Grid>
                                    <Grid
                                       item
                                       sx={{ display: "flex", justifyContent: "center" }}>
                                       {oddsFormat === "decimal" ? (
                                          <TextField
                                             variant="standard"
                                             type="number"
                                             value={runners[index].odds}
                                             onChange={(event) => onDecimalChange(index, event.target.value)}
                                             onBlur={(event) => (event.target.value = parseFloat(event.target.value).toFixed(1))}
                                             sx={{ width: "70px" }}
                                             inputProps={{ style: { textAlign: "center" } }}
                                          />
                                       ) : oddsFormat === "fractional" ? (
                                          <Grid
                                             container
                                             id="fractions-container"
                                             alignItems="center"
                                             justifyContent="center">
                                             <Grid item>
                                                <TextField
                                                   variant="standard"
                                                   type="number"
                                                   value={runners[index] && runners[index].fractionalOdds ? runners[index].fractionalOdds.numerator : ""}
                                                   sx={{ width: "35px", mb: 1.5 }}
                                                   inputProps={{ style: { textAlign: "center" } }}
                                                   onChange={(event) => onFractionalChange(index, "numerator", event.target.value)}
                                                />
                                             </Grid>
                                             <Grid item>
                                                <Typography
                                                   variant="h2"
                                                   sx={{ mx: 1, mt: 1 }}>
                                                   /
                                                </Typography>
                                             </Grid>
                                             <Grid item>
                                                <TextField
                                                   variant="standard"
                                                   type="number"
                                                   value={runners[index] && runners[index].fractionalOdds ? runners[index].fractionalOdds.denominator : ""}
                                                   sx={{ width: "35px", mt: 1.5 }}
                                                   inputProps={{ style: { textAlign: "center" } }}
                                                   onChange={(event) => onFractionalChange(index, "denominator", event.target.value)}
                                                />
                                             </Grid>
                                          </Grid>
                                       ) : (
                                          <Grid
                                             container
                                             id="american-container"
                                             alignItems="center"
                                             justifyContent="center">
                                             <ToggleButtonGroup
                                                value={oddsSign}
                                                exclusive
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onChange={handleOddsSignChange}>
                                                <ToggleButton value="positive">+</ToggleButton>
                                                <ToggleButton value="negative">-</ToggleButton>
                                             </ToggleButtonGroup>
                                             <TextField
                                                variant="standard"
                                                type="number"
                                                defaultValue="100"
                                                onBlur={(event) => onAmericanChange(index, `${oddsSign === "positive" ? "+" : "-"}${event.target.value}`)}
                                                sx={{ width: "60px" }}
                                                inputProps={{ style: { textAlign: "center" } }}
                                             />
                                          </Grid>
                                       )}
                                    </Grid>
                                    <Grid item>
                                       <FormControl>
                                          <Select
                                             variant="standard"
                                             value={terms[index] || "1/4"}
                                             onChange={(event) => onTermsChange(index, event.target.value)}
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
      </Grid>
   );
};

export default Calculator;
