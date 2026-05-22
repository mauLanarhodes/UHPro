import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/types/navigation';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNavigate: (screen: Screen) => void;
  bgColor?: string;
  titleColor?: string;
  light?: boolean; // white icons for dark backgrounds
}

export default function HeaderWithScanner({
  title, showBack = false, onBack, onNavigate,
  bgColor = '#FFFFFF', titleColor = '#1A1A1A', light = false,
}: Props) {
  const iconColor = light ? '#FFFFFF' : '#C8102E';

  return (
    <View style={[styles.header, { backgroundColor: bgColor }]}>
      {/* Left: back arrow or spacer */}
      {showBack ? (
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconBtn} />
      )}

      {/* Center title */}
      {title ? (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {/* Right: scanner icon + avatar */}
      <View style={styles.rightRow}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => onNavigate('digitalidentity')}
          activeOpacity={0.8}
        >
          <Ionicons name="qr-code-outline" size={22} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.avatarCircle}
          onPress={() => onNavigate('profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarEmoji}>🐨</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 8 : 4,
    paddingBottom: 10,
  },
  iconBtn: {
    width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    flex: 1, textAlign: 'center',
    fontSize: 17, fontWeight: '700',
  },
  rightRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  avatarCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 17 },
});
