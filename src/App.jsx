import React, { useState, useEffect, useRef, useCallback } from "react";
import GravityBackground from "./components/GravityBackground.jsx";
import LinkDisplay from "./components/TitleText.jsx";
import { Container, Fade, Box, IconButton, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box2D from "box2dweb";
import projects from "./projects.json"; // Import the JSON file

function App() {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const worldRef = useRef(null);

    // Output the selected project ID for debugging
    useEffect(() => {
        console.log("Selected Project ID:", selectedProjectId);
    }, [selectedProjectId]);

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    const toggleGravity = useCallback((isOn, direction = null) => {
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
    }, []);

    const handleClick = useCallback((projectId) => {
        setSelectedProjectId(projectId);
        if (projectId === null) {
            // Get the current gravity direction
            const currentGravity = worldRef.current.GetGravity();
            let currentDirection;
            if (currentGravity.y < 0) {
                currentDirection = 'N';
            } else if (currentGravity.y > 0) {
                currentDirection = 'S';
            } else if (currentGravity.x > 0) {
                currentDirection = 'E';
            } else {
                currentDirection = 'W';
            }

            // Set gravity to a random direction excluding the current one
            const directions = ['N', 'S', 'E', 'W'].filter(dir => dir !== currentDirection);
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            if (randomDirection !== currentDirection) {
                toggleGravity(true, randomDirection);
            }
        } else {
            toggleGravity(false);
        }
    }, [toggleGravity]);

    const handleSetHoveredLink = useCallback((linkId) => {
        setHoveredLink(linkId);
    }, []);



    return (
        <Fade in={true} timeout={500}>
            <Container maxWidth="True">
                {/* <ProjectKey/> */}
                <Box className="nameContact" sx={{ position: "absolute", top: 5, left: 15, color: "Black", display: "flex", alignItems: "center", gap: 1, opacity: 0.6, transition: "opacity 0.5s", '&:hover': {opacity: 1}}} >
                    <Typography variant="h1">Sam Banks</Typography>
                    <IconButton href="https://github.com/sambanks5" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon sx={{ color: "#000000", fontSize: 25 }} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/sam-banks-524161161/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon sx={{ color: "#000000", fontSize: 25 }} />
                    </IconButton>
                </Box>
                <GravityBackground setSelectedProject={handleClick} toggleGravity={toggleGravity} setHoveredLink={handleSetHoveredLink} worldRef={worldRef} />
                <LinkDisplay setSelectedProject={handleClick} hoveredLink={hoveredLink} project={selectedProject} onClick={() => handleClick(selectedProjectId)} />
            </Container>
        </Fade>
    );
}

export default App;