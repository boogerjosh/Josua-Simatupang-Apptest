import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './contacts.style';
import { COLORS } from '../../../constants';
import ContactCard from '../../common/cards/contact/ContactCard';
import useFetch from '../../../hook/useFetch';

const Contacts = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch('GET', 'contact');

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((contact) => (
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