import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudyGroup } from './StudyGroupCard';

interface Props {
  visible: boolean;
  group: StudyGroup | null;
  onDone: () => void;
  onViewDetails: () => void;
}

export default function JoinGroupModal({ visible, group, onDone, onViewDetails }: Props) {
  if (!group) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDone}
    >
      {/* Dim background */}
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Success icon */}
          <View style={styles.successCircle}>
            <Ionicons name="checkmark-circle" size={52} color="#C8102E" />
          </View>

          <Text style={styles.youreIn}>You're in! 🎉</Text>
          <Text style={styles.groupTitle}>{group.title}</Text>

          {/* Details */}
          <View style={styles.detailBox}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color="#C8102E" />
              <Text style={styles.detailText}>{group.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color="#C8102E" />
              <Text style={styles.detailText}>{group.location}</Text>
            </View>
          </View>

          <Text style={styles.addedText}>
            Group invite added to your Study Circle ✓
          </Text>

          {/* Buttons */}
          <TouchableOpacity style={styles.viewBtn} onPress={onViewDetails} activeOpacity={0.85}>
            <Text style={styles.viewBtnText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneBtn} onPress={onDone} activeOpacity={0.85}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
    alignItems: 'center',
  },
  successCircle: {
    marginBottom: 12,
  },
  youreIn: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C8102E',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 22,
  },
  detailBox: {
    backgroundColor: '#FFF1F1',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    gap: 10,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  addedText: {
    color: '#2A7B5A',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  viewBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  doneBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#444',
    fontSize: 15,
    fontWeight: '700',
  },
});
