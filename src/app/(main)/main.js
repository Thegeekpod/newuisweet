"use client";
import React, { lazy } from 'react';
import { ThemeProvider } from './hooks/ThemeContext';
import { useSelectedLayoutSegment } from 'next/navigation';
const Main2 = lazy(() => import('./main2'));
const Main = ({ children }) => {
    const router =useSelectedLayoutSegment();
    return (
        <ThemeProvider>
            <Main2 pagename={router}>
            {children}
            </Main2>
        </ThemeProvider>
    );
}

export default Main;
