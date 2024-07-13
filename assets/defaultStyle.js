import { StyleSheet, View, StatusBar, Platform } from "react-native";
import appColors from "./colors/appColors";


const defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.project,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%"
  },
  safeArea: {
    flex: 1,
    backgroundColor: appColors.project
  },
  top:{
    flex:1
  },
  body:{
    flex:9
  },
  baseInputStyle:{
    borderRadius:8,
    borderWidth:1,
    borderColor:"#E0E0E0",
    padding:7
},
twoSections:{
    flexDirection:"row",
    width:"100%",
    // alignItems:"center"
},
twoSectionInnerContainers:{
  width:"50%"
}
})

export default defaultStyle;