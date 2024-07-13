import { StyleSheet, Text, TouchableOpacity, View , Alert} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import AppContext from "../context/appcontext";
import { useContext } from "react";
import { useRouter } from "expo-router";


const style = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 6,
        // backgroundColor:"red"
    },
    iconContainer: {
        padding: 8,
        borderRadius: 70,
        backgroundColor: "#fff"
    }

})


export default ({ name = "user"}) => {
    const router = useRouter();

    const appC = useContext(AppContext);
    const { appData, signOutUser, setLoading } = appC;

    const logout = () => {
        Alert.alert('Confirmation', 'Do you want to logout', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Yes', onPress: () => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        signOutUser();
                        router.replace("signin");
                    }, 1000);
                }
            },
        ]);
    };
    return (
        <View style={style.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="sunny" size={26} color="#F29D38" />
                <View style={{ paddingLeft: 7 }}>
                    < Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{name}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={style.iconContainer}>
                    <TouchableOpacity >
                        <Ionicons name="notifications-outline" color="#222" size={16} />
                    </TouchableOpacity>
                </View>
                <View style={style.iconContainer} >
                    <TouchableOpacity onPress={logout}>
                        <FontAwesome6 name="user-large" color="#222" size={16} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}