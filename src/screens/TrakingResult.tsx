import React, {useContext} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {ResultContext} from '../context/ResultContextProvider';
import colors from '../constants/colors';

type Props = {
  item: {
    startCoordinates: {
      latitude: string;
      longitude: string;
    };
    duration: string;
    distance: string;
    activityType: string;
  };
  index: number;
};

const TrakingResult = () => {
  const {resultData} = useContext(ResultContext);

  const renderItem = ({item, index}: Props) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>
        {item.startCoordinates.latitude}
        {item.startCoordinates.longitude}
      </Text>
      <Text style={styles.cell}>{item.duration}</Text>
      <Text style={styles.cell}>{item.distance}</Text>
      <Text style={styles.cell}>{item.activityType}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Trip ID</Text>
          <Text style={styles.headerCell}>Start Coordinates</Text>
          <Text style={styles.headerCell}>Duration</Text>
          <Text style={styles.headerCell}>Distance</Text>
          <Text style={styles.headerCell}>Activity Type</Text>
        </View>
        {resultData && (
          <FlatList
            data={resultData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    backgroundColor: colors.darkGrey,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.mediumDark,
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.grey,
    paddingVertical: 10,
    marginBottom: 2,
  },
  cell: {
    flex: 1,
    color: colors.white,
    textAlign: 'center',
  },
});

export default TrakingResult;
