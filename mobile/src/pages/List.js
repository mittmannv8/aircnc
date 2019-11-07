
import React, { useEffect, useState } from 'react'
import socketio from 'socket.io-client'
import { SafeAreaView, ScrollView, AsyncStorage, Image, StyleSheet, Alert } from 'react-native'

import config from '../../config'
import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function Book({ navigation }) {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        console.log(config)
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(config.api_uri, {
                query: { user_id, connectionType: 'mobile' }
            })

            socket.on('booking_response', booking => Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`))
            socket.on('new_spot', spot => {
                Alert.alert(`Novo spot cadastrado para tecnologias ${spot.company}`)
                const ntechs = [...techs]
                setTechs(ntechs)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            setTechs(storageTechs.split(',').map(tech => tech.trim()))
        })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>                
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555'
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 25
    }
})