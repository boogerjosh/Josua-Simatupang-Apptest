import { 
    View, Text, SafeAreaView, ScrollView, ActivityIndicator, 
    RefreshControl, TouchableOpacity, Modal, Pressable, StyleSheet
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { InputComponent, DeleteButton } from '../../components';
import {COLORS, FONT, SIZES} from '../../constants';
import { updateUserById } from '../../store/usersActions';

const EditSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const {user, isLoading, error} = useSelector((state) => state.users);
    const [inputValue, setInputValue] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        age: ''
    });

    const onRefresh = () => {};
    
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
        let editedUser = {
            photo: "https://www.niagahoster.co.id/blog/wp-content/uploads/2020/02/Featured-Image-Cara-Mudah-Mengatasi-Error-400-Bad-Request-di-Website.png",
            firstName: inputValue.firstName,
            lastName: inputValue.lastName,
            age: parseInt(inputValue.age)
        }

        dispatch(updateUserById(user?.id, JSON.stringify(editedUser)));
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={{ backgroundColor: COLORS.tertiary, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{fontSize: SIZES.large, fontFamily: FONT.small, color: COLORS.white}}>Cancel</Text>
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
                            onPress={() => {}}>
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
                    userPhoto={inputValue.photo}
                    firstName={inputValue.firstName} 
                    lastName={inputValue.lastName}
                    userAge={inputValue.age.toString()}
                    handleInput={handleInput} 
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