import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  major: string;
  uhId: string;
  onEdit: () => void;
}

export default function ProfileHeroCard({ name, major, uhId, onEdit }: Props) {
  return (
    <View style={styles.card}>
      {/* Edit pencil top right */}
      <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.8}>
        <Ionicons name="pencil" size={16} color="#888" />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>🐨</Text>
        </View>
        {/* Red camera button */}
        <TouchableOpacity style={styles.cameraBtn} onPress={onEdit} activeOpacity={0.8}>
          <Ionicons name="camera" size={12} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.major}>{major}</Text>

      {/* Pills row */}
      <View style={styles.pillsRow}>
        <View style={styles.pillGray}>
          <Text style={styles.pillGrayText}>UH ID:{'\n'}{uhId}</Text>
        </View>
        <View style={styles.pillRed}>
          <Text style={styles.pillRedText}>Undergraduate{'\n'}Student</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    position: 'relative',
  },
  editBtn: {
    position: 'absolute', top: 16, right: 16,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarWrapper: { position: 'relative', marginBottom: 14 },
  avatarCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#F0E0E0',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  avatarEmoji: { fontSize: 44 },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#C8102E',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  name: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 4 },
  major: { fontSize: 14, color: '#888', fontWeight: '400', marginBottom: 16 },
  pillsRow: { flexDirection: 'row', gap: 10 },
  pillGray: {
    backgroundColor: '#F5F5F5', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center',
  },
  pillGrayText: { fontSize: 12, color: '#444', fontWeight: '700', textAlign: 'center' },
  pillRed: {
    backgroundColor: '#C8102E', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center',
  },
  pillRedText: { fontSize: 12, color: '#FFFFFF', fontWeight: '700', textAlign: 'center' },
});
