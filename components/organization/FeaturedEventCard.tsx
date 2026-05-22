import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// Use a cinematic gala image if available
// Place at: assets/images/gala_night.png
let bgImage: any = null;
try { bgImage = require('../../../assets/images/gala_night.png'); } catch { bgImage = null; }

interface Props {
  onRSVP: () => void;
}

export default function FeaturedEventCard({ onRSVP }: Props) {
  const Inner = (
    <>
      {/* Cinematic dark gradient overlay — dark at bottom, lighter at top */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* Content sits at bottom */}
      <View style={styles.content}>
        {/* Featured pill */}
        <View style={styles.featuredPill}>
          <Text style={styles.featuredPillText}>FEATURED EVENT</Text>
        </View>

        {/* Large bold title */}
        <Text style={styles.title}>Cultural{'\n'}Gala Night{'\n'}2024</Text>

        {/* Description */}
        <Text style={styles.description}>
          An evening of heritage, high fashion, and global flavors. Join us for
          the biggest cultural celebration on campus.
        </Text>

        {/* RSVP button */}
        <TouchableOpacity style={styles.rsvpBtn} onPress={onRSVP} activeOpacity={0.85}>
          <Text style={styles.rsvpBtnText}>RSVP Now →</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onRSVP} activeOpacity={0.95}>
      {bgImage ? (
        <ImageBackground source={bgImage} style={styles.cardInner} imageStyle={styles.cardImage} resizeMode="cover">
          {Inner}
        </ImageBackground>
      ) : (
        <View style={[styles.cardInner, styles.cardPlaceholder]}>{Inner}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24, overflow: 'hidden',
    marginBottom: 28, height: 340,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22, shadowRadius: 16, elevation: 10,
  },
  cardInner: { flex: 1, justifyContent: 'flex-end' },
  cardImage: { borderRadius: 24 },
  cardPlaceholder: { backgroundColor: '#1A0A0A' },

  // Dark overlay top (lighter)
  gradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    top: 0, height: '40%',
  },
  // Dark overlay bottom (darker for text readability)
  gradientBottom: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.72)',
    top: '30%',
  },

  content: { padding: 20, paddingBottom: 22 },
  featuredPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8102E',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
    marginBottom: 12,
  },
  featuredPillText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  title: {
    color: '#FFFFFF', fontSize: 34, fontWeight: '900',
    lineHeight: 38, marginBottom: 10,
  },
  description: {
    color: 'rgba(255,255,255,0.82)', fontSize: 13,
    lineHeight: 19, marginBottom: 18,
  },
  rsvpBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8102E', borderRadius: 24,
    paddingHorizontal: 22, paddingVertical: 12,
  },
  rsvpBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
