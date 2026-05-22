import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  clubName: string;
  onViewClub: () => void;
  onDone: () => void;
}

export default function JoinClubModal({ visible, clubName, onViewClub, onDone }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDone}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Success icon */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle" size={56} color="#C8102E" />
          </View>

          <Text style={styles.heading}>You joined! 🎉</Text>
          <Text style={styles.clubName}>{clubName}</Text>

          <Text style={styles.message}>
            Welcome to the club hub. Upcoming events and announcements will
            appear in your dashboard.
          </Text>

          <TouchableOpacity style={styles.viewBtn} onPress={onViewClub} activeOpacity={0.85}>
            <Text style={styles.viewBtnText}>View Club</Text>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 28,
    paddingBottom: 44,
    alignItems: 'center',
  },
  iconCircle: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  clubName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#C8102E',
    marginBottom: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 26,
    paddingHorizontal: 10,
  },
  viewBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    paddingVertical: 15,
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
    color: '#555',
    fontSize: 15,
    fontWeight: '600',
  },
});
