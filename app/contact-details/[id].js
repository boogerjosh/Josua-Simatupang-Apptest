import { 
  View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl
 } from 'react-native';
 import { Stack, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
 import { useCallback, useState } from 'react';

 import { ScreenHeaderBtn,  } from '../../components';
 import {COLORS, FONT, icons, SIZES} from '../../constants';
 import useFetch from '../../hook/useFetch';

const ContactDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const {data, isLoading, error, refetch} = useFetch("GET", `contact/${params.id}`);

  const onRefresh = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="68%"
                handlePress={() => router.back()}
              />
              <Text style={{marginLeft: 6, fontSize: SIZES.large, fontFamily: FONT.medium}}>Contacts</Text>
            </View>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.edit} dimension="70%"/>
          ),
          headerTitle: ""
        }}
      />
      
      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {
            isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : data?.length === 0 ? (
              <Text>No data</Text>
            ) : (
              <View style={{padding: SIZES.medium, paddingBottom: 100}}>

              </View>
            )
          }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default ContactDetails