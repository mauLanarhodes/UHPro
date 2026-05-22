import React, { useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity,
  TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudyGroup } from './StudyGroupCard';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (group: StudyGroup) => void;
}

export default function CreateGroupModal({ visible, onClose, onCreate }: Props) {
  const [courseCode, setCourseCode] = useState('');
  const [topic, setTopic]           = useState('');
  const [location, setLocation]     = useState('');
  const [time, setTime]             = useState('');
  const [invites, setInvites]       = useState('');

  const handleCreate = () => {
    if (!courseCode.trim() || !topic.trim()) return;

    // Build a new StudyGroup from entered data
    const newGroup: StudyGroup = {
      id: Date.now().toString(),
      course: courseCode.trim().toUpperCase(),
      category: 'Custom',
      categoryColor: '#C8102E',
      title: `${courseCode.trim().toUpperCase()}: ${topic.trim()}`,
      topic: topic.trim(),
      location: location.trim() || 'TBD',
      time: time.trim() || 'TBD',
      members: 1,
      maxMembers: 6,
    };

    onCreate(newGroup);
    // Reset fields
    setCourseCode(''); setTopic(''); setLocation('');
    setTime(''); setInvites('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Create Study Group</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={26} color="#999" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Course code */}
            <Text style={styles.fieldLabel}>Course Code *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. COSC 3340"
              placeholderTextColor="#BBBBBB"
              value={courseCode}
              onChangeText={setCourseCode}
              autoCapitalize="characters"
            />

            {/* Topic */}
            <Text style={styles.fieldLabel}>Group Topic *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Exam 2 Review"
              placeholderTextColor="#BBBBBB"
              value={topic}
              onChangeText={setTopic}
            />

            {/* Location */}
            <Text style={styles.fieldLabel}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. MD Anderson Library Room 210K"
              placeholderTextColor="#BBBBBB"
              value={location}
              onChangeText={setLocation}
            />

            {/* Time */}
            <Text style={styles.fieldLabel}>Date & Time</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Today, 4:00 - 6:00 PM"
              placeholderTextColor="#BBBBBB"
              value={time}
              onChangeText={setTime}
            />

            {/* Invite */}
            <Text style={styles.fieldLabel}>Invite Classmates (optional)</Text>
            <TextInput
              style={[styles.input, styles.inputMulti]}
              placeholder="student1@uh.edu, student2@uh.edu"
              placeholderTextColor="#BBBBBB"
              value={invites}
              onChangeText={setInvites}
              multiline
              numberOfLines={3}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Create button */}
            <TouchableOpacity
              style={[styles.createBtn, (!courseCode || !topic) && styles.createBtnDisabled]}
              onPress={handleCreate}
              activeOpacity={0.85}
            >
              <Text style={styles.createBtnText}>Create Group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.85}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    padding: 24,
    maxHeight: '90%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  inputMulti: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  createBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },
  createBtnDisabled: {
    backgroundColor: '#E0A0A0',
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelBtnText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
});
