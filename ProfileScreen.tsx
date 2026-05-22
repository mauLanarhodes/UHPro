import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import ProfileHeroCard from './components/profile/ProfileHeroCard';
import DigitalStudentCard from './components/profile/DigitalStudentCard';
import BalanceCard from './components/profile/BalanceCard';
import PersonalDetailsCard from './components/profile/PersonalDeatilsCard';
import SettingsRow from './components/profile/SettingsRow';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const BALANCE_ITEMS = [
  { label: 'ShastaBUCKS', amount: '$18.42', icon: 'card-outline',   iconColor: '#C8102E', iconBg: '#FFEAEA' },
  { label: 'Dining Dollars', amount: '$143.20', icon: 'restaurant-outline', iconColor: '#2A7B5A', iconBg: '#EAFFF5' },
];

const PERSONAL_DETAILS = [
  { label: 'UNIVERSITY EMAIL', value: 'ktalaviya@uh.edu',  icon: 'mail-outline'    },
  { label: 'PHONE NUMBER',     value: '+1 (832) 555-0192', icon: 'call-outline'    },
  { label: 'ASSIGNED ADVISOR', value: 'Dr. Marcus Sterling', icon: 'school-outline' },
];

export default function ProfileScreen({ onNavigate, onBack }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={24} color="#C8102E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DigitalUH</Text>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onNavigate('digitalidentity')}
            activeOpacity={0.8}
          >
            <Ionicons name="qr-code-outline" size={22} color="#C8102E" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero card */}
          <ProfileHeroCard
            name="Khushbu Talaviya"
            major="Computer Science Major"
            uhId="2442577"
            onEdit={() => onNavigate('editprofile')}
          />

          {/* Digital Student ID */}
          <Text style={styles.sectionLabel}>DIGITAL STUDENT ID</Text>
          <DigitalStudentCard onScan={() => onNavigate('digitalidentity')} />

          {/* Balance */}
          <BalanceCard items={BALANCE_ITEMS} />

          {/* Pro-Tip card */}
          <TouchableOpacity style={styles.proTipCard} activeOpacity={0.9}>
            <View style={styles.proTipLeft}>
              <View style={styles.uhBadge}><Text style={styles.uhBadgeText}>UH</Text></View>
              <View style={styles.proTipGradient} />
            </View>
            <View style={styles.proTipContent}>
              <Text style={styles.proTipTitle}>PRO-TIP</Text>
              <Text style={styles.proTipText}>
                You have $143 Dining Dollars remaining. Cougar Woods is serving your favorite{' '}
                <Text style={styles.proTipUnderline}>Chicken Alfredo</Text> tonight!
              </Text>
            </View>
            {/* Decorative star */}
            <View style={styles.starDecor}>
              <Ionicons name="sparkles" size={36} color="rgba(255,255,255,0.25)" />
            </View>
          </TouchableOpacity>

          {/* Personal Details */}
          <Text style={styles.sectionLabel}>PERSONAL DETAILS</Text>
          <PersonalDetailsCard items={PERSONAL_DETAILS} />

          {/* App Settings */}
          <Text style={styles.sectionLabel}>APP SETTINGS</Text>
          <SettingsRow icon="notifications-outline" label="Notifications"   onPress={() => console.log('Notifications')} />
          <SettingsRow icon="lock-closed-outline"   label="Privacy & Security" onPress={() => console.log('Privacy')} />
          <SettingsRow icon="log-out-outline" label="Logout" isDestructive showChevron={false} onPress={() => console.log('Logout')} />

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      <FloatingAIButton onPress={() => console.log('AI')} />
      <FooterNav activeTab="home" onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF1F1' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A1A' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#AAAAAA',
    letterSpacing: 1.8, marginBottom: 12, marginTop: 4,
  },
  proTipCard: {
    backgroundColor: '#C8102E', borderRadius: 20,
    padding: 18, flexDirection: 'row', alignItems: 'center',
    marginBottom: 20, overflow: 'hidden', gap: 14,
    shadowColor: '#C8102E', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  proTipLeft: { alignItems: 'center', gap: 4 },
  uhBadge: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  uhBadgeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  proTipGradient: { width: 2, height: 0 },
  proTipContent: { flex: 1 },
  proTipTitle: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  proTipText: { color: 'rgba(255,255,255,0.88)', fontSize: 13, lineHeight: 19 },
  proTipUnderline: { textDecorationLine: 'underline', color: '#FFFFFF' },
  starDecor: { position: 'absolute', right: 12, top: 10 },
});
