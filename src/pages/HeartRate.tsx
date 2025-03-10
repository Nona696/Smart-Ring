
import React, { useState, useEffect } from 'react';
import { Heart, TrendingDown, Activity, TrendingUp } from 'lucide-react';
import HealthChart from '@/components/HealthChart';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const generateHeartRateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * 30) + 60
  }));
};

const HeartRate: React.FC = () => {
  const [currentHeartRate, setCurrentHeartRate] = useState(72);
  const [minHeartRate, setMinHeartRate] = useState(58);
  const [avgHeartRate, setAvgHeartRate] = useState(72);
  const [maxHeartRate, setMaxHeartRate] = useState(110);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [heartRateData, setHeartRateData] = useState(generateHeartRateData());

  // Simulate heart rate measurement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMeasuring) {
      // Simulate pulse fluctuation
      interval = setInterval(() => {
        const newRate = Math.floor(Math.random() * 20) + 65;
        setCurrentHeartRate(newRate);
        
        // Update min/max if needed
        if (newRate < minHeartRate) setMinHeartRate(newRate);
        if (newRate > maxHeartRate) setMaxHeartRate(newRate);
        
        // Recalculate average
        setAvgHeartRate(prev => Math.floor((prev + newRate) / 2));
      }, 1000);
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        setIsMeasuring(false);
      }, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMeasuring, minHeartRate, maxHeartRate]);

  const startMeasurement = () => {
    setIsMeasuring(true);
  };

  return (
    <div className="pt-6 pb-20 px-4 min-h-screen bg-gradient-to-b from-heartRate/10 to-white">
      <div className="animate-fade-in">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-heartRate">Heart Rate</h1>
          <p className="text-gray-500">Monitor your heart activity</p>
        </header>

        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className={`w-24 h-24 rounded-full bg-heartRate/10 flex items-center justify-center ${isMeasuring ? 'pulse-animation' : ''}`}>
              <Heart className={`w-10 h-10 text-heartRate ${isMeasuring ? 'animate-pulse' : ''}`} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <p className="text-sm font-bold">{currentHeartRate}</p>
            </div>
          </div>
          
          <p className="text-gray-500 mb-4">Current BPM</p>
          
          <Button 
            className={`w-full ${isMeasuring ? 'bg-gray-400' : 'bg-heartRate hover:bg-heartRate/80'}`}
            onClick={startMeasurement}
            disabled={isMeasuring}
          >
            {isMeasuring ? 'Measuring...' : 'Measure Now'}
          </Button>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-heartRate/10 flex items-center justify-center mb-2">
                <TrendingDown className="w-5 h-5 text-heartRate" />
              </div>
              <p className="text-xs text-gray-500">Minimum</p>
              <p className="font-semibold">{minHeartRate} bpm</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-heartRate/10 flex items-center justify-center mb-2">
                <Activity className="w-5 h-5 text-heartRate" />
              </div>
              <p className="text-xs text-gray-500">Average</p>
              <p className="font-semibold">{avgHeartRate} bpm</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-heartRate/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-heartRate" />
              </div>
              <p className="text-xs text-gray-500">Maximum</p>
              <p className="font-semibold">{maxHeartRate} bpm</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-md font-semibold mb-4">Heart Rate History</h3>
          <HealthChart 
            data={heartRateData} 
            dataKey="value" 
            color="#EF4444" 
            gradientColor="#EF4444" 
            title="BPM throughout the day"
            unit=" bpm"
            height={180}
            showGrid={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
