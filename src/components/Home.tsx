import { Box, Button, Container, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type StateData = {
    name: string
    nasa_jpl_url: string
    is_potentially_hazardous_asteroid: boolean
}

const Home = () => {

    const [data, setData] = useState<StateData>({
        name: "",
    nasa_jpl_url: "",
    is_potentially_hazardous_asteroid: true,
    });
    const [done, setDone] = useState(false);
    const [inputData, setInputData] = useState<number>(0);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    const navigate = useNavigate();

    function fetchSearchData() {
        axios({
            method: "GET",
            url: `https://api.nasa.gov/neo/rest/v1/neo/${inputData}?api_key=wUyFxo6gsWNWArjWdwelzSDXcqRkYCajzdnYSkoF`,
            responseType: 'json'
        })
            .then((result) => {
                setData({
                    name: result.data.name,
                    nasa_jpl_url: result.data.nasa_jpl_url,
                    is_potentially_hazardous_asteroid: result.data.is_potentially_hazardous_asteroid
                })
                setDone(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchRandomData = () => {
        setDisabledButton(true);
        axios({
            method: "GET",
            url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=wUyFxo6gsWNWArjWdwelzSDXcqRkYCajzdnYSkoF",
            responseType: 'json'
        })
            .then((responce) => {
                const astoridId = responce.data.near_earth_objects[Math.floor(Math.random() * responce.data.near_earth_objects.length) + 1].id;
                axios({
                    method: "GET",
                    url: `https://api.nasa.gov/neo/rest/v1/neo/${astoridId}?api_key=wUyFxo6gsWNWArjWdwelzSDXcqRkYCajzdnYSkoF`,
                    responseType: 'json'
                })
                    .then((result) => {
                        setData({
                            name: result.data.name,
                            nasa_jpl_url: result.data.nasa_jpl_url,
                            is_potentially_hazardous_asteroid: result.data.is_potentially_hazardous_asteroid
                        })
                        setDone(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (done) {
            const id = navigate("/details", { state: data });
            return ()=>{
                setDone(false);
            }
        }
    }, [data])
    
    return (
        <Container maxWidth="md" sx={{ backgroundColor: "#b3ffb3", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "350px", justifyContent: "space-between" }}>
                <TextField data-testid="inputfield" color='secondary' type="number" onChange={(e:any)=>setInputData(e.target.value)} />
                <Button variant='contained' data-testid="searchButton" disabled={!inputData || disabledButton} onClick={()=>fetchSearchData()}>Search</Button>
            </Box>
            <Button variant='contained' data-testid="randomButton" color='secondary' disabled={disabledButton} sx={{ marginTop: "30px" }} onClick={() => fetchRandomData()}>Random Search</Button>
        </Container>
    )
}

export default Home;