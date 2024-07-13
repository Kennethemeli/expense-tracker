import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import PriceDateComponent from "../ExpenseInput";
import CategoryCard from "../CategoryLabels/IconsCard";
import ManageCategory from "../CategoryLabels/Category";
// import KeyboardHandler from "../generals/KeyboardHandler";
import { useRef, useState } from "react";

import appColors from "../../assets/colors/appColors";
import { useContext, useEffect } from "react";
import AppContext from "../../context/appcontext";
import apis from "../../assets/apis";
import defaultStyle from "../../assets/defaultStyle";
import { BreakDown2 } from "../generals/BreakDown";



const ExpenseBreakdown = ({ categoryId, total , updateSummary }) => {
    const currentTotal = useRef(total);

    const appC = useContext(AppContext);
    const { appData, signOutUser, setLoading, myReq } = appC;
    const [expenses, setExpenses] = useState([]);
    useEffect(
        () => {
            const getData = async () => {
                try {
                    setLoading(true);
                    const url = `${apis.expensesByCategory}/${categoryId}`;
                    //console.log(url);
                    const data = await myReq(url, {}, false);

                    if (data.status) {
                        setExpenses(data.data);
                        //console.log(data.data);
                    } else {
                        Alert.alert("Error", data.message);
                    }
                } catch (err) {
                    console.log(err);
                    Alert.alert("Error", 'Failed to fetch data');
                } finally {
                    setLoading(false);
                }
            }
            getData();

        }, []
    )
    function deleteExpense(id,total){
        Alert.alert('Confirmation','Are you sure you want ot delete this expense',[
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Yes', onPress: async () => {
                    setLoading(true);
                    try {
                        var data = await myReq(apis.deleteExpense, {id:id});
                        if (data.status) {
                            alert('Expense deleted');
                            currentTotal.current = Number(currentTotal.current) - Number(total); 

                            Array.isArray(expenses) && setExpenses(prev=>{
                                return prev.filter(x=>{return x.id !== id})
                            })
                            updateSummary();
                        }else{
                            Alert.alert('Error',data.message);
                        } 
                    } catch (e) {
                        Alert.alert('Error','Failed to wipe data');
                    }finally{
                        setLoading(false);
                    }
                }
            },
        ])
    }
    return (
        <>
            <View style={Style.container}>
                <View style={Style.totalBox}>
                    <Text style={Style.total}>${currentTotal.current}</Text >
                </View>
                <View style={Style.whiteContainer}>
                    <View style={[defaultStyle.twoSections, Style.topBox, { paddingVertical: 17, paddingHorizontal: 25 }]}>
                        <View style={defaultStyle.twoSectionInnerContainers}>
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>Analytics</Text>
                        </View>
                        <View style={[defaultStyle.twoSectionInnerContainers, { alignItems: "flex-end" }]}>
                            <Text>By Date</Text>
                        </View>
                    </View>
                    {/* <ActivityIndicator  size="large" color="#0000ff"/> */}
                    <ScrollView style={{ flex: 1, height: "100%", width: "100%", paddingVertical: 10 }} >
                        {
                            expenses.length == 0 ?
                                <View style={{ alignItems: 'center',paddingTop:10}}>
                                    <Text>No data</Text>
                                </View>
                                :
                                expenses.map(
                                    (x, ind) => (
                                        <BreakDown2 {...x} key={ind} pressed={deleteExpense}/>
                                    )
                                )
                        }
                    </ScrollView>
                </View>
            </View>
        </>
    )
}
const Style = StyleSheet.create({
    container: {
        flex: 1
    },
    total: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff"
    },
    totalBox: {
        alignItems: "center"
    },
    topBox: {
        borderBottomColor: "#000000",
        borderBottomWidth: 1
    },
    whiteContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden"
    },
    commentContainer: {
        padding: 9
    },
    commentText: {
        fontSize: 14,
        color: "#000"
    },
    commentInputContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "#1f1f1f",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputComment: {
        padding: 5,
        width: "80%",
    },
    commentCountText: {
        color: "#828282",
        fontSize: 12
    },
    placeHolderStyle: {
        color: "#000"
    },
    budgetSection: {
        borderTopColor: "#00000033",
        borderBottomColor: "#00000033",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 10
    },
    budgetTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3
    },
    addExpenseButtonContainer: {
        marginVertical: 10,
        alignItems: "center",

    },
    addExpenseButton: {
        paddingVertical: 13,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appColors.project,
        width: "80%"
    },
    baseInputStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 7
    },

});


export default ExpenseBreakdown;