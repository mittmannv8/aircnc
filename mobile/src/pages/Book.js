import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, AsyncStorage, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import api from '../services/api'

export default function List({ navigation }) {
    const [date, setDate] = useState('')

    const spot_id = navigation.getParam('id')

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user')
        const response = await api.post(`/spots/${spot_id}/bookings`, { date }, { headers: { user_id } })

        Alert.alert('Solicitação de reserva enviada')
        navigation.navigate('List')
    }

    function handleCancel() {
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Data de interesse *:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar"
                    placeholderTextColor="#ddd"
                    autoCapitalize="none"
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Solicitar Reseva</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar Reseva</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555'
    },
    form: {
        marginTop: 30,
        padding: 20
    },
    label: {
        fontWeight: 'bold',
        color: '#ddd',
        marginBottom: 8,
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#777',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: 'cadetblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10
    },
    cancelButton: {
        backgroundColor: 'red'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})