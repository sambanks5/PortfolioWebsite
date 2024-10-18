import React, { useState, useEffect, useRef } from "react";
import GravityBackground from "./components/GravityBackground.jsx";
import LinkDisplay from "./components/TitleText.jsx";

import { Container, Fade } from "@mui/material";
import Box2D from "box2dweb";

const projects = [
   { id: 2, name: "Bet Monitor", header: "Custom Software for a Gambling Operator", description: "A tool built for office staff containing a bet feed, live betting pattern analysis, daily/monthly reporting capabilities as well as various QOL utilities for other tasks.\nBuilt using Python and SQL with Tkinter UI, it now performs a vital role in the company for in-house traders, giving them quick information and assistance at a glance.\nLinks to Pipedrive, Google and internal company API's for up to date client and compliance information.", languages: ["Python", "SQLite"], github: "https://github.com/yourusername/bet-monitor" },
   { id: 3, name: "Bet Calculator", header: "A react frontend for Betcruncher.js by Catena-Media.", description: "Working for a gambling operator, we regularly use online bet calculators to work out potential returns, check payouts are correct & break down the workings of a wager for clients.\n\nBetcruncher.js is a bet calculator engine made in javascript (https://github.com/Catena-Media/betcruncher).\n\nI wanted an excuse to use React, so used it to make a simple frontend with MUI components.", languages: ["JavaScript", "React", "MUI"], github: "https://github.com/sambanks5/BetCalculator" },
   { id: 4, name: "PlaysTV Scraper", header: "", description: "Description for Project Two\n", languages: ["Python", "BeautifulSoup"], github: "https://github.com/yourusername/playstv-scraper" },
   { id: 5, name: "Contact", header: "", description: "Contact me below.\n", languages: ["HTML", "CSS"], github: "https://github.com/yourusername/contact" },
];

function App() {
   const [selectedProjectId, setSelectedProjectId] = useState(null);
   const [hoveredLink, setHoveredLink] = useState(null);

   const worldRef = useRef(null);

   useEffect(() => {
      console.log("Selected Project ID:", selectedProjectId);
   }, [selectedProjectId]);

   const selectedProject = projects.find(project => project.id === selectedProjectId);

   const handleClick = (projectId) => {
      setSelectedProjectId(projectId);
      toggleGravity(true);
   };

   const toggleGravity = (isOn, direction = null) => {
      const world = worldRef.current;
      if (world) {
          let newGravity;
          if (isOn) {
              switch (direction) {
                  case 'N':
                      newGravity = new Box2D.Common.Math.b2Vec2(0, -60);
                      break;
                  case 'S':
                      newGravity = new Box2D.Common.Math.b2Vec2(0, 60);
                      break;
                  case 'E':
                      newGravity = new Box2D.Common.Math.b2Vec2(60, 0);
                      break;
                  case 'W':
                      newGravity = new Box2D.Common.Math.b2Vec2(-60, 0);
                      break;
                  default:
                      newGravity = new Box2D.Common.Math.b2Vec2(0, -60);
              }
          } else {
              newGravity = new Box2D.Common.Math.b2Vec2(0, 0);
          }
          world.SetGravity(newGravity);
  
          for (let body = world.GetBodyList(); body; body = body.GetNext()) {
              if (isOn) {
                  body.SetLinearDamping(0.5);
                  body.SetAngularDamping(0.5);
              } else {
                  body.SetLinearDamping(0);
                  body.SetAngularDamping(0);
              }
              body.SetAwake(true);
          }
      }
  };

   return (
      <Fade in={true} timeout={500}>
         <Container maxWidth="True">
            <GravityBackground setSelectedProject={handleClick} toggleGravity={toggleGravity} setHoveredLink={setHoveredLink} worldRef={worldRef} />
            <LinkDisplay hoveredLink={hoveredLink} project={selectedProject} onClick={() => handleClick(selectedProjectId)} />
         </Container>
      </Fade>
   );
}

export default App;