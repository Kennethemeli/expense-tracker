import { AntDesign , MaterialIcons} from "@expo/vector-icons";
import { View , StyleSheet } from "react-native";


const style = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        aspectRatio:"1/1",
        borderRadius:70
    }
})
const IconCircle = ({size=50,color="purple",icon})=>{
    return (
        <View style={[style.container,{width:size,backgroundColor:color}]}>
            <MaterialIcons name={icon} color="#fff" size={size * 0.5}/>
        </View>
    )
}

export default IconCircle;