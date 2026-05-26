import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props { visible: boolean; newBalance: number; onDone: () => void }

export default function DiningSuccessModal({ visible, newBalance, onDone }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDone}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons name="checkmark-circle" size={64} color="#16A34A" style={{ marginBottom: 14 }} />
          <Text style={styles.title}>Dining Dollars Added!</Text>
          <Text style={styles.subtitle}>Your campus dining balance has been updated.</Text>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>New Balance</Text>
            <Text style={styles.balanceAmount}>${newBalance.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={onDone} activeOpacity={0.85}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 28, width: '100%', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  balanceBox: { backgroundColor: '#F0FFF4', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center', marginBottom: 24, width: '100%' },
  balanceLabel: { fontSize: 12, color: '#16A34A', fontWeight: '700', marginBottom: 4 },
  balanceAmount: { fontSize: 32, fontWeight: '900', color: '#15803D' },
  doneBtn: { backgroundColor: '#C8102E', borderRadius: 14, paddingVertical: 15, width: '100%', alignItems: 'center' },
  doneBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
