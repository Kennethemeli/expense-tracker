import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconCircle from '../CategoryLabels/IconCircle';

const BreakDown = ({ pressed, category_id, category_name, color, icon, percentage, total_amount, value }) => {
    return (
        <TouchableOpacity  activeOpacity={0.8} onPress={() => { pressed(category_id) }} style={styles.container} >
            <View style={[styles.boxSections,]}>
                <IconCircle color={color} icon={icon} />
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.categoryText}>{category_name}</Text>
                    <Text style={styles.transactionText}>{value} Transactions</Text>
                </View>
            </View>
            <View style={[styles.boxSections, { justifyContent: 'space-around' }]}>
                <View>
                    <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
                </View>
                <View>
                    <Text style={styles.amountText}>$ {total_amount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const BreakDown2 = ({ category_name, color, icon,comment ,price,date ,pressed,id}) => {
    return (
        <TouchableOpacity  activeOpacity={0.8}  style={[styles.container,styles.container2]} onLongPress={()=>{pressed(id,price)}}>
            <View style={[styles.boxSections2,]}>
                <IconCircle color={color} icon={icon}/>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.categoryText}>{category_name}</Text>
                    <Text style={styles.transactionText}>{comment}</Text>
                </View>
            </View>
            <View style={[{ justifyContent: 'space-between' }]}>
                <View>
                    <Text style={styles.percentageText}><Text style={styles.amountText}>$ {price}</Text></Text>
                </View>
                <View>
                <Text style={styles.transactionText}>{date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container2: {
        justifyContent:"space-between"
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 6,
        margin:2,
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 4,
        flexDirection: "row",

    },
    boxSections: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    boxSections2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    categoryText:{
        color:"#1f1f1f",
        fontWeight:"600",
        fontSize:14
    },
    transactionText:{
        color:"#828282",
        fontWeight:"500",
        fontSize:12
    },
    percentageText:{
        color:"#1f1f1f",
        fontWeight:"600",
        fontSize:14
    },
    amountText:{
        color:"#1f1f1f",
        fontWeight:"700",
        fontSize:14
    },
});

export default BreakDown;
export {BreakDown2}
