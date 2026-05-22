import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Club {
  id: string;
  name: string;
  icon: string;       // Ionicons icon name
  iconBg: string;     // icon background color
  iconColor: string;
  memberCount: string; // e.g. "+1k", "+240"
}

interface Props {
  club: Club;
  joined: boolean;
  onJoin: (club: Club) => void;
}

// Fake avatar colors for member preview circles
const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

export default function ClubListCard({ club, joined, onJoin }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => !joined && onJoin(club)}
      activeOpacity={0.9}
    >
      {/* Left icon square */}
      <View style={[styles.iconSquare, { backgroundColor: club.iconBg }]}>
        <Ionicons name={club.icon as any} size={22} color={club.iconColor} />
      </View>

      {/* Club name + member preview */}
      <View style={styles.info}>
        <Text style={styles.clubName}>{club.name}</Text>
        <View style={styles.membersRow}>
          {AVATAR_COLORS.map((c, i) => (
            <View
              key={i}
              style={[
                styles.memberAvatar,
                { backgroundColor: c, marginLeft: i === 0 ? 0 : -8 },
              ]}
            />
          ))}
          <Text style={styles.memberCount}>{club.memberCount}</Text>
        </View>
      </View>

      {/* Quick Join button */}
      <TouchableOpacity
        style={[styles.joinBtn, joined && styles.joinBtnJoined]}
        onPress={() => !joined && onJoin(club)}
        activeOpacity={0.85}
      >
        <Text style={[styles.joinBtnText, joined && styles.joinBtnTextJoined]}>
          {joined ? 'Joined' : 'QUICK JOIN'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  iconSquare: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 6,
  },
  clubName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  memberCount: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
    marginLeft: 6,
  },
  joinBtn: {
    backgroundColor: '#FFF1F1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#F5C0C0',
  },
  joinBtnJoined: {
    backgroundColor: '#F5F5F5',
    borderColor: '#DDDDDD',
  },
  joinBtnText: {
    color: '#C8102E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  joinBtnTextJoined: {
    color: '#AAAAAA',
  },
});
