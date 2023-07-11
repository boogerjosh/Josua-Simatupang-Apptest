import {useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './contacts.style';
import { COLORS, FONT, SIZES } from '../../../constants';
import ContactCard from '../../common/cards/contact/ContactCard';

const Contacts = ({users, isLoading, error}) => {
  const router = useRouter();

  const groupByAlphabet = () => {
    const alphabetSet = new Set();
    const groupedUsers = [];

    // Ambil huruf awal dari setiap pengguna
    users.forEach((user) => {
      const firstChar = user.firstName.charAt(0).toUpperCase();
      alphabetSet.add(firstChar);
    });

    // Urutkan huruf awal secara alfabetis
    const sortedAlphabet = Array.from(alphabetSet).sort();

    // Kelompokkan pengguna berdasarkan huruf awal
    sortedAlphabet.forEach((char) => {
      const filteredUsers = users.filter(
        (user) => user.firstName.charAt(0).toUpperCase() === char
      );
      groupedUsers.push({ char, users: filteredUsers });
    });

    return groupedUsers;
  };

  const groupedUsers = groupByAlphabet();

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          groupedUsers.map((group) => (
            <View key={group.char}>
              <Text style={styles.abjadGrouping}>{group.char}</Text>
              {group.users.map((contact) => (
                <ContactCard
                  contact={contact}
                  key={contact.id}
                  handleNavigate={() =>
                    router.push(`/contact-details/${contact.id}`)
                  }
                />
              ))}
            </View>
          ))
        )}
      </View>
    </View>
  )
}

export default Contacts