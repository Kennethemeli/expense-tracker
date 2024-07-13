import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import BalanceCard from "../AppCard";
import { useState } from "react";
import DonutChart from "../DonutChart";
import { Octicons } from "@expo/vector-icons";
import BreakDown from "../generals/BreakDown";


const data = [
    { value: 35, color: '#346BFF' },
    { value: 25, color: '#F39F22' },
    { value: 20, color: '#FA3C3C' },
    { value: 15, color: '#32B737' },
    { value: 25, color: '#A335A7' },
    { value: 20, color: '#345DFF' }
];

const ExpensePage = ({ inputExpense, expenses, enterBreakdown }) => {
    const [size, setSize] = useState(0);
    return (
        <View style={Style.container}>
            <View style={Style.translate}>
                {/* <View style={{ flex: 1.2, position: "relative" }}> */}
                <View >
                    <View style={Style.balanceContainer}>
                        <BalanceCard total={expenses.reduce((sum, item) => Number(sum) + Number(item.total_amount), 0)} />
                    </View>
                </View>
                <ScrollView style={{ flex: 1, width: "100%" }}>
                    <View style={{ position: "relative",justifyContent:'center',alignItems:'center'}}>
                        <View style={Style.expenseContainer}
                            onLayout={(event) => {
                                const { width, height } = event.nativeEvent.layout;
                                const minSize = Math.min(width, height); // Ensures the chart is not stretched
                                setSize(minSize);
                            }}
                        >
                            <DonutChart data={expenses} size={size} />
                        </View>
                        <TouchableOpacity style={Style.addExpense} onPress={inputExpense}>
                            <Octicons color={"#ffffff"} name="plus" size={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2.3}}>
                        <View style={Style.breakDownHead}>
                            <View>
                                <Text style={Style.breakDownTitle}>Expense Breakdown</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={Style.analyticsBtn}>
                                    <Text style={{ color: "#ffffff" }}>Analytics</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: "100%", backgroundColor: "#f2f2f2", padding: Array.isArray(expenses) && expenses.length > 0 ? 10 :0 }}>
                            {
                                Array.isArray(expenses) && expenses.map((x, ind) => {
                                    return <BreakDown key={ind} {...x} pressed={enterBreakdown} />
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center",
        alignItems: "center",
        marginTop: 50,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    translate: {
        flex: 1,
        position: "relative",
        top: -10,
        width: "100%"
    },
    balanceContainer: {
        // padding: 10,
        transform:[{translateY:-10}],
        // backgroundColor:'red'
    },
    expenseContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight:50,
        // flex:1,
        width:'30%' ,
        padding:5
    },
    expense: {
        height: "97%",
        aspectRatio: "1/1",
        borderWidth: 20,
        borderColor: "#234AAF",
        borderRadius: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    addExpense: {
        position: "absolute",
        aspectRatio: "1/1",
        bottom: 1,
        right: 5,
        backgroundColor: "#F29D38",
        borderRadius: 70,
        width: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    breakDownHead: {
        width: "100%",
        paddingVertical:10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "flex-end",
    },
    breakDownBody: {
        height: "85%",
        width: "100%",
    },
    breakDownTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    analyticsBtn: {
        borderRadius: 12,
        backgroundColor: "#8659B2",
        paddingVertical: 1,
        paddingHorizontal: 7
    }
});
export default ExpensePage;