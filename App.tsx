import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';

export type Screen = 'loading' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');

  if (currentScreen === 'loading') {
    return <LoadingScreen onFinish={() => setCurrentScreen('home')} />;
  }
  return <HomeScreen />;
}
