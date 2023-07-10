import { 
    View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { InputComponent, DeleteButton } from '../../components';
import {COLORS, FONT, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';

const EditSection = () => {
   const params = useLocalSearchParams();
   const router = useRouter();

   const {data, isLoading, error, refetch} = useFetch("GET", `contact/${params.id}`);
   const [refreshing, setRefreshing] = useState(false);
   const [disabledButton, setDisabledButton] = useState(true);

   const onRefresh = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{fontSize: SIZES.large, fontFamily: FONT.small, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity disabled={disabledButton} style={{}}>
                <Text style={{fontSize: SIZES.large, fontFamily: FONT.medium, color: disabledButton ? COLORS.gray : COLORS.white}}>Done</Text>
            </TouchableOpacity>
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
                 <InputComponent 
                    userPhoto={data?.photo}
                    firstName={data?.firstName} 
                    lastName={data?.lastName}
                    userAge={data?.age}
                 />

                 <DeleteButton/>
              </View>
            )
          }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default EditSection