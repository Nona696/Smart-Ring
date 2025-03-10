
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Bluetooth, BluetoothOff } from 'lucide-react';

interface BluetoothDevice {
  name?: string;
  id: string;
  gatt?: {
    connect: () => Promise<any>;
  };
}

// Define navigator.bluetooth interface
declare global {
  interface Navigator {
    bluetooth?: {
      requestDevice(options: { filters: Array<{ services: string[] }> }): Promise<BluetoothDevice>;
    };
  }
}

const RING_UUID = '381606E4-41E8-E790-19E3-C3E96F47E38B';

const RingConnection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  const connectToRing = async () => {
    try {
      if (!navigator.bluetooth) {
        toast({
          title: "Bluetooth nicht unterstützt",
          description: "Dein Gerät unterstützt Bluetooth nicht oder der Zugriff wurde verweigert.",
          variant: "destructive",
        });
        return;
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [RING_UUID] }]
      });
      
      setDevice(device);
      
      toast({
        title: "Ring gefunden",
        description: `Verbinde mit ${device.name || 'SmartRing'}...`,
      });
      
      // Hier würde die vollständige Verbindungslogik implementiert werden
      setIsConnected(true);
      
      toast({
        title: "Verbunden",
        description: `Erfolgreich mit ${device.name || 'SmartRing'} verbunden`,
      });
    } catch (error) {
      console.error('Verbindungsfehler:', error);
      toast({
        title: "Verbindungsfehler",
        description: "Konnte nicht mit dem Smart Ring verbinden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    }
  };

  const disconnectRing = () => {
    // Hier würde die Trennungslogik implementiert werden
    setIsConnected(false);
    setDevice(null);
    toast({
      title: "Getrennt",
      description: "Verbindung zum Smart Ring wurde getrennt.",
    });
  };

  return (
    <Button
      variant={isConnected ? "default" : "outline"}
      size="sm"
      onClick={isConnected ? disconnectRing : connectToRing}
      className={`transition-colors ${isConnected ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
    >
      {isConnected ? (
        <>
          <Bluetooth className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Verbunden</span>
        </>
      ) : (
        <>
          <BluetoothOff className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Ring verbinden</span>
        </>
      )}
    </Button>
  );
};

export default RingConnection;
