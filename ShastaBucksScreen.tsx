import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import BalanceHeroCard from './components/shastabucks/BalanceHeroCard';
import SummaryMetricCard, { Metric } from './components/shastabucks/SummaryMetricCard';
import SpendingInsightCard from './components/shastabucks/SpendingInsightCard';
import TransactionRow, { Transaction } from './components/shastabucks/TransactionRow';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
  balance: number;
}

const METRICS: Metric[] = [
  { label: 'This Month Spent', value: '$46.80', icon: 'trending-down-outline', iconBg: '#FFEAEA', iconColor: '#C8102E' },
  { label: 'Last Reload',      value: '$25.00', icon: 'reload-outline',         iconBg: '#EAFFF5', iconColor: '#16A34A' },
  { label: 'Favorite Place',   value: 'Cougar Woods', icon: 'restaurant-outline', iconBg: '#FEF3C7', iconColor: '#D97706' },
  { label: 'Meal Streak',      value: '4 days',  icon: 'flame-outline',         iconBg: '#FFF1F1', iconColor: '#EF4444' },
];

const TRANSACTIONS: Transaction[] = [
  { id:'1', title:'Cougar Woods Dining',   datetime:'Today, 6:42 PM',       amount:'-$12.45', isCredit:false, icon:'restaurant-outline', iconBg:'#FFEAEA', iconColor:'#C8102E', badge:'MOST VISITED' },
  { id:'2', title:'Student Center Market', datetime:'Yesterday, 2:15 PM',   amount:'-$6.20',  isCredit:false, icon:'bag-handle-outline',  iconBg:'#EAF0FF', iconColor:'#2B6CB0' },
  { id:'3', title:'Reload Added',          datetime:'May 18, 10:05 AM',     amount:'+$25.00', isCredit:true,  icon:'add-circle-outline',  iconBg:'#EAFFF5', iconColor:'#16A34A' },
  { id:'4', title:'Print Lab',             datetime:'May 16, 1:40 PM',      amount:'-$2.10',  isCredit:false, icon:'print-outline',       iconBg:'#F5F5F5', iconColor:'#888888' },
];

export default function ShastaBucksScreen({ onNavigate, onBack, balance }: Props) {
  const isLowBalance = balance < 20;

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
            <Text style={styles.headerTitle}>DigitalUH</Text>
            <Text style={styles.headerSub}>CAMPUS WALLET</Text>
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

          {/* Page title */}
          <Text style={styles.pageTitle}>ShastaBUCKS</Text>
          <Text style={styles.pageSubtitle}>Your campus financial hub</Text>

          {/* Balance hero card */}
          <BalanceHeroCard
            balance={balance}
            onAddFunds={() => onNavigate('addfunds')}
            onScanPay={() => onNavigate('digitalidentity')}
            onTransfer={() => console.log('Transfer')}
          />

          {/* Budget insight */}
          <SpendingInsightCard onAddFunds={() => onNavigate('addfunds')} />

          {/* Weekly Spending section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Spending</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.viewReports}>View Reports</Text>
            </TouchableOpacity>
          </View>

          {/* Summary metrics */}
          <SummaryMetricCard items={METRICS} />

          {/* Transactions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
          </View>
          {TRANSACTIONS.map((t) => (
            <TransactionRow key={t.id} item={t} />
          ))}

          {/* Low balance alert */}
          {isLowBalance && (
            <View style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Ionicons name="warning-outline" size={18} color="#C8102E" />
                <Text style={styles.alertTitle}>Low Balance Alert</Text>
              </View>
              <Text style={styles.alertBody}>
                Your balance is below $20. Add funds to keep using campus services without interruption.
              </Text>
              <TouchableOpacity
                style={styles.alertBtn}
                onPress={() => onNavigate('addfunds')}
                activeOpacity={0.85}
              >
                <Text style={styles.alertBtnText}>Add Funds Now</Text>
              </TouchableOpacity>
            </View>
          )}

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
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  headerSub: { fontSize: 9, fontWeight: '700', color: '#AAAAAA', letterSpacing: 1.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  avatarCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4 },
  pageTitle: { fontSize: 30, fontWeight: '900', color: '#1A1A1A', marginBottom: 2 },
  pageSubtitle: { fontSize: 13, color: '#888', marginBottom: 18 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12, marginTop: 4,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  viewReports: { fontSize: 13, fontWeight: '700', color: '#C8102E' },
  alertCard: {
    backgroundColor: '#FFF1F1', borderRadius: 18,
    padding: 16, marginTop: 12,
    borderWidth: 1, borderColor: '#F5C0C0',
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#C8102E' },
  alertBody: { fontSize: 13, color: '#555', lineHeight: 19, marginBottom: 14 },
  alertBtn: {
    backgroundColor: '#C8102E', borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
  },
  alertBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
