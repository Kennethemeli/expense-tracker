import { View , StyleSheet,Text} from "react-native";

const Style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});

const IncomePage = ()=>{
    return(
        <View style={Style.container}>
            <Text>Income page</Text>
        </View>
    )
}

export default IncomePage;