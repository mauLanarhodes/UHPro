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
import ShastaBucksScreen from './ShastaBucksScreen';
import AddFundsScreen from './AddFundsScreen';
import DiningDollarsScreen from './DiningDollarScreen';
import AddDiningDollarsScreen from './AddDiningDollarScreen';
import ShuttleScreen from './ShuttleScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [prevScreen, setPrevScreen]       = useState<Screen>('home');
  const [shastaBucksBalance, setShastaBucksBalance]     = useState(18.42);
  const [diningDollarsBalance, setDiningDollarsBalance] = useState(143.20);

  const onNavigate = (screen: Screen) => { setPrevScreen(currentScreen); setCurrentScreen(screen); };
  const onBack     = () => { setCurrentScreen(prevScreen); setPrevScreen('home'); };

  if (currentScreen === 'loading')            return <LoadingScreen onFinish={() => setCurrentScreen('home')} />;
  if (currentScreen === 'schedule')           return <ScheduleScreen onNavigate={onNavigate} activeTab="schedule" />;
  if (currentScreen === 'shuttle')            return <ShuttleScreen onNavigate={onNavigate} onBack={onBack} activeTab="shuttle" />;
  if (currentScreen === 'map')                return <MapScreen onNavigate={onNavigate} activeTab="map" />;
  if (currentScreen === 'helpline')           return <HelplineScreen onNavigate={onNavigate} activeTab="helpline" />;
  if (currentScreen === 'studygroups')        return <StudyGroupsScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'studyclubs')         return <StudyClubsScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'studentorg')         return <StudentOrganizationScreen onNavigate={onNavigate} activeTab="home" />;
  if (currentScreen === 'profile')            return <ProfileScreen onNavigate={onNavigate} onBack={onBack} shastaBucksBalance={shastaBucksBalance} diningDollarsBalance={diningDollarsBalance} />;
  if (currentScreen === 'editprofile')        return <EditProfileScreen onNavigate={onNavigate} onBack={onBack} />;
  if (currentScreen === 'digitalidentity')    return <DigitalIdentityScreen onNavigate={onNavigate} onBack={onBack} />;
  if (currentScreen === 'shastabucks')        return <ShastaBucksScreen onNavigate={onNavigate} onBack={onBack} balance={shastaBucksBalance} />;
  if (currentScreen === 'addfunds')           return <AddFundsScreen onNavigate={onNavigate} onBack={onBack} currentBalance={shastaBucksBalance} onFundsAdded={(a) => setShastaBucksBalance((b) => Math.round((b + a) * 100) / 100)} />;
  if (currentScreen === 'diningdollars')      return <DiningDollarsScreen onNavigate={onNavigate} onBack={onBack} balance={diningDollarsBalance} />;
  if (currentScreen === 'adddiningdollars')   return <AddDiningDollarsScreen onNavigate={onNavigate} onBack={onBack} currentBalance={diningDollarsBalance} onFundsAdded={(a) => setDiningDollarsBalance((b) => Math.round((b + a) * 100) / 100)} />;
  return <HomeScreen onNavigate={onNavigate} activeTab="home" />;
}
