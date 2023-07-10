import { 
  View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl
 } from 'react-native';
 import { Stack, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
 import { useCallback, useState } from 'react';

 import { ScreenHeaderBtn, User, UserTabs  } from '../../components';
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="68%"
                handlePress={() => router.back()}
              />
              <Text style={{marginLeft: 6, fontSize: SIZES.large, fontFamily: FONT.small, color: COLORS.white}}>Contacts</Text>
            </View>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.edit} dimension="70%"/>
          ),
          headerTitle: "",
          headerStyle: {backgroundColor: COLORS.tertiary}
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
                <User
                  userPhoto={data?.photo}
                  userName={`${data?.firstName} ${data?.lastName}`}
                  userAge={data?.age}
                />

                <UserTabs/>
              </View>
            )
          }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default ContactDetails