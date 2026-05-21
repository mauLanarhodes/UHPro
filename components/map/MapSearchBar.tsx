import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onSearch: () => void;
  onFilter: () => void;
}

export default function MapSearchBar({ onSearch, onFilter }: Props) {
  return (
    <View style={styles.container}>
      {/* Search input area */}
      <TouchableOpacity style={styles.searchArea} onPress={onSearch} activeOpacity={0.85}>
        <Ionicons name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <Text style={styles.placeholder}>Find a place</Text>
      </TouchableOpacity>

      {/* Filter button */}
      <TouchableOpacity style={styles.filterBtn} onPress={onFilter} activeOpacity={0.8}>
        <Ionicons name="options-outline" size={18} color="#444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 20,
  },
  searchArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: { marginRight: 8 },
  placeholder: {
    color: '#AAAAAA',
    fontSize: 15,
    fontWeight: '400',
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
});
