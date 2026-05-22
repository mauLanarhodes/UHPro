import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/types/navigation';

interface Props {
  activeTab: string;
  onNavigate: (screen: Screen) => void;
}

const tabs = [
  { key: 'home',     icon: 'home-outline',       activeIcon: 'home',        screen: 'home'     as Screen },
  { key: 'schedule', icon: 'calendar-outline',   activeIcon: 'calendar',    screen: 'schedule' as Screen },
  { key: 'shuttle',  icon: 'bus-outline',        activeIcon: 'bus',         screen: 'home'     as Screen },
  { key: 'helpline', icon: 'headset-outline',    activeIcon: 'headset',     screen: 'helpline' as Screen },
];

export default function FooterNav({ activeTab, onNavigate }: Props) {
  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onNavigate(tab.screen)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={(isActive ? tab.activeIcon : tab.icon) as any}
              size={24}
              color={isActive ? '#FFFFFF' : '#999999'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: '#C8102E',
    width: 50,
    height: 50,
  },
});
