import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

let mapBg: any = null;
try { mapBg = require('../../../assets/images/shuttle_map_preview.png'); } catch { mapBg = null; }

interface Props {
  onOpenMap: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function LiveTrackerCard({ onOpenMap, onZoomIn, onZoomOut }: Props) {
  const Inner = (
    <>
      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Simulated route lines */}
      <View style={[styles.routeLine, { top: '30%', left: '10%', width: '50%', backgroundColor: '#14B8A6', transform: [{ rotate: '15deg' }] }]} />
      <View style={[styles.routeLine, { top: '50%', left: '20%', width: '60%', backgroundColor: '#F59E0B', transform: [{ rotate: '-8deg' }] }]} />
      <View style={[styles.routeLine, { top: '65%', left: '5%',  width: '45%', backgroundColor: '#EF4444', transform: [{ rotate: '5deg' }] }]} />

      {/* Zoom controls - right side */}
      <View style={styles.zoomPill}>
        <TouchableOpacity style={styles.zoomBtn} onPress={onZoomIn} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="#333" />
        </TouchableOpacity>
        <View style={styles.zoomDivider} />
        <TouchableOpacity style={styles.zoomBtn} onPress={onZoomOut} activeOpacity={0.8}>
          <Ionicons name="remove" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Open Full Map button - bottom */}
      <TouchableOpacity style={styles.openMapBtn} onPress={onOpenMap} activeOpacity={0.88}>
        <Ionicons name="map-outline" size={16} color="#333" style={{ marginRight: 6 }} />
        <Text style={styles.openMapText}>Open Full Map</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onOpenMap} activeOpacity={0.95}>
      {mapBg ? (
        <ImageBackground source={mapBg} style={styles.mapArea} imageStyle={styles.mapImage} resizeMode="cover">
          {Inner}
        </ImageBackground>
      ) : (
        <View style={[styles.mapArea, styles.mapPlaceholder]}>{Inner}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22, overflow: 'hidden', height: 220, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
  },
  mapArea: { flex: 1 },
  mapImage: { borderRadius: 22 },
  mapPlaceholder: { backgroundColor: '#0D3348' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,30,50,0.5)' },
  routeLine: { position: 'absolute', height: 3, borderRadius: 2, opacity: 0.85 },
  zoomPill: {
    position: 'absolute', right: 12, top: 14,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 4, elevation: 4,
  },
  zoomBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  zoomDivider: { height: StyleSheet.hairlineWidth, backgroundColor: '#DDD', marginHorizontal: 6 },
  openMapBtn: {
    position: 'absolute', bottom: 14, left: 14, right: 14,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 14, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 12,
  },
  openMapText: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
});
