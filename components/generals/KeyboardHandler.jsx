import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform , Keyboard} from "react-native";

export default function KeyboardHandler({ children }) {
    return (
        <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{Keyboard.dismiss()}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined }
                style={{flex:1}}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 60 })}
            >
                {children}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}