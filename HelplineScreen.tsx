import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import PoliceCard from './components/helpline/PoliceCard';
import SupportCard from './components/helpline/SupportCard';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

export default function HelplineScreen({ onNavigate, activeTab }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Left: avatar + HELPLINE label */}
          <View style={styles.headerLeft}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🐨</Text>
            </View>
            <Text style={styles.headerLabel}>HELPLINE</Text>
          </View>
        </View>

        {/* ── Scrollable content ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Page title */}
          <View style={styles.titleRow}>
            <Text style={styles.titleBlack}>Helpline </Text>
            <Text style={styles.titleRed}>Hub</Text>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Your safety and well-being are our priority. Quick access to campus
            security, medical support, international student services, and
            facility emergencies.
          </Text>

          {/* 1 — Campus Police (deep red) */}
          <PoliceCard onCall={() => console.log('Call Campus Police')} />

          {/* 2 — CAPS Counseling (white/blue) */}
          <SupportCard
            variant="caps"
            onPress={() => console.log('CAPS tapped')}
          />

          {/* 3 — Health Center (light gray) */}
          <SupportCard
            variant="health"
            onPress={() => console.log('Health Center tapped')}
          />

          {/* 4 — Travel & Visa Crisis (dark navy) */}
          <SupportCard
            variant="travel"
            onPress={() => console.log('Travel & Visa tapped')}
          />

          {/* 5 — Facilities Emergency (white) */}
          <SupportCard
            variant="facilities"
            onPress={() => console.log('Facilities tapped')}
          />

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Floating AI button */}
      <FloatingAIButton onPress={() => console.log('AI tapped')} />

      {/* Fixed footer */}
      <FooterNav activeTab={activeTab} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF1F1',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#FFF1F1',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 18 },
  headerLabel: {
    color: '#C8102E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },

  // Title
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
    marginTop: 4,
  },
  titleBlack: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  titleRed: {
    fontSize: 34,
    fontWeight: '800',
    color: '#C8102E',
    fontStyle: 'italic',
  },

  // Subtitle
  subtitle: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
});
