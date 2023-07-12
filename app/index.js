import { View, ScrollView, SafeAreaView, Text, Image, RefreshControl } from "react-native";
import { Stack, useRouter } from "expo-router";

import {COLORS, FONT, icons, SIZES } from '../constants';
import {
    Contacts, ScreenHeaderBtn, SearchSection
} from '../components';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersActions";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const {users, isLoading, error} = useSelector((state) => state.users);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    useEffect(() => {
        setFilteredContacts(users);
    }, [users]);

    const handleInput = (value) => {
        const text = value.nativeEvent.text;
        setSearchTerm(text);
    };
    
    const handleBtnSearch = () => {
        if (searchTerm) {
            const filteredContact = users.filter((data) =>
                data.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredContacts(filteredContact);
        } else {
            setFilteredContacts(users);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
            dispatch(fetchUsers());
        setRefreshing(false);
    }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ backgroundColor: COLORS.tertiary, paddingTop: 50, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ paddingHorizontal: 16 }}>
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension="70%"/>
                          </View>
                          <View style={{ paddingHorizontal: 16 }}>
                            <ScreenHeaderBtn iconUrl={icons.add} dimension="70%" handlePress={() => router.push(`/createnew`)}/>
                          </View>
                        </View>
                    ),
                    headerStyle: {backgroundColor: COLORS.tertiary},
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >   
                    <SearchSection
                       searchTerm={searchTerm}
                       handleBtnSearch={handleBtnSearch}
                       handleInput={handleInput}
                    /> 
                    
                    {filteredContacts && <Contacts
                        users={filteredContacts}
                        isLoading={isLoading}
                        error={error}
                    /> }
                    {filteredContacts?.length === 0 && <View 
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={icons.datanotfound}/>
                        <Text style={{fontSize: SIZES.xLarge, fontFamily: FONT.bold}}>No data found</Text>
                    </View> }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;