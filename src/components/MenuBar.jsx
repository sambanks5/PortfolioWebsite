import React, { useState } from 'react';
import { projectLinks, colors } from './GravityBackground';
import { AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, SwipeableDrawer, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MenuBar = ({ setSelectedProject }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const list = () => (
        <Box
            sx={{
                width: 250,
                backgroundColor: '#f0f0f0', // Change background color
                height: '100%',
                borderRadius: '0 10px 10px 0', // Change shape
                padding: 2,
                color: 'grey',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography variant="h4" sx={{ textAlign: 'left'}}>
                Projects
            </Typography>
            <List>
                {projectLinks.slice(1).map((link, index) => {
                    const color = colors[index + 1]; 
                    return (
                        <ListItem key={link.id} onClick={() => setSelectedProject(link.id)} sx={{ '&:hover': { backgroundColor: `#${color.toString(16)}` } }}>
                            <ListItemText primary={link.name} />
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            <List>
                <ListItem button component="a" href="https://github.com/sambanks5" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="GitHub" />
                </ListItem>
                <ListItem button component="a" href="https://www.linkedin.com/in/sam-banks-524161161/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="LinkedIn" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ boxShadow: "none", color: "black", opacity: 0.6, transition: "opacity 0.5s", '&:hover': { opacity: 1 } }} color='transparent'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h2" style={{ flexGrow: 1 }}>
                        Sam Banks
                    </Typography>
                    {/* <IconButton href="https://github.com/sambanks5" target="_blank" rel="noopener noreferrer" color="inherit">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/sam-banks-524161161/" target="_blank" rel="noopener noreferrer" color="inherit">
                        <LinkedInIcon />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{ boxShadow: "none", color: "black" }}
            >
                {list()}
            </SwipeableDrawer>
        </>
    );
};

export default MenuBar;