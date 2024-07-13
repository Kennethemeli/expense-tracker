// CustomCollapsible.js

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated  , Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomCollapsible = ({ title, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isCollapsed) {
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                toValue: 'auto',
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [isCollapsed]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsCollapsed(!isCollapsed)}
            >
                <AntDesign name={isCollapsed ? "right" : "down"} size={18} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>
            <Animated.View style={[styles.content, { height: animatedHeight }]}>
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    titleContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    content: {
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default CustomCollapsible;
