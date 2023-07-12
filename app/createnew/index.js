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
   const [errorMessage, setErrorMessage] = useState([]);
   const [disabledButton, setDisabledButton] = useState(true);
   const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: 'N/A',  
   });

   const { photo, firstName, lastName, age } = inputValue;

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
      let inputValueToUpdate = value;

      if (key !== 'age') {
        const text = value.nativeEvent.text;
        inputValueToUpdate = text;
    
        const errorMessageIndex = key === 'firstName' ? 0 : 1;
        if (errorMessage[errorMessageIndex]) {
          errorMessage[errorMessageIndex] = '';
          setErrorMessage([...errorMessage]);
        }
      } else if (inputValueToUpdate !== '') {
        if (errorMessage[2]) {
          errorMessage[2] = '';
          setErrorMessage([...errorMessage]);
        }
      }

      setInputValue(prevState => {
        const updatedInputValue = {
          ...prevState,
          [key]: inputValueToUpdate
        };
    
        if (updatedInputValue.firstName === '' && 
           updatedInputValue.lastName === '' && 
           updatedInputValue.age === '') {
          setDisabledButton(true);
        } else {
          setDisabledButton(false);
        }
    
        return updatedInputValue;
      });
   };

   const onSubmit = () => {
    if (lastName === '' && age === '') {
      setErrorMessage(['', 'Last name is required', 'Age is required']);
    } else if (firstName === '' && lastName === '') {
      setErrorMessage(['First name is required', 'Last name is required', '']);
    } else if (firstName === '' && age === '') {
      setErrorMessage(['First name is required', '', 'Age is required']);
    } else if (firstName === '') {
      setErrorMessage(['First name is required', '', '']);
    } else if (lastName === '') {
      setErrorMessage(['', 'Last name is required', ''])
    } else if (age === '') {
      setErrorMessage(['', '', 'Age is required'])
    } else {
      let newData = {
        firstName,
        lastName,
        age,
        photo
      };
      
      dispatch(createNewContact(newData));
  
      setInputValue({
        photo: "",
        firstName: "",
        lastName: "",
        age: "",
      });
  
      setDisabledButton(true);
    }
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: SIZES.medium, paddingBottom: 100}}>
          <InputComponent 
            inputValue={inputValue}
            handleInput={handleInput}
            onImageUpload={onImageUpload}
            errorMessage={errorMessage}
          />
          </View>
        </ScrollView>
      </>
  </SafeAreaView>
  )
}

export default CreateNew