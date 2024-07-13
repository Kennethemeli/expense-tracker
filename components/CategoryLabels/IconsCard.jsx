import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        paddingVertical:17,
        borderRadius: 14,
        backgroundColor: "#FAF5FF",
        elevation:5,
        borderColor:"#00000030",
       
        flexDirection:"row",
        flexWrap:"wrap",
        
    }
})
const CategoryCard = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}


export default CategoryCard