import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { Stack, useRouter } from "expo-router";

import {COLORS, FONT, icons, SIZES } from '../constants';
import {
    Contacts, ScreenHeaderBtn, SearchSection
} from '../components';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersActions";
import styles from "../components/common/header/screenheader.style";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [originalData, setOriginalData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const {users, isLoading, error} = useSelector((state) => state.users);

    useEffect(() => {
      dispatch(fetchUsers());
      setOriginalData(users);
      setCurrentData(users);
    }, [dispatch]);

    const handleInput = (value) => {
        const text = value.nativeEvent.text;
        setSearchTerm(text);
    };

    const handleBtnSearch = () => {
        if (searchTerm) {
          const filteredContact = originalData.filter((data) =>
            data.firstName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCurrentData(filteredContact);
        } else {
          setCurrentData(originalData);
        }
    };

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

            <ScrollView showsVerticalScrollIndicator={false}>
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
                    
                    {currentData && <Contacts
                        users={currentData}
                        isLoading={isLoading}
                        error={error}
                    /> }
                    {currentData?.length === 0 && <View 
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