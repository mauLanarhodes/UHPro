import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import DiningBalanceHeroCard from './components/dining/DiningBalanceHeroCard';
import DiningRecommendationCard from './components/dining/DiningRecommendationCrad';
import DiningMetricCard, { DiningMetric } from './components/dining/DiningMetricCard';
import DiningLocationCard, { DiningLocation } from './components/dining/DiningLocationCard';
import DiningTransactionRow, { DiningTransaction } from './components/dining/DiningTranscationRow';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props { onNavigate: (screen: Screen) => void; onBack: () => void; balance: number }

const METRICS: DiningMetric[] = [
  { label: 'WEEKLY SPENT',       value: '$38.40', icon: 'trending-down-outline', iconBg: '#FFEAEA', iconColor: '#C8102E', sub: '↓ 12%' },
  { label: 'AVG MEAL COST',      value: '$11.80', icon: 'receipt-outline',       iconBg: '#EAF0FF', iconColor: '#2B6CB0' },
  { label: 'MEALS LEFT',         value: '12',     icon: 'nutrition-outline',     iconBg: '#EAFFF5', iconColor: '#16A34A', sub: 'estimated' },
  { label: 'FAVORITE SPOT',      value: 'Moody',  icon: 'heart-outline',         iconBg: '#FFF1F1', iconColor: '#C8102E', sub: 'Towers' },
];

const LOCATIONS: DiningLocation[] = [
  { id:'1', name:'Cougar Woods Dining Commons', status:'Open',     distance:'0.3 mi away', hours:'Open until 9:00 PM',  rating:'4.8', bestFor:'Dinner + comfort food', waitTime:'~5 mins' },
  { id:'2', name:'Moody Dining Commons',        status:'Busy',     distance:'0.6 mi away', hours:'Open 24 Hours',        rating:'4.2', bestFor:'Quick lunch',           waitTime:'~15 mins' },
  { id:'3', name:'Chick-fil-A',                 status:'Very Busy',distance:'0.2 mi away', hours:'Open until 10:00 PM', rating:'4.9', bestFor:'Snacks + drinks',       waitTime:'~25 mins' },
];

const TRANSACTIONS: DiningTransaction[] = [
  { id:'1', title:'Cougar Woods Dinner',    datetime:'Today, 7:12 PM',       amount:'-$13.75', isCredit:false, icon:'restaurant-outline', iconBg:'#FFEAEA', iconColor:'#C8102E' },
  { id:'2', title:'Moody Towers Lunch',     datetime:'Yesterday, 1:05 PM',   amount:'-$10.90', isCredit:false, icon:'fast-food-outline',   iconBg:'#FEF3C7', iconColor:'#D97706' },
  { id:'3', title:'Starbucks Student Ctr',  datetime:'May 20, 9:40 AM',      amount:'-$6.45',  isCredit:false, icon:'cafe-outline',        iconBg:'#EAF0FF', iconColor:'#2B6CB0' },
  { id:'4', title:'Dining Dollars Reload',  datetime:'May 18, 10:05 AM',     amount:'+$50.00', isCredit:true,  icon:'add-circle-outline',  iconBg:'#EAFFF5', iconColor:'#16A34A' },
];

export default function DiningDollarsScreen({ onNavigate, onBack, balance }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={24} color="#C8102E" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Cougar Dining Dollars</Text>
            <Text style={styles.headerSub}>SMART DINING ASSISTANT</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => onNavigate('digitalidentity')} style={styles.iconBtn} activeOpacity={0.8}>
              <Ionicons name="qr-code-outline" size={22} color="#C8102E" />
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🐨</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Hero balance card */}
          <DiningBalanceHeroCard
            balance={balance}
            onAddFunds={() => onNavigate('adddiningdollars')}
            onViewMealPlan={() => console.log('Meal Plans')}
          />

          {/* Smart suggestion */}
          <DiningRecommendationCard onViewOptions={() => console.log('Dining Options')} />

          {/* Dining Locations */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dining Locations</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.viewMap}>View Map</Text>
            </TouchableOpacity>
          </View>
          {LOCATIONS.map((loc) => (
            <DiningLocationCard
              key={loc.id}
              location={loc}
              onDirections={() => onNavigate('map')}
            />
          ))}

          {/* What's Popular */}
          <Text style={[styles.sectionTitle, { marginTop: 8, marginBottom: 12 }]}>What's Popular</Text>
          <View style={styles.popularCard}>
            <View style={styles.popularRow}>
              <Text style={styles.popularEmoji}>🔥</Text>
              <View>
                <Text style={styles.popularTitle}>Chicken Alfredo trending</Text>
                <Text style={styles.popularSub}>Now serving at Cougar Woods</Text>
              </View>
            </View>
          </View>
          <View style={styles.popularCard}>
            <View style={styles.popularRow}>
              <Text style={styles.popularEmoji}>🍪</Text>
              <View>
                <Text style={styles.popularTitle}>Free cookies at SC Market</Text>
                <Text style={styles.popularSub}>Available for the next hour</Text>
              </View>
            </View>
          </View>

          {/* Insights */}
          <Text style={[styles.sectionTitle, { marginTop: 8, marginBottom: 12 }]}>Insights</Text>
          <DiningMetricCard items={METRICS} />

          {/* Transactions */}
          <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Recent Transactions</Text>
          {TRANSACTIONS.map((t) => (
            <DiningTransactionRow key={t.id} item={t} />
          ))}

          {/* Budget alert */}
          <View style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Ionicons name="warning-outline" size={16} color="#D97706" />
              <Text style={styles.alertTitle}>Budget Reminder</Text>
            </View>
            <Text style={styles.alertBody}>
              At your current pace, your Dining Dollars may last 12 more meals. Add funds before finals week.
            </Text>
            <TouchableOpacity style={styles.alertBtn} onPress={() => onNavigate('adddiningdollars')} activeOpacity={0.85}>
              <Text style={styles.alertBtnText}>Add Funds</Text>
            </TouchableOpacity>
          </View>

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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 15, fontWeight: '800', color: '#C8102E' },
  headerSub: { fontSize: 9, fontWeight: '700', color: '#AAAAAA', letterSpacing: 1.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  avatarCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  viewMap: { fontSize: 13, fontWeight: '700', color: '#C8102E' },
  popularCard: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  popularRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  popularEmoji: { fontSize: 24 },
  popularTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  popularSub: { fontSize: 12, color: '#888', marginTop: 2 },
  alertCard: {
    backgroundColor: '#FFFBEB', borderRadius: 18, padding: 16, marginTop: 12,
    borderLeftWidth: 4, borderLeftColor: '#F59E0B',
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#92400E' },
  alertBody: { fontSize: 13, color: '#78350F', lineHeight: 19, marginBottom: 14 },
  alertBtn: { alignSelf: 'flex-start', backgroundColor: '#F59E0B', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  alertBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});
