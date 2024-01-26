import React from "react";
import { Typography, Box, Card, Divider, Grow, Fab } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";

const Betslip = React.forwardRef(({ handleFabClick, result, key }, ref) => {
   return (
      <Card
         ref={ref}
         sx={{ p: 2 }}
         >
         <Box sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", textAlign: "center" }}>
            <Grow in={!!result}>
               <Typography
                  variant="h2"
                  sx={{ p: 1, width: 200, fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" } }}>
                  {result ? `Unit Stake: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.stake)}` : "Unit Stake: £0.00"}
               </Typography>
            </Grow>
            <Divider
               orientation="vertical"
               flexItem
            />
            <Grow in={!!result}>
               <Typography
                  variant="h2"
                  sx={{ p: 1, width: 200, fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" } }}>
                  {result ? `Total Stake: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.totalStake)}` : "Total Stake: £0.00"}
               </Typography>
            </Grow>
            <Divider
               orientation="vertical"
               flexItem
            />
            <Grow in={!!result}>
               <Typography
                  variant="h2"
                  sx={{ p: 1, width: 200,fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" } }}>
                  {result ? `Number of Bets: ${result.numBets}` : "Number of Bets: 0"}
               </Typography>
            </Grow>
         </Box>
         <Divider sx={{my: 1}}/>
         <Box sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", textAlign: "center" }}>
            <Grow in={!!result}>
               <Typography
                  variant="h2"
                  sx={{ p: 1, width: 200, fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" } }}>
                  {result ? `Returns: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.returns)}` : "Returns: £0.00"}
               </Typography>
            </Grow>
            <Divider
               orientation="vertical"
               flexItem
            />
            <Grow in={!!result}>
               <Typography
                  variant="h2"
                  sx={{ p: 1, width: 200, fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem" } }}>
                  {result ? `Profit: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.profit)}` : "Profit: £0.00"}
               </Typography>
            </Grow>
         </Box>
         <Box sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", textAlign: "center" }}>
            <Fab
               color="secondary"
               variant="extended"
               aria-label="calc"
               onClick={handleFabClick}>
               <CalculateIcon sx={{ mr: 1 }} />
               Calculate
            </Fab>
         </Box>
      </Card>
   );
});

export default Betslip;
