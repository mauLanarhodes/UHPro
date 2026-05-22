import React, { useState } from 'react';
import { Screen } from './src/types/navigation';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';
import ScheduleScreen from './ScheduleScreen';
import MapScreen from './MapScreen';
import HelplineScreen from './HelplineScreen';
import StudyGroupsScreen from './StudyGroupsScreen';
import StudyClubsScreen from './StudyClubsScreen';
import StudentOrganizationScreen from './StudentOrganizationScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import DigitalIdentityScreen from './DigitalIdentityScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [prevScreen, setPrevScreen]       = useState<Screen>('home');
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  
  const onNavigate = (screen: Screen) => {
    setPrevScreen(currentScreen);
    setCurrentScreen(screen);
    setActiveScreen(screen);
  };
  const onBack = () => setCurrentScreen(prevScreen);

  if (currentScreen === 'loading')        return <LoadingScreen onFinish={() => setCurrentScreen('home')} />;
  if (currentScreen === 'schedule')       return <ScheduleScreen onNavigate={onNavigate} activeTab="schedule" />;
  if (currentScreen === 'map')            return <MapScreen onNavigate={onNavigate} activeTab="map" />;
  if (currentScreen === 'helpline')       return <HelplineScreen onNavigate={onNavigate} activeTab="helpline" />;
  if (currentScreen === 'studygroups')    return <StudyGroupsScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'studyclubs')     return <StudyClubsScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'studentorg')     return <StudentOrganizationScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'profile')        return <ProfileScreen onNavigate={onNavigate} onBack={onBack} />;
  if (currentScreen === 'editprofile')    return <EditProfileScreen onNavigate={onNavigate} onBack={onBack} />;
  if (currentScreen === 'digitalidentity') return <DigitalIdentityScreen onNavigate={onNavigate} onBack={onBack} />;
  return <HomeScreen onNavigate={onNavigate} activeTab="home" />;
}
