import {useEffect, useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from './inputcomponent.style';
import { checkImageURL } from '../../../utils';
import { COLORS } from '../../../constants';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config';

const InputComponent = ({userPhoto, firstName, lastName, userAge, handleInput, onImageUpload}) => {
  const [image, setImage] = useState(userPhoto);

  useEffect(() => {
    setImage(userPhoto);
  }, [image, userPhoto])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (imageUri) => {
    const storageRef = ref(storage, 'images/' + Date.now()); // Menambahkan timestamp ke nama gambar untuk membuatnya unik
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL gambar:', downloadURL);
  
      setImage(downloadURL);
      onImageUpload('photo', downloadURL);
      Alert.alert('Foto berhasil diunggah!');
    } catch (error) {
      console.log('Terjadi kesalahan saat mengunggah gambar:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(image) 
            ?  image 
            : 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png'
          }}
          style={styles.logoImage}
        />
      </View>

      <TouchableOpacity style={styles.jobTitleBox} onPress={pickImage}>
          <Text style={styles.jobTitle}>Add Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.inputForm} 
            placeholder="First name" 
            value={firstName}
            onChange={value => handleInput('firstName', value)} 
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.inputForm} 
            placeholder="Last name" 
            value={lastName}
            onChange={value => handleInput('lastName', value)}
            placeholderTextColor={COLORS.gray}  
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            keyboardType="phone-pad" 
            style={styles.inputForm} 
            placeholder="Age" 
            value={userAge}
            onChangeText={(value) => handleInput('age', value)}
            placeholderTextColor={COLORS.gray} 
          />
        </View>
      </View>
    </View>
  )
}

export default InputComponent