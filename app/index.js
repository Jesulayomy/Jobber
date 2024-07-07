import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, SIZES, FONT, icons, images } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import mockData from '../utils/mockData';
// import useFetch from '../hook/useFetch';


const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // const { data, isLoading, error } = useFetch(
  //   'search', {
  //     query: 'Node.js developer in New-York,USA',
  //     page: '1',
  //     num_pages: '1',
  //     date_posted: 'all',
  //   }
  // );
  const data = mockData.data;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showVeritcalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={() => {
              router.push(`/search/${searchTerm}`);
            }}
          />
          <Popularjobs
            data={data}
            // isLoading={isLoading}
            // error={error}
          />
          <Nearbyjobs
            data={data}
            // isLoading={isLoading}
            // error={error}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;
