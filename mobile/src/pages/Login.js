import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'


export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List')
            }
        })
    }, [])

    async function handleSubmit() {
        const response = await api.post('/users', { email })
        const { _id } = response.data
        console.log(techs)
        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        navigation.navigate('List')
    }

    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>Seu Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu email"
                placeholderTextColor="#ddd"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Tecnologias:</Text>
            <TextInput
                style={styles.input}
                placeholder="Tegnologias de interesse"
                placeholderTextColor="#ddd"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#ddd',
        marginBottom: 8
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
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})