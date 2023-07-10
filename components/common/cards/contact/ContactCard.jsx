import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './contactcard.style';

import { checkImageURL } from '../../../../utils';

const ContactCard = ({ contact, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.photoContainer}>
        <Image
          source={{uri: checkImageURL(contact.photo)
            ? contact.photo 
            : 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png'
          }}
          resizeMode="contain"
          style={styles.photoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {contact.firstName} {contact.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ContactCard