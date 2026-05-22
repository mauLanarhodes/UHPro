import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type SupportCardVariant = 'caps' | 'health' | 'travel' | 'facilities';

interface Props {
  variant: SupportCardVariant;
  onPress: () => void;
}

// ─── Data per variant ─────────────────────────────────────────────────────────
const cardData = {
  caps: {
    bg: '#FFFFFF',
    category: 'MENTAL HEALTH',
    categoryColor: '#2B6CB0',
    title: 'CAPS Counseling',
    titleColor: '#1A1A1A',
    iconName: 'happy-outline',
    iconBg: '#EBF4FF',
    iconColor: '#2B6CB0',
    body: 'Confidential clinical services and 24/7 crisis support for all students.',
    crisisLine: 'Crisis Line : 24/7 Available',
    emergencyLabel: 'EMERGENCY PHONE',
    emergencyNumber: '(713) 743-5454',
    emergencyBg: '#2B6CB0',
    btnLabel: 'Call Crisis Line',
    btnBg: '#2B6CB0',
    btnTextColor: '#FFFFFF',
  },
  health: {
    bg: '#F5F0F0',
    category: '',
    categoryColor: '#C8102E',
    title: 'Health Center',
    titleColor: '#1A1A1A',
    iconName: 'heart-outline',
    iconBg: '#F5E0E0',
    iconColor: '#C8102E',
    body: 'On-campus clinical care and pharmacy services.',
    crisisLine: '',
    emergencyLabel: 'AFTER-HOURS NURSE',
    emergencyNumber: '(713) 743-5151',
    emergencyBg: '#FFFFFF',
    btnLabel: 'Call Clinic',
    btnBg: '#FFFFFF',
    btnTextColor: '#1A1A1A',
  },
  travel: {
    bg: '#1E2D5A',
    category: 'INTERNATIONAL SUPPORT',
    categoryColor: '#93C5FD',
    title: 'Travel & Visa Crisis',
    titleColor: '#FFFFFF',
    iconName: 'chatbubble-ellipses-outline',
    iconBg: 'rgba(255,255,255,0.15)',
    iconColor: '#FFFFFF',
    body: 'Immediate assistance for international students facing travel or legal documentation emergencies.',
    crisisLine: '',
    emergencyLabel: '',
    emergencyNumber: '',
    emergencyBg: '',
    btnLabel: 'ISSS Emergency',
    btnBg: 'rgba(255,255,255,0.2)',
    btnTextColor: '#FFFFFF',
  },
  facilities: {
    bg: '#FFFFFF',
    category: '',
    categoryColor: '#888',
    title: 'Facilities Emergency',
    titleColor: '#1A1A1A',
    iconName: 'construct-outline',
    iconBg: '#EEEEEE',
    iconColor: '#888',
    body: 'Reporting urgent maintenance, power outages, or housing safety issues.',
    crisisLine: '',
    emergencyLabel: '',
    emergencyNumber: '',
    emergencyBg: '',
    btnLabel: '24/7 FIXIT',
    btnBg: '#EEEEEE',
    btnTextColor: '#444',
  },
};

export default function SupportCard({ variant, onPress }: Props) {
  const d = cardData[variant];
  const isTravel = variant === 'travel';
  const isFacilities = variant === 'facilities';
  const isHealth = variant === 'health';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: d.bg }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Icon circle + category row */}
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, { backgroundColor: d.iconBg }]}>
          <Ionicons name={d.iconName as any} size={24} color={d.iconColor} />
        </View>
        {!!d.category && (
          <Text style={[styles.category, { color: d.categoryColor }]}>
            {d.category}
          </Text>
        )}
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: d.titleColor }]}>{d.title}</Text>

      {/* Body text */}
      <Text style={[styles.body, isTravel && styles.bodyLight]}>{d.body}</Text>

      {/* Crisis line row (CAPS only) */}
      {!!d.crisisLine && (
        <View style={styles.crisisRow}>
          <Ionicons name="time-outline" size={14} color="#2B6CB0" />
          <Text style={styles.crisisText}>{d.crisisLine}</Text>
        </View>
      )}

      {/* Emergency box (CAPS + Health) */}
      {!!d.emergencyNumber && (
        <View style={[styles.emergencyBox, { backgroundColor: d.emergencyBg }]}>
          {!!d.emergencyLabel && (
            <Text style={[
              styles.emergencyLabel,
              isHealth && styles.emergencyLabelRed,
            ]}>
              {d.emergencyLabel}
            </Text>
          )}
          <Text style={[
            styles.emergencyNumber,
            isTravel || isHealth ? {} : styles.emergencyNumberWhite,
          ]}>
            {d.emergencyNumber}
          </Text>
        </View>
      )}

      {/* Action button */}
      <TouchableOpacity
        style={[styles.actionBtn, { backgroundColor: d.btnBg }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {isFacilities && (
          <Ionicons name="call-outline" size={16} color="#C8102E" style={{ marginLeft: 8 }} />
        )}
        <Text style={[styles.actionBtnText, { color: d.btnTextColor }]}>
          {d.btnLabel}
        </Text>
        {isTravel && (
          <Ionicons name="help-circle-outline" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
        )}
        {isHealth && (
          <Ionicons name="call-outline" size={16} color="#C8102E" style={{ marginLeft: 8 }} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 28,
  },
  body: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 14,
  },
  bodyLight: {
    color: 'rgba(255,255,255,0.8)',
  },
  crisisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  crisisText: {
    color: '#2B6CB0',
    fontSize: 13,
    fontWeight: '600',
  },
  emergencyBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  emergencyLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  emergencyLabelRed: {
    color: '#C8102E',
  },
  emergencyNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  emergencyNumberWhite: {
    color: '#FFFFFF',
  },
  actionBtn: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
