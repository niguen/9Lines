import { StyleSheet, Pressable, Text } from "react-native";

function Button(props) {
    return (

        <Pressable style={({ pressed }) => [
            styles.buttonContainer,
            props.style,
            pressed && styles.pressedItem // Apply the pressedItem style when the button is pressed
        ]} onPress={props.onPress}>
            <Text>{props.children}</Text>
        </Pressable>
    )
}
export default Button;

const styles = StyleSheet.create({

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressedItem: {
        opacity: 0.5,
    }
})