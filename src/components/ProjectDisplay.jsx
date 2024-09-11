import React from "react";
import { Typography, Link, Box } from "@mui/material";

function ProjectDisplay({ project }) {
   return (
      <Box sx={{ position:'fixed', top: '20px'}}>
         <Typography variant="h4" component="h2">
            {project.name}
         </Typography>
      </Box>
   );
}

export default ProjectDisplay;