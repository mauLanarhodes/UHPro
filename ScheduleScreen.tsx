import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import DestinationCard from './components/schedule/DestinationCard';
import TimelineClassCard, { ClassItem } from './components/schedule/TimelineClassCard';
import AssignmentPriorityCard, { AssignmentItem } from './components/schedule/AssignmentPriorityCard';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

// ─── Fake current time for easy testing ──────────────────────────────────────
// Change this to test different progress states:
// "10:30 AM" = COSC 3340 is 43% done
// "11:20 AM" = COSC 3340 is done, MATH upcoming
// "01:45 PM" = MATH is ongoing
const FAKE_CURRENT_TIME = '10:38 AM';

// Convert "10:30 AM" → total minutes since midnight
function timeToMinutes(timeStr: string): number {
  const [time, period] = timeStr.split(' ');
  const [hoursStr, minsStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const mins = parseInt(minsStr, 10);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
}

// Compute status + progress for each class based on fake current time
function computeClassStatus(
  startTime: string,
  endTime: string,
  currentMins: number
): { status: 'done' | 'ongoing' | 'upcoming'; progress: number } {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  if (currentMins >= end) {
    return { status: 'done', progress: 1 };
  } else if (currentMins >= start) {
    const progress = (currentMins - start) / (end - start);
    return { status: 'ongoing', progress };
  } else {
    return { status: 'upcoming', progress: 0 };
  }
}

// ─── Raw class data (without computed status) ────────────────────────────────
const rawClasses = [
  { id: '1', code: 'COSC 3340', name: 'Operating Systems',      startTime: '10:00 AM', endTime: '11:15 AM', location: 'SEC 101' },
  { id: '2', code: 'MATH 3339', name: 'Statistics for Science', startTime: '01:00 PM', endTime: '02:30 PM', location: 'CASA 202' },
  { id: '3', code: 'HIST 1301', name: 'US History to 1877',     startTime: '04:00 PM', endTime: '05:30 PM', location: 'AH 110' },
];

const assignments: AssignmentItem[] = [
  { id: 'a1', priority: 'high',     title: 'OS Kernel Project Phase 2', dueLabel: 'Due in 2 days' },
  { id: 'a2', priority: 'upcoming', title: 'History Response Essay',    dueLabel: 'Friday, 11:59' },
];

export default function ScheduleScreen({ onNavigate, activeTab }: Props) {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    // Compute statuses based on FAKE_CURRENT_TIME
    const currentMins = timeToMinutes(FAKE_CURRENT_TIME);
    const computed: ClassItem[] = rawClasses.map((c) => {
      const { status, progress } = computeClassStatus(c.startTime, c.endTime, currentMins);
      return { ...c, status, progress };
    });
    setClasses(computed);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🐨</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.nameText}>Talaviya, Khushbu</Text>
          </View>
        </View>

        {/* ── Scrollable content ── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* YOUR DAY AT A GLANCE */}
          <Text style={styles.sectionLabel}>YOUR DAY AT A GLANCE</Text>

          <DestinationCard
            destination="Science & Engineering Complex"
            minutes={12}
            shuttleInfo="Shuttle Route 4 arriving in 3 mins. Walk to student Center South stop now to make COSC 3340 on time."
            onLeaveNow={() => {}}
          />

          {/* DAILY TIMELINE */}
          <View style={styles.timelineHeader}>
            <Text style={styles.sectionLabel}>DAILY TIMELINE</Text>
            <Text style={styles.dateLabel}>Monday, May 4</Text>
          </View>

          <View style={styles.timelineContainer}>
            {classes.map((item, index) => (
              <TimelineClassCard
                key={item.id}
                item={item}
                isLast={index === classes.length - 1}
                onDirections={(c) => console.log('Directions for', c.code)}
              />
            ))}
          </View>

          {/* ASSIGNMENT PRIORITY */}
          <Text style={[styles.sectionLabel, { marginTop: 8 }]}>ASSIGNMENT PRIORITY</Text>
          <View style={styles.assignmentsContainer}>
            {assignments.map((a) => (
              <AssignmentPriorityCard key={a.id} item={a} />
            ))}
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Floating AI button */}
      <FloatingAIButton onPress={() => {}} />

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFF1F1',
    gap: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 20 },
  headerText: { flex: 1 },
  welcomeText: { fontSize: 11, color: '#888', fontWeight: '500' },
  nameText: { fontSize: 16, color: '#C8102E', fontWeight: '800' },

  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 8, paddingBottom: 8 },

  // Section labels
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  // Timeline header row
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C8102E',
  },

  // Timeline + cards
  timelineContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 20,
  },

  // Assignments
  assignmentsContainer: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
});
