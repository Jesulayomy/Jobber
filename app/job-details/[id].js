import React from 'react';
import {
  View, Text, TouchableOpacity,
  Image, ActivityIndicator,
  RefreshControl, SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Stack, useRouter, useGlobalSearchParams,
} from 'expo-router';
import { useState, useCallback } from 'react';

import {
  Company, JobAbout, JobFooter, JobTabs,
  ScreenHeaderBtn, Specifics,
} from '../../components';

import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFetch';


const tabs = [
  'About', 'Qualifications', 'Responsibilities', 'Benefits',
];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {};

  const { data, isLoading, error, refetch } = useFetch(
    'job-details',
    { job_id: params.id }
  );

  const displayTabContent = (activeTab, job) => {
    switch (activeTab) {
      case 'About':
        return <JobAbout
          info={[data.job_description]}
        />
      case 'Qualifications':
        return <Specifics
          title="Qualifications"
          points={data.job_highlights?.Qualifications ?? ['N/A']}
        />
      case 'Responsibilities':
        return <Specifics
          title="Responsibilities"
          points={data.job_highlights?.Responsibilities ?? ['N/A']}
        />
      case 'Benefits':
        return <Specifics
          title="Benefits"
          points={data.job_highlights?.Benefits ?? ['N/A']}
        />
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            />
          ),
          headerTitle: isLoading ? 'Loading...' : 'Job Details',
        }}
      >
      </Stack.Screen>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data.employer_logo}
                jobTitle={data.job_title}
                companyName={data.employer_name}
                jobLocation={data.job_state + ", " +data.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent(activeTab, data)}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={data?.job_apply_link ?? data.job_google_link}
        />
      </>
    </SafeAreaView>
  )
}

export default JobDetails;
