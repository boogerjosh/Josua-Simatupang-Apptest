import {useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './contacts.style';
import { COLORS } from '../../../constants';
import ContactCard from '../../common/cards/contact/ContactCard';

const Contacts = ({users, isLoading, error}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          users?.map((contact) => (
            <ContactCard
              contact={contact}
              key={contact.id}
              handleNavigate={() => router.push(`/contact-details/${contact.id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Contacts