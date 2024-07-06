import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useState, React } from 'react';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';


const Popularjobs = () => {
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
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={() => router.push(`job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{ columGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs;
