import React, { useState } from 'react';
import Mindmap from './components/Mindmap';
import { Button, TextField } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay'; 
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { IconButton } from '@mui/material';


const App = () => {
    const [topic, setTopic] = useState("");
    const [submittedTopic, setSubmittedTopic] = useState("");

    const handleSearch = () => {
        if (topic.trim() !== "") {
            setSubmittedTopic(topic);
        }
    };

    const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);

    return (

            <div style={{ textAlign: "center", padding: "20px" }}>
                <h1>Mindmap Explorer</h1>

                {/* Input Field for Topic */}
                <TextField 
                    label="Enter Topic" 
                    variant="outlined" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    sx={{ marginBottom: 2, width: "300px" }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleSearch} 
                    sx={{ marginLeft: "10px" }}
                >
                    Search
                </Button>
                <IconButton
                    onClick={() => setIsDyslexiaMode(!isDyslexiaMode)}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: isDyslexiaMode ? '#007BFF' : 'lightgrey',
                        color: isDyslexiaMode ? 'white' : 'black',
                        borderRadius: '50%',
                        width: 42,
                        height: 42,
                        boxShadow: 2,
                        '&:hover': { bgcolor: isDyslexiaMode ? '#0056b3' : '#f0f0f0' }
                    }}
                >
                    <AccessibilityNewIcon />
                </IconButton>

                {/* Pass the entered topic to the Mindmap component */}
                {submittedTopic && <Mindmap topic={submittedTopic} isDyslexiaMode={isDyslexiaMode}/>}
            </div>

    );
};

export default App;
