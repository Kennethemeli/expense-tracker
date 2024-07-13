import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert, Dimensions, ScrollView } from "react-native";
// import appColors from "../../../assets/colors/appColors";

import defaultStyle from "../../../assets/defaultStyle";
import Topbar from "../../../components/Topbar";
import React, { useState, useRef, useEffect, useContext } from "react";
import AppContext from "../../../context/appcontext";
import apis from "../../../assets/apis";
import { BarChart } from 'react-native-chart-kit';
import Svg, { Rect } from 'react-native-svg';

export default () => {
    const appC = useContext(AppContext);
    const { appData, signOutUser, setLoading, myReq } = appC;

    

    const screenWidth = Dimensions.get('window').width;

    const dataFromServer = appData.summary
    // Prepare the data for the chart
    const labels = dataFromServer.map(item => item.category_name);
    const dataValues = dataFromServer.map(item => parseFloat(item.total_amount));
    const colors = dataFromServer.map(item => item.color);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                colors:colors.map(
                    x=>{
                        return (opacity = 1)=> x
                    }
                )
            }
        ],
        
    };

    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        backgroundGradientFromOpacity: '#ffffff',
        backgroundGradientToOpacity: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        barRadius:3
        // useShadowColorFromDataset: false // optional
    };

    const SpendingAnalyticsBarChart = () => {
        return (
            <ScrollView horizontal={true} >
                <View style={styles.container}>
                    <Text style={styles.header}>Spending Analytics (Bar Chart)</Text>
                    <BarChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        verticalLabelRotation={15}
                        fromZero
                        showBarTops={false}
                        flatColor={true}
                        withInnerLines={false}
                        style={styles.chart}
                        withCustomBarColorFromData={true}
                        
                        
                    />
                </View>
            </ScrollView>
        );
    };

    const styles = StyleSheet.create({
        whiteContainer: {
            marginTop: 30,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            width: "100%",
            felx: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            height: '90%'
        },
        container: {
            felx: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        header: {
            fontSize: 20,
            marginBottom: 20
        },
        chart: {
            marginVertical: 8,
            borderRadius: 16
        }
    });

    return (
        <SafeAreaView style={[defaultStyle.safeArea]}>
            <View style={[defaultStyle.container]}>
                <View style={[defaultStyle.top, { justifyContent: "flex-end" }]}>
                    <Topbar name={appData.name}  />
                </View>
                <View style={defaultStyle.body}>
                    <View style={{ alignItems: 'center', paddingVertical: 10, height: "10%", justifyContent: 'center' }}>
                        <Text style={{ fontSize: 26, fontWeight: "600", color: '#fff' }}>Analytics</Text>
                    </View>
                    <View style={styles.whiteContainer}>
                        {/* <Text>s</Text> */}
                        <SpendingAnalyticsBarChart />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
