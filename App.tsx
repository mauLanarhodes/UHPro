import React, { useState } from 'react';
import { Screen } from './src/types/navigation';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';
import ScheduleScreen from './ScheduleScreen';
import MapScreen from './MapScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');

  const onNavigate = (screen: Screen) => setCurrentScreen(screen);

  if (currentScreen === 'loading') {
    return <LoadingScreen onFinish={() => setCurrentScreen('home')} />;
  }
  if (currentScreen === 'schedule') {
    return <ScheduleScreen onNavigate={onNavigate} activeTab="schedule" />;
  }
  if (currentScreen === 'map') {
    return <MapScreen onNavigate={onNavigate} activeTab="map" />;
  }
  return <HomeScreen onNavigate={onNavigate} activeTab="home" />;
}
