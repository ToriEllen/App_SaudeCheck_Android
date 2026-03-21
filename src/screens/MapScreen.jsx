import { View, StyleSheet } from "react-native"
import Mapbox, { MapView, Camera } from "@rnmapbox/maps"
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN);

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          zoomLevel={12}
          centerCoordinate={[-38.5997, -3.7687]}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
})