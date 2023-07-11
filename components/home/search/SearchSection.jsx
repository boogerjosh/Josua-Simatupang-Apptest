import React from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useRouter } from 'expo-router';

import styles from './searchsection.style';
import { icons, COLORS } from '../../../constants';

const SearchSection = ({searchTerm, handleBtnSearch, handleInput}) => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.contactsTitile}>Contacts</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChange={value => handleInput(value)}
            placeholder="Search contact"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleBtnSearch}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchSection