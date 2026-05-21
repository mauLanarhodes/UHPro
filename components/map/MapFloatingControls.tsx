import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onLayers: () => void;
  onLocation: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function MapFloatingControls({
  onLayers, onLocation, onZoomIn, onZoomOut,
}: Props) {
  return (
    <View style={styles.container}>

      {/* Layers / map icon button */}
      <TouchableOpacity style={styles.iconBtn} onPress={onLayers} activeOpacity={0.8}>
        <Ionicons name="map-outline" size={22} color="#444" />
      </TouchableOpacity>

      {/* Red location pin button */}
      <TouchableOpacity style={[styles.iconBtn, styles.locationBtn]} onPress={onLocation} activeOpacity={0.8}>
        <Ionicons name="location" size={22} color="#C8102E" />
      </TouchableOpacity>

      {/* Zoom pill — plus on top, minus on bottom */}
      <View style={styles.zoomPill}>
        <TouchableOpacity style={styles.zoomBtn} onPress={onZoomIn} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color="#333" />
        </TouchableOpacity>
        {/* Divider */}
        <View style={styles.zoomDivider} />
        <TouchableOpacity style={styles.zoomBtn} onPress={onZoomOut} activeOpacity={0.8}>
          <Ionicons name="remove" size={24} color="#333" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 80,          // below search bar
    alignItems: 'center',
    gap: 10,
    zIndex: 20,
  },

  // Single icon button (white circle)
  iconBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
  },
  locationBtn: {
    // same style, just red icon inside
  },

  // Zoom pill (plus + minus grouped)
  zoomPill: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 24,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 4,
  },
  zoomBtn: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    width: 28,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDDDDD',
  },
});
