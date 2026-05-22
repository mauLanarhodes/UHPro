import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import FeaturedClubCard from './components/clubs/FeaturedClubCard';
import SkillPill from './components/clubs/SkillPill';
import ClubListCard, { Club } from './components/clubs/ClubListCard';
import JoinClubModal from './components/clubs/JoinClubModal';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

// ─── Trending skill tabs ──────────
const SKILLS = ['UI/UX', 'Python', 'AI', 'React'];

// ─── Club list data ───────────────────────
const ALL_CLUBS: Club[] = [
  { id: '1', name: 'CougarCS',         icon: 'code-slash-outline',   iconBg: '#FFEAEA', iconColor: '#C8102E', memberCount: '+1k'  },
  { id: '2', name: 'IEEE UH',          icon: 'hardware-chip-outline', iconBg: '#EAF0FF', iconColor: '#2B6CB0', memberCount: '+240' },
  { id: '3', name: 'Data Science Club',icon: 'analytics-outline',    iconBg: '#EAFFF5', iconColor: '#2A7B5A', memberCount: '+310' },
  { id: '4', name: 'AI Society',       icon: 'sparkles-outline',     iconBg: '#F5EAFF', iconColor: '#7C3AED', memberCount: '+185' },
];

export default function StudyClubsScreen({ onNavigate, activeTab }: Props) {
  const [activeSkill, setActiveSkill]       = useState('UI/UX');
  const [joinedClubIds, setJoinedClubIds]   = useState<Set<string>>(new Set());
  const [featuredJoined, setFeaturedJoined] = useState(false);
  const [modalVisible, setModalVisible]     = useState(false);
  const [joiningClubName, setJoiningClubName] = useState('');

  // Open modal helper
  const openJoinModal = (name: string) => {
    setJoiningClubName(name);
    setModalVisible(true);
  };

  const handleJoinClub = (club: Club) => {
    if (joinedClubIds.has(club.id)) return;
    setJoinedClubIds((prev) => new Set(prev).add(club.id));
    openJoinModal(club.name);
  };

  const handleJoinFeatured = () => {
    if (featuredJoined) return;
    setFeaturedJoined(true);
    openJoinModal('UX Coogs');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Back arrow */}
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={24} color="#C8102E" />
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitleGray}>STUDY </Text>
            <Text style={styles.headerTitleRed}>Clubs</Text>
          </View>

          {/* Avatar */}
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
          <Text style={styles.pageTitle}>Study Clubs</Text>
          <Text style={styles.pageSubtitle}>Based on your CS Major</Text>

          {/* Featured club card */}
          <FeaturedClubCard
            onJoin={handleJoinFeatured}
            joined={featuredJoined}
          />

          {/* Trending Skills */}
          <Text style={styles.sectionTitle}>Trending Skills</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.skillsRow}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {SKILLS.map((s) => (
              <SkillPill
                key={s}
                label={s}
                active={activeSkill === s}
                onPress={() => setActiveSkill(s)}
              />
            ))}
          </ScrollView>

          {/* Clubs for Computer Science */}
          <Text style={styles.sectionTitle}>Clubs for Computer Science</Text>
          {ALL_CLUBS.map((club) => (
            <ClubListCard
              key={club.id}
              club={club}
              joined={joinedClubIds.has(club.id)}
              onJoin={handleJoinClub}
            />
          ))}

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Floating AI button */}
      <FloatingAIButton onPress={() => console.log('AI tapped')} />

      {/* Fixed footer */}
      <FooterNav activeTab={activeTab} onNavigate={onNavigate} />

      {/* Join modal */}
      <JoinClubModal
        visible={modalVisible}
        clubName={joiningClubName}
        onViewClub={() => setModalVisible(false)}
        onDone={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF1F1' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerTitleGray: {
    fontSize: 14,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1.5,
  },
  headerTitleRed: {
    fontSize: 14,
    fontWeight: '800',
    color: '#C8102E',
    letterSpacing: 1.5,
  },
  avatarCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 18 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },

  // Page title
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    marginBottom: 20,
  },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 14,
    marginTop: 4,
  },
  skillsRow: {
    marginBottom: 22,
  },
});
