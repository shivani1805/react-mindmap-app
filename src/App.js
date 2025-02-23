import React, { useState } from 'react';
import Mindmap from './components/Mindmap';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import IconButton from '@mui/material/IconButton';

const App = () => {
    const [topic, setTopic] = useState("Data Science"); // Default topic
    const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);

    return (
        <div style={{ textAlign: "center" }}>

            {/* Top Navigation Bar */}
            <AppBar position="static" sx={{ bgcolor: "#2C3E50", padding: "10px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    
                    {/* Left-aligned "Think Flow" Title */}
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#EDE8D0" }}>
                        Think Flow
                    </Typography>

                    {/* Center-aligned Topic Name */}
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                        {topic}
                    </Typography>

                    {/* Right-aligned Dyslexia Mode Button */}
                    <IconButton
                        onClick={() => setIsDyslexiaMode(!isDyslexiaMode)}
                        sx={{
                            bgcolor: isDyslexiaMode ? '#EDE8D0' : 'lightgrey',
                            color: 'black',
                            borderRadius: '50%',
                            width: 42,
                            height: 42,
                            boxShadow: 2,
                            '&:hover': { bgcolor: isDyslexiaMode ? '#EDE8D0' : '#f0f0f0' }
                        }}
                    >
                        <AccessibilityNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Pass the selected topic to the Mindmap component */}
            <Mindmap topic={topic} isDyslexiaMode={isDyslexiaMode} />
        </div>
    );
};

export default App;
