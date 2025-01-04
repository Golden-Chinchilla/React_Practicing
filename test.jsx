import React, { createContext, useContext, useState } from 'react';

// 创建一个 Context 对象
const ThemeContext = createContext('light');

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const ThemedComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <p>The current theme is {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <ThemedComponent />
        </ThemeProvider>
    );
};

export default App;