import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style';


const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <View styles={styles.companyContainer}>
        <TouchableOpacity
          style={styles.logoContainer}
        >
          <Image
            source={job.employer_logo ? { uri: job.employer_logo } : require('../../../../assets/images/logo.png')}
            resizeMode='contain'
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {job.job_type}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {job.job_city}, {job.job_state}, {job.job_country}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard;
