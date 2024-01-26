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

   // Betslip
   const [betslip, setBetslip] = useState({
      stake: "",
      type: "single",
      eachWay: false,
   });
   // Runners Array
   const [runners, setRunners] = useState([]);

   // Other State Variables
   const [result, setResult] = useState(null);
   const [stake, setStake] = useState("");
   const [error, setError] = useState(false);
   const [oddsFormat, setOddsFormat] = useState("fractional");
   const [showRule4, setShowRule4] = useState(false);
   const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);
   const [terms, setTerms] = useState(Array(numSelections).fill("1/4"));
   const [position, setPosition] = useState(Array(betslip.selections).fill(1));
   const betslipRef = React.useRef(null);

   // No Idea
   const [key, setKey] = React.useState(0);

   // Errors
   const [showAmericanOddsError, setShowAmericanOddsError] = useState(false);
   const [showStakeAlert, setShowStakeAlert] = useState(false);

   console.log(runners);

   const initializeRunners = (numSelections) => {
      setRunners((prevRunners) => {
         if (numSelections > prevRunners.length) {
            const newRunners = [...prevRunners];
            for (let i = prevRunners.length; i < numSelections; i++) {
               newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
            }
            setPosition((prevPosition) => [...prevPosition, ...new Array(numSelections - prevPosition.length).fill(1)]);
            return newRunners;
         } else if (numSelections < prevRunners.length) {
            setPosition((prevPosition) => prevPosition.slice(0, numSelections));
            return prevRunners.slice(0, numSelections);
         } else {
            return prevRunners;
         }
      });

      setTerms((prevTerms) => {
         if (numSelections > prevTerms.length) {
            return [...prevTerms, ...new Array(numSelections - prevTerms.length).fill("1/4")];
         } else if (numSelections < prevTerms.length) {
            return prevTerms.slice(0, numSelections);
         } else {
            return prevTerms;
         }
      });
   };

   useEffect(() => {
      initializeRunners(numSelections);
   }, [numSelections]);

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

   const handleOddsChange = (index, value) => {
      if (!value) {
         return;
      }

      setRunners((prevRunners) => {
         const newRunners = [...prevRunners];
         const decimalOdds = oddsConverter(value).decimal;
         newRunners[index] = { ...newRunners[index], odds: decimalOdds };
         return newRunners;
      });
   };

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

   const handlePlaceTermsChange = (index, value) => {
      setTerms((prevTerms) => {
         const newTerms = [...prevTerms];
         newTerms[index] = value;
         return newTerms;
      });
   };

   useEffect(() => {
      setRunners((prevRunners) => {
         return prevRunners.map((runner, index) => {
            return { ...runner, terms: terms[index] };
         });
      });
   }, [terms]);

   const handleFabClick = () => {
	betslipRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
	// Capture the current stake and number of bets
	const currentStake = stake;
	const currentNumBets = betTypeDescriptions[betslip.type].numBets;
  
	// Calculate the result and include the current stake and number of bets
	const newResult = calculateResult();
	if (newResult) {
	  newResult.stake = currentStake;
	  newResult.numBets = currentNumBets;
  
	  setResult(newResult);
	  setKey(prevKey => prevKey + 1); // increment key
	}
  };

  const calculateResult = () => {
	console.log("betslip:", betslip);
	if (betslip && typeof betslip === "object" && betslip !== null && "type" in betslip && "eachWay" in betslip) {
	  if (stake === 0 || stake === "") {
		setShowStakeAlert(true);
		setTimeout(() => {
		  setShowStakeAlert(false);
		}, 3000);
		return;
	  } else {
		return calculator(betslip, runners);
	  }
	}
  };

   return (
      <Container maxWidth>
         <Header
            oddsFormat={oddsFormat}
            showRule4={showRule4}
            setShowRule4={setShowRule4}
            setOddsFormat={setOddsFormat}
            handleFabClick={handleFabClick}
         />

         <Container
            id="inner-container"
            maxWidth="lg">
            <Calculator
               betslip={betslip}
               betTypeDescriptions={betTypeDescriptions}
               oddsFormat={oddsFormat}
               showRule4={showRule4}
               stake={stake}
               position={position}
               terms={terms}
               numSelections={numSelections}
               error={error}
               setBetslip={setBetslip}
               onStakeChange={handleStakeChange}
               onTypeChange={handleTypeChange}
               onPositionChange={handlePositionChange}
               onTermsChange={handlePlaceTermsChange}
               onDecimalChange={handleOddsChange}
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
               message="Invalid American odds entered. Please enter valid odds!"
               onClose={() => setShowAmericanOddsError(false)}
            />

            <Grid
               id="betslip-container"
               item
               sm={12}>
               <Betslip
                  betslip={betslip}
                  handleFabClick={handleFabClick}
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
