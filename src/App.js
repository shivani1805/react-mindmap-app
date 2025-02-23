import React, { useState } from 'react';
import Mindmap from './components/Mindmap';
import { Button, TextField } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay'; 
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 


const App = () => {
    const [topic, setTopic] = useState("");
    const [submittedTopic, setSubmittedTopic] = useState("");

    const handleSearch = () => {
        if (topic.trim() !== "") {
            setSubmittedTopic(topic);
        }
    };

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

                {/* Pass the entered topic to the Mindmap component */}
                {submittedTopic && <Mindmap topic={submittedTopic} />}
            </div>

    );
};

export default App;
