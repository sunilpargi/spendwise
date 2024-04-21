import React, { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Create and export the useTheme hook
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Create and export the ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
