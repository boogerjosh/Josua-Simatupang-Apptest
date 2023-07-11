import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import {COLORS, icons, SIZES } from '../constants';
import {
    Contacts, ScreenHeaderBtn, Welcome
} from '../components';

const Home = () => {
    const router = useRouter();

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
                    <Welcome/> 
                    <Contacts/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;