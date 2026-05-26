import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, StatusBar, Platform, TouchableOpacity,
  TextInput, KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';
import AddFundsAmountPill from './components/shastabucks/AddFundsAmountPill';
import PaymentMethodCard, { PaymentMethod } from './components/shastabucks/PaymentMethodCard';
import AddFundsSuccessModal from './components/shastabucks/AddFundsSuccessModal';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
  currentBalance: number;
  onFundsAdded: (amount: number) => void;
}

const PRESET_AMOUNTS = ['$10', '$20', '$50', '$100', 'Custom'];

const PAYMENT_METHODS: PaymentMethod[] = [
  { id:'card',  label:'Credit / Debit Card', subtitle:'Ending in 4242',  icon:'card-outline',        iconBg:'#EAF0FF', iconColor:'#2B6CB0' },
  { id:'apple', label:'Apple Pay',           subtitle:'Touch ID ready',   icon:'phone-portrait-outline', iconBg:'#F5F5F5', iconColor:'#333'    },
  { id:'bank',  label:'Bank Account',        subtitle:'ACH Transfer',     icon:'business-outline',    iconBg:'#EAFFF5', iconColor:'#16A34A' },
];

export default function AddFundsScreen({ onNavigate, onBack, currentBalance, onFundsAdded }: Props) {
  const [selectedAmount, setSelectedAmount] = useState('$20');
  const [customAmount, setCustomAmount]     = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [showSuccess, setShowSuccess]       = useState(false);

  // Parse selected amount to number
  const getAmount = (): number => {
    if (selectedAmount === 'Custom') {
      return parseFloat(customAmount) || 0;
    }
    return parseFloat(selectedAmount.replace('$', ''));
  };

  const amount  = getAmount();
  const fee     = amount > 0 ? Math.round((amount * 0.029 + 0.30) * 100) / 100 : 0;
  const total   = Math.round((amount + fee) * 100) / 100;
  const newBal  = Math.round((currentBalance + amount) * 100) / 100;

  const handleAddFunds = () => {
    if (amount <= 0) return;
    setShowSuccess(true);
  };

  const handleDone = () => {
    setShowSuccess(false);
    onFundsAdded(amount);
    onBack(); // go back to ShastaBucksScreen with updated balance
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />
        <SafeAreaView style={styles.safeArea}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.8}>
              <Ionicons name="chevron-back" size={24} color="#C8102E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Funds</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => onNavigate('digitalidentity')} style={styles.iconBtn} activeOpacity={0.8}>
                <Ionicons name="qr-code-outline" size={22} color="#C8102E" />
              </TouchableOpacity>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>🐨</Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            {/* Balance preview card */}
            <View style={styles.balancePreviewCard}>
              <Text style={styles.previewLabel}>Current Balance</Text>
              <Text style={styles.previewBalance}>${currentBalance.toFixed(2)}</Text>
              {amount > 0 && (
                <View style={styles.newBalRow}>
                  <Ionicons name="arrow-forward" size={14} color="#16A34A" />
                  <Text style={styles.newBalText}>New Balance: ${newBal.toFixed(2)}</Text>
                </View>
              )}
            </View>

            {/* Amount selection */}
            <Text style={styles.sectionLabel}>SELECT AMOUNT</Text>
            <View style={styles.amountGrid}>
              {PRESET_AMOUNTS.map((a) => (
                <AddFundsAmountPill
                  key={a}
                  label={a}
                  active={selectedAmount === a}
                  onPress={() => setSelectedAmount(a)}
                />
              ))}
            </View>

            {/* Custom amount input */}
            {selectedAmount === 'Custom' && (
              <View style={styles.customInput}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.customTextInput}
                  placeholder="Enter amount"
                  placeholderTextColor="#BBBBBB"
                  keyboardType="decimal-pad"
                  value={customAmount}
                  onChangeText={setCustomAmount}
                  autoFocus
                />
              </View>
            )}

            {/* Payment method */}
            <Text style={styles.sectionLabel}>PAYMENT METHOD</Text>
            {PAYMENT_METHODS.map((m) => (
              <PaymentMethodCard
                key={m.id}
                method={m}
                selected={selectedMethod === m.id}
                onSelect={() => setSelectedMethod(m.id)}
              />
            ))}

            {/* Review */}
            {amount > 0 && (
              <>
                <Text style={styles.sectionLabel}>REVIEW</Text>
                <View style={styles.reviewCard}>
                  {[
                    { label: 'Add Amount',      value: `$${amount.toFixed(2)}` },
                    { label: 'Processing Fee',  value: `$${fee.toFixed(2)}` },
                    { label: 'Total Charged',   value: `$${total.toFixed(2)}`, bold: true },
                    { label: 'New Balance',     value: `$${newBal.toFixed(2)}`, green: true },
                  ].map((row, i) => (
                    <View key={i} style={[styles.reviewRow, i > 0 && styles.reviewRowBorder]}>
                      <Text style={styles.reviewLabel}>{row.label}</Text>
                      <Text style={[
                        styles.reviewValue,
                        (row as any).bold  && styles.reviewValueBold,
                        (row as any).green && styles.reviewValueGreen,
                      ]}>
                        {row.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Add Funds button */}
            <TouchableOpacity
              style={[styles.addBtn, amount <= 0 && styles.addBtnDisabled]}
              onPress={handleAddFunds}
              activeOpacity={0.85}
            >
              <Text style={styles.addBtnText}>
                {amount > 0 ? `Add $${amount.toFixed(2)} to ShastaBucks` : 'Select an Amount'}
              </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>

        <AddFundsSuccessModal
          visible={showSuccess}
          newBalance={newBal}
          onDone={handleDone}
        />
      </View>
    </KeyboardAvoidingView>
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  avatarCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },

  balancePreviewCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 20, alignItems: 'center', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  previewLabel: { fontSize: 12, color: '#AAAAAA', fontWeight: '600', marginBottom: 6 },
  previewBalance: { fontSize: 40, fontWeight: '900', color: '#1A1A1A' },
  newBalRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  newBalText: { fontSize: 14, color: '#16A34A', fontWeight: '700' },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#AAAAAA',
    letterSpacing: 1.5, marginBottom: 10, marginTop: 4,
  },
  amountGrid: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },

  customInput: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 12,
    marginBottom: 16, borderWidth: 2, borderColor: '#C8102E',
    gap: 8,
  },
  dollarSign: { fontSize: 22, fontWeight: '800', color: '#C8102E' },
  customTextInput: { flex: 1, fontSize: 22, fontWeight: '700', color: '#1A1A1A' },

  reviewCard: {
    backgroundColor: '#FFFFFF', borderRadius: 18,
    paddingHorizontal: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  reviewRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 14,
  },
  reviewRowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#F0F0F0' },
  reviewLabel: { fontSize: 14, color: '#666' },
  reviewValue: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  reviewValueBold: { fontWeight: '800', fontSize: 15 },
  reviewValueGreen: { color: '#16A34A', fontWeight: '800' },

  addBtn: {
    backgroundColor: '#C8102E', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  addBtnDisabled: { backgroundColor: '#E0A0A0' },
  addBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
