import { View  , TouchableOpacity , Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const PreviewHeader =  ({title,backFunction})=>{
    return(
        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",position:"relative",width:"100%"}}>
            <TouchableOpacity onPress={backFunction} style={{position:"absolute",left:12}}>
                <Ionicons name="chevron-back-sharp" color={"#fff"} size={20}/>
            </TouchableOpacity>
            <Text style={{color:"#fff",fontSize:16,fontWeight:"700"}}>{title}</Text>
        </View>
    )
};

export default PreviewHeader;