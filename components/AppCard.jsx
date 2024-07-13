import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { LinearGradient, } from 'expo-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import monthNames, { displayFullDate, displayFullMonth } from '../assets/months';


const BalanceCard = ({ total = '0.00' }) => {
    const [selectedTab, setSelectedTab] = useState('Month');

    const tabs = ['Day', 'Weekly', 'Month', 'Year', 'decade'];
    function numberFormat(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
        // Ensure the number is a float
        number = parseFloat(number);

        // Fixed the number to the specified decimals
        let fixedNumber = number.toFixed(decimals);

        // Split the number into integer and decimal parts
        let [integerPart, decimalPart] = fixedNumber.split('.');

        // Add the thousands separator
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

        // Combine the integer and decimal parts
        if (decimalPart) {
            return integerPart + decPoint + decimalPart;
        } else {
            return integerPart;
        }
    }





    return (
        <LinearGradient
            colors={['#4E349B', '#52336A']}
            style={styles.card}
            start={{ x: -0.05, y: 0 }}
            end={{ x: 1.18, y: 1 }}
        >
            <View style={styles.header}>
                <Text style={styles.balanceTitle}>Total Expense</Text>
                <Text style={styles.date}>{displayFullDate}</Text>
            </View>
            <Text style={styles.balance}>${numberFormat(total)}</Text>
            <ScrollView
                horizontal
                // showsHorizontalScrollIndicator={false}
                style={styles.tabContainer}
                contentContainerStyle={styles.tabContent}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0)', '#402788']}
                            style={[
                                styles.tab,
                                selectedTab === tab && styles.selectedTab,
                            ]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        >
                            <Text style={styles.tabText}>{tab}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.dateSelector}>
                <TouchableOpacity>
                    <Text style={styles.arrow}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.month}>{displayFullMonth}</Text>
                <TouchableOpacity>
                    <Text style={styles.arrow}>{'>'}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        elevation: 10,
        backgroundColor: '#4e0d9f',
        // height: "100%",
        borderColor: '#00000040',
        height:'auto'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    balanceTitle: {
        color: 'white',
        fontSize: 18,
    },
    date: {
        color: 'white',
        fontSize: 14,
    },
    balance: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tabContent: {
        flexDirection: 'row',
    },
    tab: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#00000040'
    },
    selectedTab: {
        backgroundColor: '#222',
    },
    tabText: {
        color: 'white',
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    month: {
        color: 'white',
        fontSize: 16,
    },
    arrow: {
        color: 'white',
        fontSize: 20,
    },
});

export default BalanceCard;
