import { Tabs, useRouter , useRootNavigationState} from 'expo-router';
import React, { useContext, useEffect , useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native';
import defaultStyle from '../../../assets/defaultStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KeyboardHandler from '../../../components/generals/KeyboardHandler';
import AppContext from '../../../context/appcontext';
import Loader from '../../../components/Loader';

// import appColors

export default function TabLayout() {
  const appC = useContext(AppContext);
  const [pageLoaded,loadPage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    try {
      if(!appC || !appC.appData.logged){
        console.log("Nooo");
        //alert("Data not loaded");
        router.replace("signin") ;
      }
    } catch (e) {
      router.replace("signin");
    }
  },[]);
  useEffect(
    ()=>{
      //get data
      loadPage(true);
    },[]
  )
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider style={defaultStyle.safeArea}>
       {
        pageLoaded ?  <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fff",
          headerShown: false,
          tabBarStyle: { backgroundColor: "#52336A" },
          tabBarHideOnKeyboard: true
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name='linechart' size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name='bars' size={24} color={color} />
            ),
          }}
        />

      </Tabs>: <Loader />
       }
    </SafeAreaProvider>
  );
}
