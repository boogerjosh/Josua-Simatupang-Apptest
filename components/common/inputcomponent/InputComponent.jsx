import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from './inputcomponent.style';
import { checkImageURL } from '../../../utils';

const InputComponent = ({userPhoto, firstName, lastName, userAge, handleInput}) => {

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(userPhoto) 
            ? userPhoto 
            : 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png'
          }}
          style={styles.logoImage}
        />
      </View>

      <TouchableOpacity style={styles.jobTitleBox}>
          <Text style={styles.jobTitle}>Add Photo</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.inputForm} 
            placeholder="First name" 
            value={firstName}
            onChange={(value) => handleInput('firstName', value)} 
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.inputForm} 
            placeholder="Last name" 
            value={lastName}
            onChange={(value) => handleInput('lastName', value)}  
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            keyboardType="numeric" 
            style={styles.inputForm} 
            placeholder="Age" 
            value={userAge?.toString()}
            onChangeText={(value) => handleInput('age', value)} 
          />
        </View>
      </View>
    </View>
  )
}

export default InputComponent