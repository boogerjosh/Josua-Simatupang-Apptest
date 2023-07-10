import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './deletebutton.style';

const DeleteButton = () => {
  return (
    <TouchableOpacity style={styles.buttonDelete}>
        <Text style={styles.btnText}>Delete</Text>
    </TouchableOpacity>
  )
}

export default DeleteButton