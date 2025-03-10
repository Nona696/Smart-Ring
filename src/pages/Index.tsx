
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Walking from '@/pages/Walking';
import Sleep from '@/pages/Sleep';
import HeartRate from '@/pages/HeartRate';
import BloodOxygen from '@/pages/BloodOxygen';
import RingConnection from '@/components/RingConnection';
import { toast } from '@/hooks/use-toast'; // Korrigierter Import

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to walking page by default
    if (window.location.pathname === '/') {
      navigate('/walking');
    }
    
    // Welcome toast
    setTimeout(() => {
      toast({
        title: "Willkommen bei SmartRing Health",
        description: "Verbinde deinen Smart Ring, um mit der Überwachung deiner Gesundheitswerte zu beginnen",
      });
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">SmartRing Health</h1>
        <RingConnection />
      </div>
      
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/walking" replace />} />
          <Route path="/walking" element={<Walking />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/heart-rate" element={<HeartRate />} />
          <Route path="/blood-oxygen" element={<BloodOxygen />} />
        </Routes>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;
