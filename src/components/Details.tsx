import { Container, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Details = () => {
    const location:any = useLocation();
    return (
        <Container maxWidth="md" sx={{ backgroundColor: "#b3ffb3", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant='h3' data-testid="heading">Astroid Details</Typography>
            <Typography data-testid="nameTest">name: {location.state.name}</Typography>
            <Typography data-testid="nasa_jpl_url">nasa_jpl_url: {location.state.nasa_jpl_url}</Typography>
            <Typography data-testid="is_potentially_hazardous_asteroid">Is_potentially_hazardous_asteroid: {location.state.is_potentially_hazardous_asteroid}</Typography>
        </Container>
    )
}

export default Details