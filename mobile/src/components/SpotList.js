import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import api from '../services/api'


function SpotList({ tech, navigation }) {
    const [ spots, setSpots ] = useState([])

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data)
        }

        loadSpots()
    }, [])

    function handleBooking(id) {
        navigation.navigate('Book', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.strong}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'Gratuito'}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleBooking(item._id)}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#eee',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    strong: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15
    },
    thumbnail: {
        backgroundColor: 'white',
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 4
    },
    company: {
        fontSize: 20,
        color: '#ddd',
        fontWeight: 'bold',
        marginTop: 8
    },
    price: {
        fontSize: 15,
        color: '#999',
    },
    button: {
        marginTop: 5,
        height: 32,
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

export default withNavigation(SpotList)