import { 
    View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

import { InputComponent } from '../../components';
import {COLORS, FONT, SIZES} from '../../constants';

const CreateNew = () => {
   const router = useRouter();

   const [refreshing, setRefreshing] = useState(false);
   const [disabledButton, setDisabledButton] = useState(true);
   const [inputValue, setInputValue] = useState({
    photo: '',
    firstName: '',
    lastName: '',
    age: 0
   })

   const onRefresh = () => {};

   const handleInput = (key, value) => {
    console.log(value, 'value', key);
    setInputValue(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
    <Stack.Screen
      options={{
          header: () => (
            <View style={{ backgroundColor: COLORS.tertiary, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ paddingHorizontal: 16 }}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={{ fontSize: SIZES.large, fontFamily: FONT.small, color: COLORS.white }}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: SIZES.large, fontFamily: FONT.medium, color: COLORS.white }}>New Contact</Text>
              <View style={{ paddingHorizontal: 16 }}>
                <TouchableOpacity disabled={disabledButton} style={{}}>
                  <Text style={{ fontSize: SIZES.large, fontFamily: FONT.medium, color: disabledButton ? COLORS.gray : COLORS.white }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
          headerStyle: { backgroundColor: COLORS.tertiary },
      }}
    />
    
    <>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
            <InputComponent 
                userPhoto={inputValue.photo}
                firstName={inputValue.firstName} 
                lastName={inputValue.lastName}
                userAge={inputValue.age}
                handleInput={handleInput}    
            />
        </View>
      </ScrollView>
    </>
  </SafeAreaView>
  )
}

export default CreateNew