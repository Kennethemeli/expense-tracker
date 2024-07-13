import { View , StyleSheet,Text} from "react-native";
import BalanceCard from "../AppCard";

const Style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
const BalancePage =  ()=>{
    return(
        <View style={Style.container}>
            <Text>Balance page</Text>
        </View>
    )
}
export default BalancePage;