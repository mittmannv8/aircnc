import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'

import api from '../../services/api'
import config from '../../config'

import './styles.css'

export default function Dashboard({ history }) {
    const [spots, setSpots] = useState([])
    const [requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user')

    const socket = useMemo(() => socketio(config.api_uri, {
        query: { user_id, connectionType: 'web'}
    }), [user_id])

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data])
        })
    }, [requests, socket])

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user')

            if (!user_id) {
                history.push('/')
            }

            const response = await api.get('/dashboard', {
                headers: { user_id }
            })
            setSpots(response.data)
        }
        loadSpots()
    }, [history])

    async function handleApproval(id, approved) {
        await api.post(`/bookings/${id}/approval`, { approved })

        setRequests(requests.filter(request => request._id !== id))
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p> 
                        <button className="accept" onClick={() => handleApproval(request._id, true)}>Aceitar</button>
                        <button className="reject" onClick={() => handleApproval(request._id, false)}>Rejeitar</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                 <li key={spot._id}>
                     <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
                     <strong>{spot.company}</strong>
                     <span>{spot.price ? `R$ ${spot.price}/dia` : 'Gratuito'}</span>
                 </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button></Link>
        </>
    )
}
