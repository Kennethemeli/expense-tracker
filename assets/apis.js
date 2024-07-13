import { Platform } from "react-native";
// const base = Platform.OS ==='android' ? "http://10.0.2.2:5000/apis":"http://172.20.10.6:5000" ;
const base = Platform.OS ==='android' ? "https://apis.saddleupsales.com/apis":"http://172.20.10.6:5000" ;
const apis = {
    signin:base+"/signin",
    signup:base+"/signup",
    expenseSummary:base+"/expenses-summary",
    addExpense:base+"/add-expense",
    expensesByCategory:base+"/expenses-category",
    wipeData:base+"/wipe-data",
    deleteExpense:base+"/delete-expense"
}

export default apis;