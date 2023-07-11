import React from 'react'
import { TouchableOpacity, Text } from 'react-native';

import styles from './deletebutton.style';

const DeleteButton = ({onHandle}) => {
  return (
    <TouchableOpacity style={styles.buttonDelete} onPress={onHandle}>
        <Text style={styles.btnText}>Delete Contact</Text>
    </TouchableOpacity>
  )
}

export default DeleteButton