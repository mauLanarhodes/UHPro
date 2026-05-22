import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform,
  TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import CourseFilterPill from './components/study/CourseFilterPill';
import StudyGroupCard, { StudyGroup } from './components/study/StudyGroupCard';
import SponsoredCircleCard from './components/study/SponsoredCircleCard';
import CreateGroupModal from './components/study/CreateGroupModal';
import JoinGroupModal from './components/study/JoinGroupModal';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

// ─── Filter pill options ──────────────────────────────────────────────────────
const FILTERS = ['All Courses', 'COSC 3340', 'MATH 3339', 'HIST 1301'];

// ─── Initial fake study group data ───────────────────────────────────────────
const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: '1',
    course: 'COSC 3340',
    category: 'Computer Science',
    categoryColor: '#6366F1',
    title: 'COSC 3340:\nSoftware Design',
    topic: 'Exam 2 Review: Architecture Patterns',
    location: 'MD Anderson Library - Room 210K',
    time: 'Today, 4:00 - 6:00 PM',
    members: 4,
    maxMembers: 6,
  },
  {
    id: '2',
    course: 'MATH 3339',
    category: 'Mathematics',
    categoryColor: '#EC4899',
    title: 'MATH 3339:\nStatistics for Science',
    topic: 'Derivatives & Chain Rule Practice',
    location: 'Cullen College of Engineering - Cafe',
    time: 'Tomorrow, 10:00 AM - 12:00 PM',
    members: 2,
    maxMembers: 5,
  },
  {
    id: '3',
    course: 'HIST 1301',
    category: 'History',
    categoryColor: '#F59E0B',
    title: 'HIST 1301:\nUS History to 1877',
    topic: 'Essay Review + Quiz Prep',
    location: 'Student Center North',
    time: 'Friday, 3:00 - 4:30 PM',
    members: 3,
    maxMembers: 5,
  },
];

export default function StudyGroupsScreen({ onNavigate, activeTab }: Props) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [groups, setGroups]               = useState<StudyGroup[]>(INITIAL_GROUPS);
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [searchQuery, setSearchQuery]     = useState('');
  const [joinedIds, setJoinedIds]         = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate]       = useState(false);
  const [showJoin, setShowJoin]           = useState(false);
  const [joiningGroup, setJoiningGroup]   = useState<StudyGroup | null>(null);

  // ── Filter logic ──────────────────────────────────────────────────────────
  // 1. Filter by selected course pill
  // 2. Filter by search query (course code or topic)
  const filteredGroups = groups.filter((g) => {
    const matchesCourse =
      selectedCourse === 'All Courses' || g.course === selectedCourse;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      g.course.toLowerCase().includes(query) ||
      g.topic.toLowerCase().includes(query) ||
      g.title.toLowerCase().includes(query);
    return matchesCourse && matchesSearch;
  });

  // ── Join handler ──────────────────────────────────────────────────────────
  const handleJoin = (group: StudyGroup) => {
    setJoiningGroup(group);
    setShowJoin(true);
    // Increment member count (cap at maxMembers)
    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id && g.members < g.maxMembers
          ? { ...g, members: g.members + 1 }
          : g
      )
    );
    // Mark as joined
    setJoinedIds((prev) => new Set(prev).add(group.id));
  };

  // ── Create group handler ──────────────────────────────────────────────────
  const handleCreate = (newGroup: StudyGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🐨</Text>
          </View>
          <Text style={styles.headerLabel}>STUDY GROUPS</Text>
        </View>

        {/* ── Scrollable content ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero section */}
          <Text style={styles.heroEyebrow}>COLLABORATION HUB</Text>
          <Text style={styles.heroTitle}>Find your{'\n'}
            <Text style={styles.heroTitleRed}>collective.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Join high-performing study circles designed for University of
            Houston Scholars.
          </Text>

          {/* Search bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={17} color="#AAAAAA" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses or topics…"
              placeholderTextColor="#AAAAAA"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
          </View>

          {/* Course filter pills */}
          <View style={styles.filtersRow}>
            {FILTERS.map((f) => (
              <CourseFilterPill
                key={f}
                label={f}
                active={selectedCourse === f}
                onPress={() => setSelectedCourse(f)}
              />
            ))}
          </View>

          {/* Study group cards */}
          {filteredGroups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              joined={joinedIds.has(group.id)}
              onJoin={handleJoin}
            />
          ))}

          {filteredGroups.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={36} color="#DDD" />
              <Text style={styles.emptyText}>No groups found</Text>
            </View>
          )}

          {/* Sponsored circle card */}
          <SponsoredCircleCard onViewCircle={() => console.log('View circle')} />

          <View style={{ height: 80 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Create group pill button — sits above footer */}
      <TouchableOpacity
        style={styles.createGroupBtn}
        onPress={() => setShowCreate(true)}
        activeOpacity={0.9}
      >
        <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.createGroupBtnText}>CREATE YOUR OWN GROUP</Text>
      </TouchableOpacity>

      {/* Floating AI button */}
      <FloatingAIButton onPress={() => console.log('AI tapped')} />

      {/* Fixed footer */}
      <FooterNav activeTab={activeTab} onNavigate={onNavigate} />

      {/* Modals */}
      <CreateGroupModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />
      <JoinGroupModal
        visible={showJoin}
        group={joiningGroup}
        onDone={() => setShowJoin(false)}
        onViewDetails={() => setShowJoin(false)}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  avatarCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F0E0E0',
    alignItems: 'center', justifyContent: 'center',
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
  scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

  // Hero
  heroEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#AAAAAA',
    letterSpacing: 2,
    marginBottom: 6,
    marginTop: 4,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 42,
    marginBottom: 2,
  },
  heroTitleRed: {
    color: '#C8102E',
    fontStyle: 'italic',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
    marginBottom: 18,
    marginTop: 6,
  },

  // Search bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  // Filters
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    color: '#BBBBBB',
    fontSize: 15,
    fontWeight: '500',
  },

  // Create group pill
  createGroupBtn: {
    position: 'absolute',
    bottom: 88,
    left: 20,
    right: 80,       // leave space for AI button
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  createGroupBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
