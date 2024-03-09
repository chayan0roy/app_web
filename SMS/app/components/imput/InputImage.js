import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const InputImage = () => {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleDocumentPicker = async () => {
        try {
            const doc = await DocumentPicker.pick();
            console.log(doc);
            setSelectedDocument(doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the document picking');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selected Document: {selectedDocument ? selectedDocument.name : 'None'}</Text>
            <Button title="Pick Document" onPress={handleDocumentPicker} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label: {
        marginBottom: 20,
    },
});

export default InputImage;
