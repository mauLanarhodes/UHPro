import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ImageBackground, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Place the image at: assets/images/study_clubs_bg.png
// If missing, a dark placeholder is shown instead
let bgImage: any = null;
try {
  bgImage = require('../../../assets/images/study_clubs_bg.png');
} catch {
  bgImage = null;
}

interface Props {
  onJoin: () => void;
  joined: boolean;
}

const TAGS = ['FIGMA', 'REACT', 'UI/UX'];

export default function FeaturedClubCard({ onJoin, joined }: Props) {
  const CardContent = (
    <>
      {/* Dark gradient overlay for text readability */}
      <View style={styles.darkOverlay} />

      {/* Glass info panel at bottom */}
      <View style={styles.glassPanel}>
        <View style={styles.glassPanelLeft}>
          {/* Featured Hub pill */}
          <View style={styles.featuredPill}>
            <Text style={styles.featuredPillText}>FEATURED HUB</Text>
          </View>

          {/* Club name */}
          <Text style={styles.clubName}>UX Coogs</Text>

          {/* Members */}
          <Text style={styles.membersText}>450+ Active Members</Text>

          {/* Tag pills */}
          <View style={styles.tagsRow}>
            {TAGS.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Join button */}
        <TouchableOpacity
          style={[styles.joinBtn, joined && styles.joinBtnJoined]}
          onPress={onJoin}
          activeOpacity={0.85}
        >
          <Text style={[styles.joinBtnText, joined && styles.joinBtnTextJoined]}>
            {joined ? 'Joined\n✓' : 'Join\nClub'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onJoin}
      activeOpacity={0.95}
    >
      {bgImage ? (
        <ImageBackground
          source={bgImage}
          style={styles.cardInner}
          imageStyle={styles.cardImage}
          resizeMode="cover"
        >
          {CardContent}
        </ImageBackground>
      ) : (
        // Placeholder when image missing
        <View style={[styles.cardInner, styles.cardPlaceholder]}>
          {CardContent}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    height: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 24,
  },
  cardPlaceholder: {
    backgroundColor: '#1A2A4A',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderRadius: 24,
  },

  // Glass panel
  glassPanel: {
    margin: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.82)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  glassPanelLeft: {
    flex: 1,
    gap: 4,
  },
  featuredPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEAEA',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },
  featuredPillText: {
    color: '#C8102E',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  clubName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  membersText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#444',
    fontWeight: '600',
  },

  // Join button
  joinBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    minWidth: 64,
  },
  joinBtnJoined: {
    backgroundColor: '#F5E0E0',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 18,
  },
  joinBtnTextJoined: {
    color: '#C8102E',
  },
});
