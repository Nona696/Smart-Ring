
import React, { useState, useEffect } from 'react';
import { Activity, Battery, Moon } from 'lucide-react';
import HealthChart from '@/components/HealthChart';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const generateOxygenData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * 5) + 95
  }));
};

const BloodOxygen: React.FC = () => {
  const [currentOxygen, setCurrentOxygen] = useState(98);
  const [fatigueLevel, setFatigueLevel] = useState(22); // Percentage
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [oxygenData, setOxygenData] = useState(generateOxygenData());

  // Simulate oxygen measurement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMeasuring) {
      // Simulate oxygen fluctuation
      interval = setInterval(() => {
        const newOxygen = Math.floor(Math.random() * 3) + 96;
        setCurrentOxygen(newOxygen);
        
        // Update fatigue level based on oxygen
        const newFatigue = Math.max(0, 100 - newOxygen * 0.8);
        setFatigueLevel(Math.floor(newFatigue));
      }, 1000);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        setIsMeasuring(false);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMeasuring]);

  const startMeasurement = () => {
    setIsMeasuring(true);
  };

  // Helper to determine fatigue level text
  const getFatigueLevelText = (level: number) => {
    if (level < 20) return "Low";
    if (level < 50) return "Moderate";
    return "High";
  };

  return (
    <div className="pt-6 pb-20 px-4 min-h-screen bg-gradient-to-b from-bloodOxygen/10 to-white">
      <div className="animate-fade-in">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-bloodOxygen">Blood Oxygen</h1>
          <p className="text-gray-500">Monitor your SpO2 levels</p>
        </header>

        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className={`w-24 h-24 rounded-full bg-bloodOxygen/10 flex items-center justify-center ${isMeasuring ? 'pulse-animation' : ''}`}>
              <Activity className={`w-10 h-10 text-bloodOxygen ${isMeasuring ? 'animate-pulse' : ''}`} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <p className="text-sm font-bold">{currentOxygen}%</p>
            </div>
          </div>
          
          <p className="text-gray-500 mb-4">Current SpO2</p>
          
          <Button 
            className={`w-full ${isMeasuring ? 'bg-gray-400' : 'bg-bloodOxygen hover:bg-bloodOxygen/80'}`}
            onClick={startMeasurement}
            disabled={isMeasuring}
          >
            {isMeasuring ? 'Measuring...' : 'Measure Now'}
          </Button>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-bloodOxygen/10 flex items-center justify-center mr-4">
                <Activity className="w-5 h-5 text-bloodOxygen" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Blood Oxygen</p>
                <p className="font-semibold text-lg">{currentOxygen}%</p>
                <p className="text-xs text-gray-400">Normal range: 95-100%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-bloodOxygen/10 flex items-center justify-center mr-4">
                <Battery className="w-5 h-5 text-bloodOxygen" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fatigue Level</p>
                <p className="font-semibold text-lg">{getFatigueLevelText(fatigueLevel)}</p>
                <p className="text-xs text-gray-400">{fatigueLevel}% tired</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-md font-semibold mb-4">SpO2 History</h3>
          <HealthChart 
            data={oxygenData} 
            dataKey="value" 
            color="#06B6D4" 
            gradientColor="#06B6D4" 
            title="SpO2 throughout the day"
            unit="%"
            height={180}
            showGrid={true}
          />
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-bloodOxygen/10 flex items-center justify-center mr-3">
                <Moon className="w-4 h-4 text-bloodOxygen" />
              </div>
              <div>
                <p className="text-sm">Sleep Oxygen Average</p>
                <p className="text-xs text-gray-500">Your average SpO2 during sleep was 97%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodOxygen;
