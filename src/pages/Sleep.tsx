
import React, { useState } from 'react';
import CircularProgress from '@/components/CircularProgress';
import { Moon, Zap, Sun } from 'lucide-react';

// Mock data for sleep stages
const sleepStagesData = [
  { time: '22:00', stage: 'awake' },
  { time: '22:30', stage: 'light' },
  { time: '23:00', stage: 'deep' },
  { time: '00:30', stage: 'light' },
  { time: '01:30', stage: 'deep' },
  { time: '03:00', stage: 'light' },
  { time: '04:00', stage: 'deep' },
  { time: '05:00', stage: 'light' },
  { time: '06:00', stage: 'awake' },
];

// Helper function to format duration
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

const Sleep: React.FC = () => {
  const [totalSleepTime, setTotalSleepTime] = useState(480); // 8 hours in minutes
  const [deepSleepTime, setDeepSleepTime] = useState(120); // 2 hours in minutes
  const [lightSleepTime, setLightSleepTime] = useState(300); // 5 hours in minutes
  const [awakeTime, setAwakeTime] = useState(60); // 1 hour in minutes
  
  // Calculate sleep quality percentage
  const sleepQualityPercentage = Math.min(100, (deepSleepTime / totalSleepTime) * 100 * 2);

  // Helper to generate time labels
  const generateTimeLabels = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = (i + 21) % 24;
      return `${hour}:00`;
    });
  };

  const timeLabels = generateTimeLabels();

  return (
    <div className="pt-6 pb-20 px-4 min-h-screen bg-gradient-to-b from-sleep/10 to-white">
      <div className="animate-fade-in">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-sleep">Sleep</h1>
          <p className="text-gray-500">Monitor your sleep patterns</p>
        </header>

        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col items-center">
          <CircularProgress 
            progress={(totalSleepTime / (24 * 60)) * 100} 
            size={180} 
            strokeWidth={12} 
            color="#8B5CF6"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-sleep">{formatDuration(totalSleepTime)}</p>
              <p className="text-xs text-gray-500">Total Sleep</p>
            </div>
          </CircularProgress>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="text-md font-semibold mb-4">Sleep Stages</h3>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-900 rounded mr-2"></div>
              <span className="text-sm">Deep Sleep</span>
            </div>
            <span className="text-sm font-medium">{formatDuration(deepSleepTime)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
              <span className="text-sm">Light Sleep</span>
            </div>
            <span className="text-sm font-medium">{formatDuration(lightSleepTime)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-200 rounded mr-2"></div>
              <span className="text-sm">Awake</span>
            </div>
            <span className="text-sm font-medium">{formatDuration(awakeTime)}</span>
          </div>
          
          {/* Sleep graph visualization */}
          <div className="relative mt-6 w-full h-20 bg-gray-100 rounded-lg">
            <div className="absolute top-0 left-0 w-full h-full">
              {sleepStagesData.map((item, index) => {
                const startPerc = (index / sleepStagesData.length) * 100;
                const endPerc = ((index + 1) / sleepStagesData.length) * 100;
                const width = endPerc - startPerc;
                
                let bgColor = 'bg-purple-200'; // awake
                if (item.stage === 'light') bgColor = 'bg-purple-500';
                if (item.stage === 'deep') bgColor = 'bg-purple-900';
                
                return (
                  <div
                    key={index}
                    className={`absolute top-0 h-full transition-all duration-700 ${bgColor}`}
                    style={{
                      left: `${startPerc}%`,
                      width: `${width}%`,
                    }}
                  ></div>
                );
              })}
            </div>
            
            {/* Time labels */}
            <div className="absolute -bottom-6 left-0 w-full flex justify-between">
              {timeLabels.map((time, index) => (
                <div key={index} className="text-[10px] text-gray-500">{time}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-md font-semibold mb-4">Sleep Analytics</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-sleep/10 flex items-center justify-center mb-2">
                <Moon className="w-5 h-5 text-sleep" />
              </div>
              <p className="text-xs text-gray-500">Bedtime</p>
              <p className="font-semibold">22:30</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-sleep/10 flex items-center justify-center mb-2">
                <Sun className="w-5 h-5 text-sleep" />
              </div>
              <p className="text-xs text-gray-500">Wake Up</p>
              <p className="font-semibold">06:30</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-sleep/10 flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-sleep" />
              </div>
              <p className="text-xs text-gray-500">Quality</p>
              <p className="font-semibold">{sleepQualityPercentage.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sleep;
