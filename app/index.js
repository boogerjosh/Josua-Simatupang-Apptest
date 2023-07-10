import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import {COLORS, icons, SIZES } from '../constants';
import {
    Contacts, ScreenHeaderBtn, Welcome
} from '../components';

const Home = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.tertiary},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="70%"/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.add} dimension="70%"/>
                    ),
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