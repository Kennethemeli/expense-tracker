import { View, StyleSheet, Text, ScrollView, TextInput, Switch, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import PriceDateComponent from "../ExpenseInput";
import CategoryCard from "../CategoryLabels/IconsCard";
import ManageCategory from "../CategoryLabels/Category";
// import KeyboardHandler from "../generals/KeyboardHandler";
import { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import appColors from "../../assets/colors/appColors";
import Collapsible from "react-native-collapsible";
import defaultStyle from "../../assets/defaultStyle";
import { Picker } from "@react-native-picker/picker";
import CustomDropdown from "../generals/Picker";
import CustomCollapsible from "../generals/Collapsable";
import { useContext } from "react";
import AppContext from "../../context/appcontext";
import apis from "../../assets/apis";



const InputExpense = ({updatePage}) => {
    
  const appC = useContext(AppContext);
  const {appData , signOutUser , setLoading , myReq} = appC;
    const [comment, updateComment] = useState("");
    const [amount, updateAmount] = useState(20);
    const [budgetAmount, updateBudgetAmount] = useState("");
    const [budgetDuration, updateBudgetDuration] = useState("");
    // const [recuringDuration, updateRecuringDuration] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isBudgeted, setIsBudgeted] = useState(false);
    // const [isRecurring, setIsRecurring] = useState(false);
    const [expenseCat,setExpenseCat] = useState('');
    // const [durations, setDurations] = useState([
    //    
    // ]);
    const durations = [
        { label: 'Daily', value: 'Daily' },
        { label: '3 Days', value: '3 Days' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Monthly', value: 'Monthly' },
    ]

    function setComment(comm) {
        String(comm).length <= 100 ? updateComment(String(comm)) : null;
    }

    async function addExpense(){
        setLoading(true);
        try{
            var reqData = await myReq(apis.addExpense,{category_id:expenseCat,comment,amount});
            setLoading(false);
            Alert.alert(
                reqData.status ? 'Success':'Error',
                reqData.message
            );
            reqData.status && updatePage();
        }catch(err){
            setLoading(false);
            Alert.alert(
               'Error',
                'Failed to add expense '+err
            )
        }
    }
    const budgetDurationRef = useRef();
    function budgetDurationAction({ open = false }) {
        open ? budgetDurationRef.current.focus() : budgetDurationRef.current.close();
    }
    return (
        // <KeyboardHandler>
        <View style={Style.container}>
            {/* <ActivityIndicator  size="large" color="#0000ff"/> */}
            <ScrollView style={{ flex: 1, height: "100%", width: "100%", paddingBottom: 10 }} >
                <View style={{flex:1}}>
                    <View style={{ paddingTop: 10, }}>
                        <PriceDateComponent updateAmount={updateAmount}/>
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 10, flex: 1 }}>
                        <CategoryCard>
                            {
                                appData.categories.map(
                                    (x,ind)=>{
                                        return <ManageCategory {...x} key={ind} pressed={setExpenseCat} active={x.id == expenseCat}/>
                                    }
                                )
                            }
                        </CategoryCard>
                        <View style={Style.commentContainer}>
                            <View>
                                <Text style={Style.commentText}>Comment</Text >
                            </View>
                            <View style={Style.commentInputContainer}>
                                <TextInput
                                    placeholder="Add comment"
                                    style={Style.inputComment}
                                    placeholderTextColor={"#828282"}
                                    onChangeText={(com) => { setComment(com) }}
                                    value={comment}
                                />
                                <Text style={Style.commentCountText}>{comment.length}/100</Text>
                            </View>
                        </View>
                        <View style={Style.budgetSection}>
                            <View style={Style.budgetTitle}>
                                <Text style={{ color: isCollapsed ? "#000" : "#00000000" }}>Budget & recurring</Text>
                                <TouchableOpacity activeOpacity={0.1} onPress={() => { setIsCollapsed(!isCollapsed) }}>
                                    <AntDesign name={isCollapsed ? "right" : "down"} size={18} />
                                </TouchableOpacity>
                            </View>
                            <Collapsible collapsed={isCollapsed}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Budget</Text>
                                    <View style={{ marginTop: 5 }}>
                                        <TextInput
                                            placeholder="Enter Amount of Pe"
                                            style={Style.baseInputStyle}
                                            keyboardType="numeric"
                                            onChangeText={
                                                (e)=>{
                                                    updateBudgetAmount(e.ta);
                                                    console.log(e);
                                                }
                                            }
                                            value={budgetAmount}
                                        />
                                        <View style={[defaultStyle.twoSections, { marginTop: 14 }]}>
                                            <View style={defaultStyle.twoSectionInnerContainers}>
                                                <Text>Budget Duration</Text>
                                                <CustomDropdown data={durations} selectedValue={budgetDuration} onSelect={(x)=>{updateBudgetDuration(x)}}/>
                                            </View>
                                            <View style={[defaultStyle.twoSectionInnerContainers, { alignItems: "flex-end" }]}>
                                                <Text>Set Budget</Text>
                                                <Switch
                                                    trackColor={{ false: '#e2e8f0', true: '#81b0ff' }}
                                                    thumbColor={isBudgeted ? '#f2f2f2' : '#f4f3f4'}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={() => { setIsBudgeted(prev => !prev) }}
                                                    value={isBudgeted}
                                                    style={{marginTop:7}}
                                                />
                                            </View >
                                        </View>
                                        {/* <View style={[defaultStyle.twoSections, { marginTop: 14 }]}>
                                            <View style={defaultStyle.twoSectionInnerContainers}>
                                                <Text>Recuring</Text>
                                                <CustomDropdown data={durations} selectedValue={recuringDuration} onSelect={(x)=>{updateRecuringDuration(x)}}/>
                                            </View>
                                            <View style={[defaultStyle.twoSectionInnerContainers, { alignItems: "flex-end" }]}>
                                                <Text>Set Recuring</Text>
                                                <Switch
                                                    trackColor={{ false: '#e2e8f0', true: '#81b0ff' }}
                                                    thumbColor={isBudgeted ? '#f2f2f2' : '#f4f3f4'}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={() => { setIsRecurring(prev => !prev) }}
                                                    value={isRecurring}
                                                    style={{marginTop:7}}
                                                />
                                            </View >
                                        </View> */}
                                    </View>
                                    
                                </View>
                            </Collapsible>
                        </View>
                        <View style={Style.addExpenseButtonContainer}>
                            <TouchableOpacity style={Style.addExpenseButton} activeOpacity={0.9} onPress={addExpense}>
                                <Text style={{ color: "#fff" }}>Add Expense</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        // </KeyboardHandler>
    )
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 50,
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


export default InputExpense;