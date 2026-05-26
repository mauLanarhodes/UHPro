import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import RouteSuggestionCard from './components/shuttle/RouteSuggestionCard';
import ShuttleRouteCard, { ShuttleRoute } from './components/shuttle/ShuttleRouteCard';
import LiveTrackerCard from './components/shuttle/LiveTrackerCrad';
import AdditionalServiceCard, { AdditionalService } from './components/shuttle/AdditionalServiceCard';
import RouteDetailModal from './components/shuttle/RouteDetailModal';
import ShuttleScheduleModal from './components/shuttle/ShuttleScheduleModal';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
  activeTab?: string;
}

const ROUTES: ShuttleRoute[] = [
  { id:'1', name:'North Route',   status:'ON TIME', capacity:'Low',      time:'4 mins',  stops:'2 stops left', accentColor:'#14B8A6', statusBg:'#DCFDF9', statusColor:'#0F766E' },
  { id:'2', name:'PGH / Zone E', status:'DELAYED', capacity:'Full',     time:'12 mins', stops:'5 stops left', accentColor:'#F59E0B', statusBg:'#FEF3C7', statusColor:'#B45309' },
  { id:'3', name:'SC / Zone D',  status:'ON TIME', capacity:'Moderate', time:'7 mins',  stops:'3 stops left', accentColor:'#C8102E', statusBg:'#FFF1F1', statusColor:'#C8102E' },
];

const ADDITIONAL_SERVICES: AdditionalService[] = [
  { id:'1', name:'Cougar Ride',        subtitle:'Late-night safety transport', status:'ACTIVE', statusColor:'#16A34A', time:'9PM - 3AM',   icon:'moon-outline',      iconBg:'#FFEAEA', iconColor:'#C8102E'  },
  { id:'2', name:'Sugar Land Shuttle', subtitle:'Inter-campus connection',     status:'ON TIME',statusColor:'#2B6CB0', time:'7AM - 10PM',  icon:'bus-outline',       iconBg:'#EAF0FF', iconColor:'#2B6CB0'  },
  { id:'3', name:'Ride & Dine Shuttle',subtitle:'Dining hall circuits',        status:'ACTIVE', statusColor:'#555555', time:'11AM - 9PM',  icon:'restaurant-outline', iconBg:'#3A3A3A', iconColor:'#FFFFFF'  },
];

export default function ShuttleScreen({ onNavigate, onBack, activeTab = 'shuttle' }: Props) {
  const [suggestionVisible, setSuggestionVisible] = useState(true);
  const [selectedRoute, setSelectedRoute]         = useState<ShuttleRoute | null>(null);
  const [showRouteModal, setShowRouteModal]       = useState(false);
  const [showSchedule, setShowSchedule]           = useState(false);

  const openRouteDetail = (route: ShuttleRoute) => {
    setSelectedRoute(route);
    setShowRouteModal(true);
  };

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
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => onNavigate('digitalidentity')} style={styles.iconBtn} activeOpacity={0.8}>
              <Ionicons name="qr-code-outline" size={22} color="#C8102E" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate('profile')} activeOpacity={0.8}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>🐨</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Greeting */}
          <Text style={styles.greeting}>Good Afternoon,{'\n'}Khushbu</Text>
          <Text style={styles.classAlert}>
            You have <Text style={styles.classCode}>COSC 3340</Text> in 12 minutes.
          </Text>

          {/* AI Route Suggestion */}
          {suggestionVisible && (
            <RouteSuggestionCard
              onTrack={() => console.log('Track shuttle')}
              onDismiss={() => setSuggestionVisible(false)}
            />
          )}

          {/* Campus Services */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Campus Services</Text>
            <TouchableOpacity onPress={() => setShowSchedule(true)} activeOpacity={0.8}>
              <Text style={styles.viewSchedule}>View Schedule</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal route cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.routeScroll}
            contentContainerStyle={styles.routeScrollContent}
          >
            {ROUTES.map((route) => (
              <ShuttleRouteCard
                key={route.id}
                route={route}
                onPress={openRouteDetail}
              />
            ))}
          </ScrollView>

          {/* Live Tracker */}
          <Text style={styles.sectionTitle}>Live Tracker</Text>
          <LiveTrackerCard
            onOpenMap={() => onNavigate('map')}
            onZoomIn={() => console.log('Zoom in')}
            onZoomOut={() => console.log('Zoom out')}
          />

          {/* Additional Services */}
          <Text style={styles.sectionTitle}>Additional Services</Text>
          {ADDITIONAL_SERVICES.map((s) => (
            <AdditionalServiceCard
              key={s.id}
              service={s}
              onPress={() => console.log('Service:', s.name)}
            />
          ))}

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      <FloatingAIButton onPress={() => console.log('AI')} />
      <FooterNav activeTab={activeTab} onNavigate={onNavigate} />

      <RouteDetailModal
        visible={showRouteModal}
        route={selectedRoute}
        onTrack={() => { setShowRouteModal(false); console.log('Tracking:', selectedRoute?.name); }}
        onClose={() => setShowRouteModal(false)}
      />
      <ShuttleScheduleModal
        visible={showSchedule}
        onClose={() => setShowSchedule(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF1F1' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#C8102E' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatarCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },
  greeting: { fontSize: 28, fontWeight: '900', color: '#1A1A1A', lineHeight: 34, marginBottom: 6 },
  classAlert: { fontSize: 15, color: '#444', marginBottom: 20 },
  classCode: { color: '#C8102E', fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 14 },
  viewSchedule: { fontSize: 13, fontWeight: '700', color: '#C8102E' },
  routeScroll: { marginBottom: 28, marginLeft: -16 },
  routeScrollContent: { paddingLeft: 16, paddingRight: 8 },
});
