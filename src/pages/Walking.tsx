
import React, { useState, useEffect } from 'react';
import CircularProgress from '@/components/CircularProgress';
import HealthChart from '@/components/HealthChart';
import { Footprints, Flame, Route, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const generateStepsData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * 500) + 100
  }));
};

const Walking: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const [goalSteps, setGoalSteps] = useState(10000);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [stepsData, setStepsData] = useState(generateStepsData());

  // Simulate steps increasing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      interval = setInterval(() => {
        setSteps(prev => {
          const newSteps = prev + Math.floor(Math.random() * 10) + 1;
          setCalories(Math.floor(newSteps * 0.04));
          setDistance(parseFloat((newSteps * 0.0007).toFixed(2)));
          setDuration(Math.floor(newSteps / 100));
          return newSteps;
        });
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  // Calculate progress percentage
  const progressPercentage = Math.min(100, (steps / goalSteps) * 100);

  return (
    <div className="pt-6 pb-20 px-4 min-h-screen bg-gradient-to-b from-walking/10 to-white">
      <div className="animate-fade-in">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-walking">Walking</h1>
          <p className="text-gray-500">Track your daily steps</p>
        </header>

        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col items-center">
          <CircularProgress 
            progress={progressPercentage} 
            size={180} 
            strokeWidth={12} 
            color="#0EA5E9"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-walking">{steps.toLocaleString()}</p>
              <p className="text-xs text-gray-500">of {goalSteps.toLocaleString()} steps</p>
            </div>
          </CircularProgress>

          <div className="w-full mt-6">
            <Button 
              className={`w-full ${isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-walking hover:bg-walking/80'}`}
              onClick={() => setIsTracking(!isTracking)}
            >
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-walking/10 flex items-center justify-center mb-2">
                <Flame className="w-5 h-5 text-walking" />
              </div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="font-semibold">{calories}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-walking/10 flex items-center justify-center mb-2">
                <Route className="w-5 h-5 text-walking" />
              </div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-semibold">{distance} km</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-walking/10 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-walking" />
              </div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{duration} min</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-md font-semibold mb-4">Today's Activity</h3>
          <HealthChart 
            data={stepsData} 
            dataKey="value" 
            color="#0EA5E9" 
            gradientColor="#0EA5E9" 
            title="Steps per Hour"
            height={180}
          />
        </div>
      </div>
    </div>
  );
};

export default Walking;
