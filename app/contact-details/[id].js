import { 
  View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl
 } from 'react-native';
 import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
 import { useState, useEffect } from 'react';
 import { useDispatch, useSelector } from "react-redux";

 import { ScreenHeaderBtn, User, UserTabs } from '../../components';
 import {COLORS, FONT, icons, SIZES} from '../../constants';
 import { fetchUsersById } from '../../store/usersActions';

const ContactDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector((state) => state.users);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersById(params.id));
  }, [dispatch]);

  const onRefresh = () => {};
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={{ backgroundColor: COLORS.tertiary, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ paddingHorizontal: 16 }}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension="68%"
                    handlePress={() => router.back()}
                  />
                <Text style={{marginLeft: 6, fontSize: SIZES.large, fontFamily: FONT.small, color: COLORS.white}}>Contacts</Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 16 }}>
                <ScreenHeaderBtn iconUrl={icons.edit} dimension="70%" handlePress={() => router.push(`/edit/${params.id}`)}/>
              </View>
            </View>
          ),
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {backgroundColor: COLORS.tertiary}
        }}
      />
      
      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {
            isLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '50%' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : data?.length === 0 ? (
              <Text>No data</Text>
            ) : (
              <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                <User
                  userPhoto={user?.photo}
                  userName={`${user?.firstName} ${user?.lastName}`}
                  userAge={user?.age?.toString()}
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