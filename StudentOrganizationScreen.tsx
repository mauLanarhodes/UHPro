import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import FeaturedEventCard from './components/organization/FeaturedEventCard';
import OrganizationCard from './components/organization/OrganizationCard';
import InterestCard, { Interest } from './components/organization/InterestCard';
import JoinOrganizationModal, { OrgInfo } from './components/organization/JoinOrganizationModal';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

// ─── Organizations data ───────────────────────────────────────────────────────
const ORGS: OrgInfo[] = [
  { id: 'PSA', name: 'PSA', tagline: 'Pakistani Student Association', upcomingEvent: 'Eid Mela – May 28', memberCount: '+92'  },
  { id: 'ISA', name: 'ISA', tagline: 'Indian Student Association',    upcomingEvent: 'Diwali Night – Nov 1', memberCount: '+124' },
  { id: 'VSA', name: 'VSA', tagline: 'Vietnamese Student Association', upcomingEvent: 'TET Festival – Jan 20', memberCount: '+90'  },
];

// ─── Interests data ───────────────────────────────────────────────────────────
const INTERESTS: Interest[] = [
  {
    id: 'esports',
    name: 'UH Esports',
    icon: 'game-controller-outline',
    iconBg: '#FFEAEA',
    iconColor: '#C8102E',
    badge: 'GREAT FOR MAKING FRIENDS',
    badgeColor: '#C8102E',
    description: 'Join 500+ gamers in competitive and casual play across all platforms.',
    actions: [{ label: 'Learn More' }],
  },
  {
    id: 'radio',
    name: 'Coog Radio',
    icon: 'radio-outline',
    iconBg: '#EAF0FF',
    iconColor: '#2B6CB0',
    badge: 'GOOD FOR NETWORKING',
    badgeColor: '#2B6CB0',
    description: 'The soundtrack of UH. Learn broadcasting, production, and audio engineering.',
    actions: [{ label: 'Learn More' }],
  },
  {
    id: 'raas',
    name: "Roarin' Raas",
    icon: 'people-outline',
    iconBg: '#FFEAEA',
    iconColor: '#C8102E',
    badge: 'GREAT FOR MAKING FRIENDS',
    badgeColor: '#C8102E',
    description: 'The official Indian folk dance UH. No experience needed, just energy and passion for dance.',
    actions: [{ label: 'Audition Info' }, { label: 'Performance Schedule' }],
  },
];

export default function StudentOrganizationScreen({ onNavigate, activeTab }: Props) {
  const [joinedOrgIds, setJoinedOrgIds] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrg, setSelectedOrg]   = useState<OrgInfo | null>(null);
  const [justJoined, setJustJoined]     = useState(false);

  const openModal = (org: OrgInfo) => {
    setSelectedOrg(org);
    setJustJoined(joinedOrgIds.has(org.id));
    setModalVisible(true);
  };

  const handleJoin = () => {
    if (selectedOrg) {
      setJoinedOrgIds((prev) => new Set(prev).add(selectedOrg.id));
      setJustJoined(true);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={24} color="#C8102E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Organization</Text>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🐨</Text>
          </View>
        </View>

        {/* ── Scrollable content ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Page title */}
          <Text style={styles.pageTitle}>Student Life</Text>
          <Text style={styles.pageSubtitle}>Find your collective.</Text>

          {/* Featured event card */}
          <FeaturedEventCard onRSVP={() => console.log('RSVP tapped')} />

          {/* Trending Organizations */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Trending Organizations</Text>
              <Text style={styles.sectionSubtitle}>Most active communities this week</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {ORGS.map((org) => (
            <OrganizationCard
              key={org.id}
              org={org}
              joined={joinedOrgIds.has(org.id)}
              onPress={openModal}
            />
          ))}

          {/* Interests & Fun */}
          <View style={styles.interestsHeader}>
            <Text style={styles.sectionTitle}>Interests & Fun</Text>
            <Text style={styles.sectionSubtitle}>Tailored for your downtime</Text>
          </View>

          {INTERESTS.map((item) => (
            <InterestCard key={item.id} item={item} />
          ))}

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      <FloatingAIButton onPress={() => console.log('AI tapped')} />
      <FooterNav activeTab={activeTab} onNavigate={onNavigate} />

      <JoinOrganizationModal
        visible={modalVisible}
        org={selectedOrg}
        onJoin={handleJoin}
        onClose={() => setModalVisible(false)}
        joined={justJoined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF1F1' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 14, fontWeight: '800', color: '#C8102E', letterSpacing: 0.5 },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 18 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },

  pageTitle: { fontSize: 34, fontWeight: '900', color: '#1A1A1A', marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: '#888', fontWeight: '500', marginBottom: 22 },

  // Section headers
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 14,
  },
  interestsHeader: { marginBottom: 14, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  sectionSubtitle: { fontSize: 12, color: '#888', fontWeight: '400', marginTop: 2 },
  viewAll: { fontSize: 13, fontWeight: '700', color: '#C8102E', marginTop: 2 },
});
