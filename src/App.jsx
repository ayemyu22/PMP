import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Techniques from './pages/Techniques.jsx';
import TechniqueDetail from './pages/TechniqueDetail.jsx';
import LessonPlanner from './pages/LessonPlanner.jsx';
import PageNotFound from './lib/PageNotFound.jsx';

export default function App() {
  return (
    <BrowserRouter basename="/PMP">
      <Routes>
        {/* Automatic redirect from base URL to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Application Routes */}
        <Route path="/dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
        <Route path="/techniques" element={<Layout currentPageName="Techniques"><Techniques /></Layout>} />
        <Route path="/techniquedetail" element={<Layout currentPageName="TechniqueDetail"><TechniqueDetail /></Layout>} />
        <Route path="/lessonplanner" element={<Layout currentPageName="LessonPlanner"><LessonPlanner /></Layout>} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}