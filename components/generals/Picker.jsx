import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';

const CustomDropdown = ({ data, onSelect, selectedValue }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.selectedText}>{selectedValue || "Select an option"}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={() => {
                                        onSelect(item.value);
                                        setIsVisible(false);
                                    }}
                                >
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        marginTop: 10,
    },
    dropdownButton: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
    },
    selectedText: {
        fontSize: 16,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        padding: 10,
    },
    itemContainer: {
        padding: 10,
    },
    itemText: {
        fontSize: 16,
    },
});

export default CustomDropdown;
