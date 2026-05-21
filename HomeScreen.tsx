import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProactiveSuggestionCard from './components/home/ProactiveSuggestionCard';
import TaskAlertCard from './components/home/TaskAlertCard';
import ServiceGridCard from './components/home/ServiceGridCard';
import StudentServiceCard from './components/home/StudentServiceCard';
import NewsCard from './components/home/NewsCard';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

const universityServices = [
  { icon: 'calendar-outline', label: 'Schedule &\nAssignment' },
  { icon: 'bus-outline', label: 'Shuttle' },
  { icon: 'restaurant-outline', label: 'Dining' },
  { icon: 'map-outline', label: 'Campus\nMap' },
];

const studentServices = [
  { label: 'Study\nGroups' },
  { label: 'Social\n&\nCultural' },
  { label: 'Student\nClubs' },
  { label: 'UH\nEvents' },
];

// 3 Daily Focus cards
const dailyFocusItems = [
  {
    title: 'Low Balance Alert',
    subtitle: 'YOUR SHASTABUCKS BALANCE IS LOW → REFILL NOW VIA SETTINGS',
  },
  {
    title: 'Tasks',
    subtitle: 'COSC 2436 ASSIGNMENT 4 IS DUE TONIGHT → FINISH AS SOON AS POSSIBLE',
  },
  {
    title: 'Exam Prep',
    subtitle: 'START REVIEWING RECURSION & SORTING PROBLEMS FOR YOUR EXAM NEXT THURSDAY',
  },
];

const newsItems = [
  {
    category: 'Cougar News',
    headline: 'New study spaces opening in MD Anderson Library next week.',
    color: '#2A7B5A',
    emoji: '🐾',
  },
  {
    category: 'Campus Bites',
    headline: 'Free pizza at Student Center South today from 1–3 PM',
    color: '#C8102E',
    emoji: '🍕',
  },
  {
    category: 'Transit Updates',
    headline: 'Shuttle Route B delays expected today. check live updates before heading out.',
    color: '#B04000',
    emoji: '🚌',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [dismissed, setDismissed] = useState(false);
  // Cycles 0 → 1 → 2 → 0
  const [activeFocusIndex, setActiveFocusIndex] = useState(0);

  const handleBadgePress = () => {
    setActiveFocusIndex((prev) => (prev + 1) % dailyFocusItems.length);
  };

  const currentFocus = dailyFocusItems[activeFocusIndex];
  const badge = `${activeFocusIndex + 1}/${dailyFocusItems.length}`;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🐨</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.nameText}>Talaviya, Khushbu</Text>
          </View>
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Proactive Suggestion */}
          {!dismissed && (
            <ProactiveSuggestionCard
              message={"Class COSC 3340 in 10 mins.\nCatch the red shuttle in 2 mins?"}
              onTrack={() => {}}
              onDismiss={() => setDismissed(true)}
            />
          )}

          {/* Daily Focus */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Focus</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskCardWrapper}>
            <TaskAlertCard
              title={currentFocus.title}
              subtitle={currentFocus.subtitle}
              badge={badge}
              onBadgePress={handleBadgePress}
            />
          </View>

          {/* University Services */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>University Services</Text>
          </View>
          <View style={styles.servicesGrid}>
            {universityServices.map((s, i) => (
              <ServiceGridCard key={i} icon={s.icon} label={s.label} />
            ))}
          </View>

          {/* Student Services */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Student Services</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {studentServices.map((s, i) => (
              <StudentServiceCard key={i} label={s.label} />
            ))}
          </ScrollView>

          {/* News Section */}
          <View style={styles.newsSection}>
            {newsItems.map((n, i) => (
              <NewsCard
                key={i}
                category={n.category}
                headline={n.headline}
                color={n.color}
                emoji={n.emoji}
              />
            ))}
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>

      <FloatingAIButton onPress={() => {}} />
      <FooterNav activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16,
    backgroundColor: '#FFFFFF', gap: 12,
  },
  avatarCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 22 },
  headerText: { flex: 1 },
  welcomeText: { fontSize: 12, color: '#888', fontWeight: '500' },
  nameText: { fontSize: 17, color: '#C8102E', fontWeight: '800' },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 8 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 12, marginTop: 6,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  viewAll: { fontSize: 12, fontWeight: '700', color: '#C8102E', letterSpacing: 0.5 },
  taskCardWrapper: { paddingHorizontal: 16, marginBottom: 20 },
  // Fixed 2x2 grid with equal sizing
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  horizontalScroll: { marginBottom: 20 },
  horizontalScrollContent: { paddingHorizontal: 16 },
  newsSection: { paddingHorizontal: 16, marginTop: 4 },
});
