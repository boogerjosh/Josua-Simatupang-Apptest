import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './user.style';
import { icons } from '../../../constants';
import { checkImageURL } from '../../../utils';

const User = ({userPhoto, userName, userAge}) => {

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

      <View style={styles.jobTitleBox}>
          <Text style={styles.jobTitle}>{userName}</Text>
      </View>

      <View style={styles.companyInfoBox}>
          <Text style={styles.companyName}>{userAge} years old</Text>
      </View>
    </View>
  )
}

export default User