import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './tabs.style';
import data from './dataTabs';

const Tabs = () => {

  return (
    <View style={styles.container}>
      <View style={styles.containerTabs}>
        {data?.map((data, id) => (
          <TouchableOpacity key={id} style={styles.tabsBox}>
            <Image
              source={{uri: `${data.icon}`}}
              style={styles.logoImage}
            />
            <Text style={styles.tabsText}>{data.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.containerMobile}>
          <Text>mobile</Text>
          <Text style={styles.tabsText}>+62 8123 456789</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Tabs