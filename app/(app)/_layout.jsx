import React, { useEffect, useState, useCallback } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack , useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AppContext from '../../context/appcontext';
import Loader from '../../components/Loader';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isLoading, setLoading] = useState(false);
  const [appData, setAppData] = useState(null);  // Start with null
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const defaultAppData = {
    name: "user",
    token: "",
    logged: false,
    categories: [
      { icon: "deck", color: "#0D7223", category: "Leisure", id: 1 },
      { icon: "directions-car", color: "#953030", category: "Transport", id: 2 },
      { icon: "health-and-safety", color: "#333793", category: "Health", id: 3 },
      { icon: "local-grocery-store", color: "#724781", category: "Groceries", id: 4 },
      { icon: "landscape", color: "#613A6F", category: "Land", id: 5 },
      { icon: "family-restroom", color: "#474DD0", category: "Family", id: 6 },
      { icon: "cast-for-education", color: "#55252D", category: "Education", id: 7 },
      { icon: "restaurant", color: "#34006A", category: "Food", id: 8 },
      { icon: "fitness-center", color: "#D7442E", category: "Gym", id: 9 },
      { icon: "build", color: "#C6A019", category: "Repairs", id: 10 },
      { icon: "equalizer", color: "#1EA283", category: "Others", id: 11 }
    ],
    summary:[]
    
  };

  // Function to update app data
  const updateAppData = useCallback((newData) => {
    setAppData(prev => ({ ...prev, ...newData }));
  }, []);

  // Function to handle user sign-in
  const signUser = useCallback((name, token) => {
    updateAppData({ token, name, logged: true });
  }, [updateAppData]);
  const signOutUser = useCallback(() => {
    setAppData(defaultAppData);
  }, []);

  // Fetch app data from AsyncStorage once on mount
  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('appData');
        //console.log("Fetched stored data:", storedData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setAppData(parsedData);
        } else {
          setAppData(defaultAppData);  // Set default if no data is found
        }
      } catch (error) {
        //console.error("Error fetching appData from AsyncStorage:", error);
        setAppData(defaultAppData);  // Set default in case of an error
      } finally {
        setInitialDataLoaded(true);  // Ensure we signal that data loading is complete
      }
    };

    fetchAppData();
  }, []);
  async function myReq(url, data, postType = true) {
    return fetch(url, {
      method: postType ? "POST" : "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${appData.token}`
      },
      body: postType ? JSON.stringify(data) : null
    }).then(
      async x => {
        if (x.status == 403) {
          alert("Expired login session please login");
          signOutUser();
          router.replace('/signin');
          return;
        } else if (x.ok) {
          var resu = await x.json();
          return resu;
        } 
        else {
          var resu = await x.json();
          if(!resu.status){
            return resu;
          }
          return { status: false, message: "Error fetching data" }
        }
      }
    ).catch(
      err => {
        //console.log(err);
        return { status: false, message: 'Error fetching data' }
      }
    )
  }
  // Save appData to AsyncStorage when it changes
  useEffect(() => {
    if (initialDataLoaded) {  // Only save if initial data has been loaded
      const saveData = async () => {
        try {
          //console.log('Saving appData:', appData);
          await AsyncStorage.setItem('appData', JSON.stringify(appData));
        } catch (e) {
          console.error("Error saving data", e);
        }
      };

      saveData();
    }
  }, [appData, initialDataLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !initialDataLoaded) {
    return null; // Render nothing while loading
  }

  return (
    <>
      {initialDataLoaded ? (
        <AppContext.Provider value={{ appData, updateAppData, setLoading, signUser, signOutUser, myReq }}>
          {isLoading && <Loader />}
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName={appData.logged ? "(home)" : 'signin'}>
              <Stack.Screen name="signin" options={{ headerShown: false }} />
              <Stack.Screen name="signup" />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="not-found" />
            </Stack>
          </ThemeProvider>
        </AppContext.Provider>
      ) : (
        <Loader />
      )}
    </>
  );
}
