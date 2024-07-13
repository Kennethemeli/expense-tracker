import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PriceDateComponent = ({updateAmount}) => {
    const [price, setPrice] = useState('30');
    const [date, setDate] = useState('21/06/24');

    const handlePriceChange = (value) => {
        // Ensure only numbers are input
        if (!isNaN(Number(value))) {
            updateAmount(value);
        }
    };

    const handleDatePress = () => {
        // Placeholder for date picker 
        // integration
        alert('Date picker pressed');
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <View style={styles.priceInputBox}>
                    <Text style={styles.priceInput}>$</Text>
                    <TextInput
                        style={styles.priceInput}
                        // value={price}
                        onChangeText={handlePriceChange}
                        keyboardType="numeric"
                    />
                </View>
                {/* <View style={styles.line} /> */}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text></Text>
                <TouchableOpacity style={styles.dateButton} onPress={handleDatePress}>
                    <Text style={styles.dateText}>{date}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDatePress}>
                    <MaterialIcons name="calendar-today" size={24} color="purple" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: "100%",
        gap: 8,
        padding: 10,
    },
    priceInputBox: {
        flexDirection:"row",
        borderBottomColor:"purple",
        borderBottomWidth:3,
        paddingHorizontal:10,
        minWidth:100,
        justifyContent:"center"
    },
    priceInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center', 
        
    },
    line: {
        height: 2,
        backgroundColor: 'purple',
        width: 100,
        marginHorizontal: 5,
    },
    dateButton: {
        backgroundColor: '#5A4FCD',
        borderRadius: 15,
        paddingHorizontal: 18,
        paddingVertical: 5,
        alignItems: 'center',
    },
    dateText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default PriceDateComponent;


// Inside handleDatePress function

