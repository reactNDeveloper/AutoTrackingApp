import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../components/text';
import TextInput from '../components/input';
import Toggle from '../components/toggle';
import BackgroundGeolocation, {
  GeofenceEvent,
  Location,
} from 'react-native-background-geolocation';
import {ResultContext} from '../context/ResultContextProvider';
import PushNotification from 'react-native-push-notification';
import colors from '../constants/colors';
const stationaryThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds

type Coordinate = {
  latitude: number;
  longitude: number;
};

type Activity = {
  activity: string;
  timestamp: string;
  coords: Coordinate;
};

export enum Type {
  LABEL = 'label',
  SUBLABEL = 'subLabel',
}
type TrackResult = {
  startCoordinates: Coordinate;
  duration: number;
  distance: number;
  activityType: string;
};
const defaultDestination = {
  latitude: 45.51921926,
  longitude: -73.61678581,
};
const Settings = () => {
  const [isEnabled, setisEnabled] = useState<boolean>(false);
  const [long, setLong] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [stationaryTime, setStationaryTime] = useState<number>(0);
  const {saveResult} = useContext(ResultContext);

  useEffect(() => {
    BackgroundGeolocation.onLocation((location: Location) => {
      analyzeActivity(location);
      checkIfStationary(location);
    });

    BackgroundGeolocation.onGeofence((event: GeofenceEvent) => {
      if (event.action === 'ENTER') {
        stopTracking();
      }
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  const startTracking = () => {
    BackgroundGeolocation.ready(
      {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopOnTerminate: false,
        startOnBoot: true,
        geofenceProximityRadius: 1000,
        geofences: [
          {
            identifier: 'destination',
            radius: 100,
            latitude: lat || defaultDestination.latitude,
            longitude: long || defaultDestination.longitude,
            notifyOnEntry: true,
          },
        ],
      },
      state => {
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      },
    );
  };

  const stopTracking = () => {
    BackgroundGeolocation.stop();
    const result = analyzeGeolocationData();

    if (result) {
      saveResult(result);
    }
  };

  const analyzeActivity = (location: Location) => {
    const activity = location.activity.type;
    const timestamp = location.timestamp;
    const coords = location.coords;

    setActivities(prevActivities => [
      ...prevActivities,
      {activity, timestamp, coords},
    ]);
  };
  const resetStationaryTimer = () => {
    setStationaryTime(0);
  };

  const sendNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      title,
      message,
      playSound: true,
      soundName: 'default',
    });
  };

  const checkIfStationary = (location: Location) => {
    if (lastLocation) {
      const distanceDifference = haversine(
        lastLocation.coords,
        location.coords,
      );
      if (distanceDifference < 5) {
        // Consider stationary if the user moved less than 5 meters
        setStationaryTime(
          prevTime => prevTime + (location.timestamp - lastLocation.timestamp),
        );
        if (stationaryTime >= stationaryThreshold) {
          stopTracking();
          sendNotification(
            'You have been stationary for over 10 minutes',
            'Tap to view your trip data',
          );
        }
      } else {
        resetStationaryTimer();
      }
    }
    setLastLocation(location);
  };

  const analyzeGeolocationData = (): TrackResult | null => {
    if (activities.length === 0) return null;

    const startCoordinates = activities[0].coords;
    let totalDistance = 0;
    let totalDuration = 0;

    activities.forEach((activity, index) => {
      if (index > 0) {
        const prevActivity = activities[index - 1];
        const timeDifference =
          (new Date(activity.timestamp).getTime() -
            new Date(prevActivity.timestamp).getTime()) /
          1000;
        const distanceDifference = haversine(
          prevActivity.coords,
          activity.coords,
        );

        totalDuration += timeDifference;
        totalDistance += distanceDifference;
      }
    });

    const activityType = activities[0].activity;

    return {
      startCoordinates,
      duration: totalDuration,
      distance: totalDistance,
      activityType,
    };
  };

  const haversine = (coords1: Coordinate, coords2: Coordinate) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = coords1.latitude * (Math.PI / 180);
    const lat2 = coords2.latitude * (Math.PI / 180);
    const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
    const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  };

  const toggleSwitch = () => {
    setisEnabled(previousState => !previousState);
    if (isEnabled) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  return (
    <View style={styles.container}>
      <Text type={Type.LABEL}>Destination Latitude</Text>
      <TextInput
        onChangeText={setLong}
        placeholder="Lat"
        value={long}
        label="Long"
      />
      <Text type={Type.LABEL}>Destination Longitude</Text>
      <TextInput
        onChangeText={setLat}
        placeholder="Lat"
        value={lat}
        label="Long"
      />
      <Toggle
        isEnabled={isEnabled}
        subLabel="Auto-tracking"
        label="Enable Auto-tracking"
        toggleSwitch={toggleSwitch}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
});
