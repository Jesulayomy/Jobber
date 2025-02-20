import { useState, React } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants';


const Welcome = ({ searchTerm, setSearchTerm, handleSearch}) => {
  const router = useRouter();
  const jobTypes = [
    "Full Time", "Part Time",
    "Remote", "Freelance",
    "Internship", "Temporary",
    "Volunteering", "Contract",
    "Hourly", "Commission",
  ]
  const [activeJobType, setActiveJobType] = useState("Full Time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hi, layomi</Text>
        <Text style={styles.welcomeMessage}>Find your dream job Today</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='Search for Jobs'
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={handleSearch}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{
            columnGap: SIZES.small,
            rowGap: SIZES.small,
          }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome;
