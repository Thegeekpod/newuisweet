"use client";
import React, { lazy } from 'react';
import { ThemeProvider } from './hooks/ThemeContext';
const Main2 = lazy(() => import('./main2'));
const Main = ({ children }) => {

    return (
        <ThemeProvider>
            <Main2>
            {children}
            </Main2>
        </ThemeProvider>
    );
}

export default Main;
