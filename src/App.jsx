import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Calculator from "./components/calculator.jsx";
import Betslip from "./components/betslip";
import ErrorMessage from "./components/error";
import "./App.css";
import { Container, Grid } from "@mui/material";
import { calculator, betTypes } from "./betcruncher";

function App() {
   const oddsConverter = require("./oddsconverter.js");
   const betTypeDescriptions = {
      single: {
         description: "Arguably the most common betting type. A straight win bet, placed on a single event.",
         numBets: 1,
      },
      double: {
         description: "A single bet on two outcomes in different events. Both selections must win to guarantee a return.",
         numBets: 1,
      },
      treble: {
         description: "A single bet on three outcomes in different events. All three selections must win to guarantee a return.",
         numBets: 1,
      },
      fourfold: {
         description: "An accumulator that comprises of four selections in one bet. All of the selections must win to guarantee a return.",
         numBets: 1,
      },
      fivefold: {
         description: "An accumulator that comprises of five selections in one bet. All of the selections must win to guarantee a return.",
         numBets: 1,
      },
      sixfold: {
         description: "An accumulator that comprises of six selections in one bet. All of the selections must win to guarantee a return.",
         numBets: 1,
      },
      sevenfold: {
         description: "An accumulator that comprises of seven selections in one bet. All of the selections must win to guarantee a return.",
         numBets: 1,
      },
      eightfold: {
         description: "An accumulator that comprises of eight selections in one bet. All of the selections must win to guarantee a return.",
         numBets: 1,
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

   // BETSLIP STATE
   const [betslip, setBetslip] = useState({
      stake: "",
      type: "single",
      eachWay: false,
   });
   // RUNNERS ARRAY
   const [runners, setRunners] = useState([]);
   // STATE VARIABLES
   const [result, setResult] = useState(null);
   const [stake, setStake] = useState("");
   const [error, setError] = useState(false);
   const [oddsFormat, setOddsFormat] = useState("fractional");
   const [rule4Deduction, setRule4Deduction] = React.useState([]);
   const [showRule4, setShowRule4] = useState(false);
   const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);
   const [terms, setTerms] = useState(Array(numSelections).fill("1/4"));
   const [position, setPosition] = useState(Array(betslip.selections).fill(1));
   const betslipRef = React.useRef(null);

   // NO CLUE
   const [key, setKey] = React.useState(0);

   // ERROR STATES
   const [showAmericanOddsError, setShowAmericanOddsError] = useState(false);
   const [showDecimalOddsError, setShowDecimalOddsError] = useState(false);
   const [showStakeAlert, setShowStakeAlert] = useState(false);

   // INITIALIZE RUNNERS
   const initializeRunners = (numSelections) => {
      
      setRunners((prevRunners) => {
         const newRunners = [...prevRunners];
         for (let i = 0; i < numSelections; i++) {
            if (i >= newRunners.length) {
               newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
            } else {
               const convertedOdds = oddsConverter(newRunners[i].odds)[oddsFormat];
               newRunners[i].odds = convertedOdds;
            }
         }
         setPosition((prevPosition) => {
            const additionalPositions = numSelections - prevPosition.length;
            return [...prevPosition, ...new Array(additionalPositions > 0 ? additionalPositions : 0).fill(1)];
         });
         return newRunners.slice(0, numSelections);
      });

      setTerms((prevTerms) => {
         const additionalTerms = numSelections - prevTerms.length;
         if (additionalTerms > 0) {
            return [...prevTerms, ...new Array(additionalTerms).fill("1/4")];
         } else if (additionalTerms < 0) {
            return prevTerms.slice(0, numSelections);
         } else {
            return prevTerms;
         }
      });
   };

   // INITIALIZE RUNNERS ON CHANGE OF FORMAT OR NUMBER OF SELECTIONS
   useEffect(() => {
      initializeRunners(numSelections);
   }, [oddsFormat, numSelections]);

   
   // WIN OR EACH WAY
   const handleTypeChange = (event) => {
      const type = event.target.value;
      setBetslip({ ...betslip, type });
      setNumSelections(betTypes[type]?.selections || 0);
   };

   // STAKE CHANGE HANDLER
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

   // POSITION CHANGE HANDLER
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

   const handleDecimalOddsChange = (index, value) => {
      if (!value) {
        return;
      }
    
      setRunners((prevRunners) => {
        const newRunners = [...prevRunners];
        try {
          const decimalOdds = oddsConverter(value).decimal;
          newRunners[index] = { ...newRunners[index], odds: decimalOdds };
        } catch (error) {
          setShowDecimalOddsError(true);
        }
        return newRunners;
      });
    };

   // FRACTIONAL ODDS CHANGE HANDLER
   const handleFractionalOddsChange = (index, part, value) => {
      if (!value) {
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
         const decimalOdds = oddsConverter(fractionalOdds).decimal;
         newRunners[index] = { ...newRunners[index], odds: decimalOdds, fractionalOdds: currentOdds };
         return newRunners;
      });
   };

   // AMERICAN ODDS CHANGE HANDLER
   const handleAmericanOddsChange = (index, value) => {
      if (!value || isNaN(value)) {
         return;
      }

      setRunners((prevRunners) => {
         const newRunners = [...prevRunners];
         try {
            const americanOdds = oddsConverter(value).american;
            newRunners[index] = { ...newRunners[index], odds: americanOdds };
         } catch (error) {
            setShowAmericanOddsError(true);
            setTimeout(() => {
               setShowAmericanOddsError(false);
            }, 3000);
         }
         return newRunners;
      });
   };

   // PLACE TERMS CHANGE HANDLER
   const handlePlaceTermsChange = (index, value) => {
      setTerms((prevTerms) => {
         const newTerms = [...prevTerms];
         newTerms[index] = value;
         return newTerms;
      });
   };

   // RULE 4 DEDUCTION CHANGE HANDLER
   const handleRule4DeductionChange = (index, newValue) => {
      setRule4Deduction((prevRule4Deduction) => {
         const newRule4Deduction = [...prevRule4Deduction];
         newRule4Deduction[index] = newValue;
         return newRule4Deduction;
      });
   };
   useEffect(() => {
      setRunners((prevRunners) => {
         return prevRunners.map((runner, index) => {
            return { ...runner, terms: terms[index] };
         });
      });
   }, [terms]);

   // CALCULATE BUTTON HANDLER
   const handleCalculateButton = () => {
      betslipRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

      // Capture the current stake and number of bets
      const currentStake = stake;
      const currentNumBets = betTypeDescriptions[betslip.type].numBets;

      // Calculate the result and include the current stake and number of bets
      const newResult = calculateResult();
      if (newResult) {
         newResult.stake = currentStake;
         newResult.numBets = currentNumBets;

         setResult(newResult);
         setKey((prevKey) => prevKey + 1); // increment key
      }
   };

   // CALCULATE RESULT
   const calculateResult = () => {
      if (betslip && typeof betslip === "object" && betslip !== null && "type" in betslip && "eachWay" in betslip) {
         if (stake === 0 || stake === "") {
            setShowStakeAlert(true);
            setTimeout(() => {
               setShowStakeAlert(false);
            }, 3000);
            return;
         } else {
            // Apply Rule 4 deductions to each runner's odds
            const runnersWithDeductions = runners.map((runner, index) => {
               const deduction = rule4Deduction[index];
               return {
                  ...runner,
                  odds: formatOdds(runner.odds, deduction),
               };
            });
            console.log(runnersWithDeductions);
            return calculator(betslip, runnersWithDeductions);
         }
      }
   };

   // FORMAT ODDS TO DECIMAL BEFORE CALCULATION, APPLY DEDUCTIONS
   const formatOdds = (odds, deduction = 0) => {
      // Convert the odds to decimal format
      const convertedOdds = oddsConverter(odds).decimal;

      const winnings = convertedOdds - 1; // winnings are odds minus stake
      const deductionApplied = winnings - winnings * deduction;

      // Add the stake back to get the final odds
      return 1 + deductionApplied;
   };

   return (
      <Container maxWidth>
         <Header
            oddsFormat={oddsFormat}
            showRule4={showRule4}
            setShowRule4={setShowRule4}
            setOddsFormat={setOddsFormat}
            handleCalculateButton={handleCalculateButton}
         />

         <Container
            id="inner-container"
            maxWidth="lg">
            <Calculator
               runners={runners}
               betslip={betslip}
               betTypeDescriptions={betTypeDescriptions}
               oddsFormat={oddsFormat}
               showRule4={showRule4}
               rule4Deduction={rule4Deduction}
               stake={stake}
               position={position}
               terms={terms}
               numSelections={numSelections}
               error={error}
               setBetslip={setBetslip}
               onStakeChange={handleStakeChange}
               onTypeChange={handleTypeChange}
               onRule4Change={handleRule4DeductionChange}
               onPositionChange={handlePositionChange}
               onTermsChange={handlePlaceTermsChange}
               onDecimalChange={handleDecimalOddsChange}
               onFractionalChange={handleFractionalOddsChange}
               onAmericanChange={handleAmericanOddsChange}
            />

            <ErrorMessage
               show={showStakeAlert}
               message="Please enter a stake"
               onClose={() => setShowStakeAlert(false)}
            />

            <ErrorMessage
               show={showAmericanOddsError}
               message="Invalid American odds entered."
               onClose={() => setShowAmericanOddsError(false)}
            />

            <ErrorMessage
               show={showDecimalOddsError}
               message="Invalid decimal odds entered. "
               onClose={() => setShowDecimalOddsError(false)}
            />

            <Grid
               id="betslip-container"
               item
               sm={12}>
               <Betslip
                  betslip={betslip}
                  handleCalculateButton={handleCalculateButton}
                  betTypeDescriptions={betTypeDescriptions}
                  stake={stake}
                  result={result}
                  key={key}
                  ref={betslipRef}
               />
            </Grid>
         </Container>
      </Container>
   );
}

export default App;
