import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ListView from './components/ListView';
import EditCreateView from './components/EditCreateView';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/view" />}/>
          <Route path="/view" element={<ListView />} />
          <Route path="/view/:id" element={<EditCreateView />} />
          <Route path="/view/new" element={<EditCreateView />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
