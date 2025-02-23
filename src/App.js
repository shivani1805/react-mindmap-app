import React from 'react';
import Mindmap from './components/Mindmap';
import { ThemeProvider, useTheme } from './components/ThemeContext'; // Import the ThemeProvider and useTheme
import { Button } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay'; // Moon icon
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} >
            {theme === 'light' ? <NightsStayIcon /> : <WbSunnyIcon />}
        </Button>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <div>
               {/* // <h1 style={{ textAlign: 'center' }}>Mindmap</h1> */}
                <ThemeToggleButton /> {/* Add the toggle button */}
                <Mindmap />
                {/* <Flashcard /> */}
            </div>
        </ThemeProvider>
    );
};

export default App;
