import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
  Animated, Image, SafeAreaView, StatusBar, Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const uhLogo = require('./assets/images/uh_logo.png');

interface Props {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: Props) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
    Animated.timing(progressAnim, { toValue: 1, duration: 3000, useNativeDriver: false }).start(() => {
      onFinish();
    });
    const pulseDot = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 380, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 380, useNativeDriver: true }),
        ])
      ).start();
    };
    pulseDot(dot1Anim, 0);
    pulseDot(dot2Anim, 180);
    pulseDot(dot3Anim, 360);
  }, []);

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#C8102E" translucent />
      <View style={styles.bgBase} />
      
      <View style={styles.logoWatermarkContainer} pointerEvents="none">
        <Image source={uhLogo} style={styles.logoWatermark} resizeMode="contain" />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.topSection}>
            <Text style={styles.appTitle}>DigitalUH</Text>
            <View style={styles.initRow}>
              <View style={styles.dotsContainer}>
                <Animated.View style={[styles.dot, { opacity: dot1Anim }]} />
                <Animated.View style={[styles.dot, { opacity: dot2Anim }]} />
                <Animated.View style={[styles.dot, { opacity: dot3Anim }]} />
              </View>
              <Text style={styles.initLabel}>SYSTEM INITIALIZATION</Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.bottomSection}>
            <Text style={styles.readyText}>Readying your Digital Identity...</Text>
            <Text style={styles.subtitleText}>
              Optimizing your campus experience for the{'\n'}day ahead.
            </Text>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
            <View style={styles.divider} />
            <View style={styles.securedPill}>
              <Text style={styles.shieldEmoji}>🛡</Text>
              <Text style={styles.securedLabel}>SECURED BY UH IT</Text>
            </View>
            <Text style={styles.versionText}>Version 4.2.0</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#C8102E' },
  bgBase: { ...StyleSheet.absoluteFillObject, backgroundColor: '#C8102E' },
  logoWatermarkContainer: { position: 'absolute', top: height * 0.30, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  logoWatermark: { width: width * 0.75, height: width * 0.75, opacity: 0.06 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  content: { flex: 1, alignItems: 'center' },
  topSection: { alignItems: 'center', marginTop: height * 0.09, gap: 18 },
  appTitle: { fontSize: 46, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  initRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dotsContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#FFFFFF' },
  initLabel: { color: 'rgba(255,255,255,0.82)', fontSize: 11, fontWeight: '600', letterSpacing: 2.8 },
  bottomSection: { width: '100%', alignItems: 'center', paddingHorizontal: 30, paddingBottom: 38, gap: 10 },
  readyText: { color: '#FFFFFF', fontSize: 19, fontWeight: '700', textAlign: 'center' },
  subtitleText: { color: 'rgba(255,255,255,0.72)', fontSize: 14, textAlign: 'center', lineHeight: 21 },
  progressTrack: { width: '100%', height: 2, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 1, marginTop: 10, marginBottom: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FFFFFF', borderRadius: 1 },
  divider: { width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 6 },
  securedPill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.38)', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, marginTop: 4 },
  shieldEmoji: { fontSize: 13 },
  securedLabel: { color: 'rgba(255,255,255,0.88)', fontSize: 11, fontWeight: '600', letterSpacing: 1.8 },
  versionText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 2 },
});
