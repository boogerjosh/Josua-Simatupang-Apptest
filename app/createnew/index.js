import { 
    View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { InputComponent } from '../../components';
import {COLORS, FONT, SIZES} from '../../constants';
import { createNewContact } from '../../store/usersActions';

const CreateNew = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [refreshing, setRefreshing] = useState(false);
   const [disabledButton, setDisabledButton] = useState(true);
   const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',  
   });

   const onImageUpload = (key, imageUrl) => {
      // Lakukan sesuatu dengan URL gambar yang sudah diunggah
      setInputValue(prevState => ({
        ...prevState,
        [key]: imageUrl
      }));
      setDisabledButton(false);
      // ...
   };
  

   const handleInput = (key, value) => {
      if (key !== 'age') {
          const text = value.nativeEvent.text;
          setInputValue(prevState => ({
              ...prevState,
              [key]: text
          }));

          if (text === '') {
              setDisabledButton(true)
          } else {
              setDisabledButton(false)
          }
      } else {
          setInputValue(prevState => ({
              ...prevState,
              ['age']: value
          }));

          if (value === '') {
              setDisabledButton(true)
          } else {
              setDisabledButton(false)
          }
      }
   };

   const onSubmit = () => {
      let newData = {
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        age: inputValue.age,
        photo: inputValue.photo
      };

      createNewContact(newData)

      dispatch(createNewContact(newData));

      setInputValue({
        photo: "",
        firstName: "",
        lastName: "",
        age: "",
      });

      setDisabledButton(true);
   }

  const onRefresh = () => {};

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
                  <TouchableOpacity disabled={disabledButton} onPress={onSubmit}>
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
                  onImageUpload={onImageUpload}
              />
          </View>
        </ScrollView>
      </>
  </SafeAreaView>
  )
}

export default CreateNew