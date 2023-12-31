import { 
    View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Pressable, StyleSheet
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { InputComponent, DeleteButton } from '../../components';
import {COLORS, FONT, SIZES} from '../../constants';
import { updateUserById, deleteUserById  } from '../../store/usersActions';

const EditSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [disabledButton, setDisabledButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const {user, isLoading, error} = useSelector((state) => state.users);
    const [errorMessage, setErrorMessage] = useState([]);
    const [inputValue, setInputValue] = useState({
      firstName: '',
      lastName: '',
      age: '',
      photo: '',
    })

    const { photo, firstName, lastName, age } = inputValue;
    
    useEffect(() => {
        if (!isLoading && !error && user) {
          setInputValue({
            photo: user?.photo || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            age: user?.age.toString() || ''
          });
        }
    }, [isLoading, error, user]);
    

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
        let dataEdited = {
          firstName,
          lastName,
          age,
          photo
        };
        
        dispatch(updateUserById(user?.id, dataEdited));
      }
    }

    const handleDelete = () => {
      dispatch(deleteUserById(user?.id));
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={{ backgroundColor: COLORS.tertiary, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{fontSize: SIZES.large, fontFamily: FONT.medium, color: COLORS.white}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <TouchableOpacity disabled={disabledButton} onPress={onSubmit}>
                        <Text style={{fontSize: SIZES.large, fontFamily: FONT.medium, color: disabledButton ? COLORS.gray : COLORS.white}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
          ),
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {backgroundColor: COLORS.tertiary}
        }}
      />
      
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : data?.length === 0 ? (
              <Text>No data</Text>
            ) : (
              <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                 <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={handleDelete}>
                                <Text style={styles.textStyle}>Delete Contact</Text>
                            </Pressable>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                  </Modal>

                 <InputComponent 
                    inputValue={inputValue}
                    handleInput={handleInput} 
                    onImageUpload={onImageUpload}
                    errorMessage={errorMessage}
                 />

                 <DeleteButton onHandle={() => setModalVisible(true)}/>
              </View>
            )
          }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width: 300,
      padding: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: '100%',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonDelete: {
      marginBottom: 10,
      backgroundColor: COLORS.red,
    },
    buttonClose: {
      backgroundColor: COLORS.tertiary
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  

export default EditSection