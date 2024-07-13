import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader() {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000, // High zIndex value
        backgroundColor: "rgba(0,0,0,0.5)" // Optional: to give a semi-transparent background
    }
});
