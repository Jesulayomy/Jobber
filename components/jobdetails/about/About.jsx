import React from 'react';
import { View, Text } from 'react-native';

import styles from './about.style';

const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.headText}>About the Job:</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  )
}

export default About