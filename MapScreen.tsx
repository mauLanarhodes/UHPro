import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Screen } from './src/types/navigation';
import MapHeader from './components/map/MapHeader';
import MapSearchBar from './components/map/MapSearchBar';
import MapFloatingControls from './components/map/MapFloatingControls';
import FooterNav from './components/layout/FooterNav';
import FloatingAIButton from './components/ai/FloatingAIButton';

interface Props {
  onNavigate: (screen: Screen) => void;
  activeTab: string;
}

// Place your map image at: assets/images/uh_map.png
// Download from: https://www.uh.edu/maps/
// If missing, a colored placeholder is shown instead
let mapImage: any = null;
try {
  mapImage = require('./assets/images/uh_map.png');
} catch {
  mapImage = null;
}

export default function MapScreen({ onNavigate, activeTab }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#C8102E" />

      {/* Red header with safe area at top */}
      <SafeAreaView style={styles.headerSafeArea}>
        <MapHeader onBack={() => onNavigate('home')} />
      </SafeAreaView>

      {/* Full screen map area */}
      <View style={styles.mapContainer}>
        {mapImage ? (
          <ImageBackground
            source={mapImage}
            style={styles.mapBackground}
            resizeMode="cover"
          >
            {/* Search bar floating on map */}
            <MapSearchBar
              onSearch={() => console.log('Search tapped')}
              onFilter={() => console.log('Filter tapped')}
            />

            {/* Right side floating controls */}
            <MapFloatingControls
              onLayers={() => console.log('Layers tapped')}
              onLocation={() => console.log('Location tapped')}
              onZoomIn={() => console.log('Zoom in')}
              onZoomOut={() => console.log('Zoom out')}
            />
          </ImageBackground>
        ) : (
          /* Placeholder when map image is missing */
          <View style={styles.mapPlaceholder}>
            <MapSearchBar
              onSearch={() => console.log('Search tapped')}
              onFilter={() => console.log('Filter tapped')}
            />
            <MapFloatingControls
              onLayers={() => console.log('Layers tapped')}
              onLocation={() => console.log('Location tapped')}
              onZoomIn={() => console.log('Zoom in')}
              onZoomOut={() => console.log('Zoom out')}
            />
          </View>
        )}
      </View>

      {/* Floating AI button */}
      <FloatingAIButton onPress={() => console.log('AI tapped')} />

      {/* Fixed footer */}
      <SafeAreaView style={styles.footerSafeArea}>
        <FooterNav activeTab={activeTab} onNavigate={onNavigate} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  headerSafeArea: {
    backgroundColor: '#C8102E',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mapContainer: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Shown when uh_map.png is missing
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#C8E6B0',  // light green like map grass
  },
  footerSafeArea: {
    backgroundColor: '#FFFFFF',
  },
});
