import IconCircle from "./IconCircle";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ManageCategory = ({ category, size, color, icon, active, id, pressed }) => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", width: "25%", marginBottom: 12, backgroundColor: active ? '#ADD8E633' : '#00000000', padding: 3 }} >
            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} activeOpacity={0.8} onPress={()=>{pressed(id)}}>
                <IconCircle size={size} color={color} icon={icon} />
                <Text style={{ fontSize: 11, fontWeight: "300" }}>{category}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ManageCategory;