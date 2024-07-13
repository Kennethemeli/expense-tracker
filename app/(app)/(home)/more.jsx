import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import defaultStyle from "../../../assets/defaultStyle";
import { useContext } from "react";
import AppContext from "../../../context/appcontext";
import Topbar from "../../../components/Topbar";
import { useRouter } from "expo-router";
import apis from "../../../assets/apis";



export default () => {
    const router = useRouter();
    const appC = useContext(AppContext);
    const { appData, signOutUser, setLoading, myReq, updateAppData } = appC;

    const eraseData = () => {
        Alert.alert('Confirmation', 'Are you sure you want to erase the data of all your expenses this process will automatically sign you out', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Yes', onPress: async () => {
                    setLoading(true);
                    try {
                        var data = await myReq(apis.wipeData, {}, false);
                        if (data.status) {
                            setLoading(false);
                            signOutUser();
                            router.replace("signin");
                        }else{
                            setLoading(false);
                            Alert.alert('Error',data.message);
                        }
                        
                    } catch (e) {
                        setLoading(false);
                        Alert.alert('Error','Failed to wipe data');
                    }
                }
            },
        ]);
    };
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
        <>
            <View style={[defaultStyle.container]}>
                <View style={[defaultStyle.top, { justifyContent: "flex-end" }]}>
                    <Topbar name={appData.name} />
                </View>
                <View style={[defaultStyle.body]}>
                    <View style={[style.container]}>
                        <View style={{ padding: 10 }}>
                            <View style={style.card}>
                                <View style={{ paddingTop: 10 }}>
                                    <Text>Name : {appData.name}</Text>
                                </View>
                                <View style={{ paddingTop: 10 }}>
                                    <Text>Email : t**********@gmail.com</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <TouchableOpacity style={style.eraseButton} activeOpacity={0.9} onPress={eraseData}>
                                    <Text style={{ color: "#fff" }}>Erase data</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={style.logoutButton} activeOpacity={0.9} onPress={logout}>
                                    <Text style={{ color: "#222" }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
const style = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingTop: 20,
        flex: 1,
        width: '100%'
    },
    logoutButton: {
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#f2f2f2',
        width: "80%"
    },
    eraseButton: {
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#dc3545',
        width: "80%"
    },
    card: {
        width: "100%",
        padding: 10,
        paddingVertical: 17,
        borderRadius: 14,
        backgroundColor: "#FAF5FF",
        elevation: 5,
        borderColor: "#00000030",
        flexWrap: "wrap",

    }

})