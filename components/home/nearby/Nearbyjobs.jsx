import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useState, React } from 'react';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS, SIZES } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';


const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: 'Node.js developer in New-York,USA',
      page: '1',
      num_pages: '1',
      date_posted: 'all',
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.error}>An error occurred</Text>
        ) : (
          data.map((job) => (
            <NearbyJobCard
              key={job.job_id}
              job={job}
              handleNavigate={() => router.push(`job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs;
