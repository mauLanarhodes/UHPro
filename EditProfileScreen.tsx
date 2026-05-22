import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  StatusBar, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export default function EditProfileScreen({ onNavigate, onBack }: Props) {
  const [preferredName, setPreferredName] = useState('Khushbu');
  const [pronouns, setPronouns]           = useState('He / Him');
  const [secondaryEmail, setSecondaryEmail] = useState('Khush_personal@uh.edu');
  const [saved, setSaved]                 = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onBack();
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.8}>
              <Ionicons name="chevron-back" size={24} color="#C8102E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🐨</Text>
            </View>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Avatar */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarBig}>
                  <Text style={styles.avatarBigEmoji}>🐨</Text>
                </View>
                <TouchableOpacity style={styles.editCircle} activeOpacity={0.8}>
                  <Ionicons name="pencil" size={13} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.changePicText}>Change Profile Picture</Text>
            </View>

            {/* Fields */}
            <Text style={styles.fieldLabel}>PREFERRED NAME</Text>
            <View style={styles.inputCard}>
              <Ionicons name="person-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={preferredName}
                onChangeText={setPreferredName}
                placeholder="Preferred name"
                placeholderTextColor="#BBBBBB"
              />
            </View>

            <Text style={styles.fieldLabel}>PRONOUNS</Text>
            <View style={styles.inputCard}>
              <Ionicons name="people-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={pronouns}
                onChangeText={setPronouns}
                placeholder="Pronouns"
                placeholderTextColor="#BBBBBB"
              />
            </View>

            <Text style={styles.fieldLabel}>SECONDARY EMAIL</Text>
            <View style={styles.inputCard}>
              <Ionicons name="at-outline" size={18} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={secondaryEmail}
                onChangeText={setSecondaryEmail}
                placeholder="Secondary email"
                placeholderTextColor="#BBBBBB"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Save button */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>
                {saved ? 'Saved ✓' : 'Save Changes'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Changes will reflect across all DigitalUH services.
            </Text>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A1A' },
  avatarCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F0E0E0', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 17 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatarWrapper: { position: 'relative', marginBottom: 10 },
  avatarBig: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#F0E0E0',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#FFFFFF',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  avatarBigEmoji: { fontSize: 44 },
  editCircle: {
    position: 'absolute', bottom: 2, right: 2,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#C8102E',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  changePicText: { fontSize: 14, color: '#555', fontWeight: '500' },
  fieldLabel: {
    fontSize: 11, fontWeight: '700', color: '#AAAAAA',
    letterSpacing: 1.5, marginBottom: 8, marginTop: 16,
  },
  inputCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F5F5', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 12,
    gap: 10,
  },
  inputIcon: { flexShrink: 0 },
  input: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  saveBtn: {
    backgroundColor: '#C8102E', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center', marginTop: 32,
  },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  footerNote: {
    textAlign: 'center', fontSize: 12, color: '#AAAAAA',
    marginTop: 12, lineHeight: 18,
  },
});
