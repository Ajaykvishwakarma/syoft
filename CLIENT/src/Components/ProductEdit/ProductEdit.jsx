import * as React from 'react';
import style from '../Boards/NoticeBoard.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, deleteData } from '../../Redux/action';
import { useState, useEffect } from 'react';
import  CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
const axios = require("axios");


export const ProductEdit = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [count, setCount]  = useState(0);
    const [data, setData] = useState([])
    const  { id } = useParams();



    const navigate = useNavigate()
  
    const tokenStr = sessionStorage.getItem('token')
    const token1 = tokenStr ? JSON.parse(tokenStr) : navigate('/signin')
    const token = JSON.parse(sessionStorage.getItem('token'))
    const user = JSON.parse(localStorage.getItem('user'))
    

    const BaseUrl = `https://syofts.herokuapp.com`;

    useEffect(() => {
        getData();
        
    }, [])

    const getData = () => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

            axios.get(`${BaseUrl}/product/${id}`, config).then((res) => {
                setData(res.data);
            }).catch(err => {
          alert(err.message)
          })
    }

    console.log(name, price, description, count)


    const handleSubmit = async () =>  {
        if(name.length !== 0 && price.length !== 0 ) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const res1 = await axios.patch(`${BaseUrl}/product/${id}`, {
            name : name,
            price : price,
            description : description,
            inventory_count : count,
      
          }, config)
          .then((res) => {  
            let url = `${BaseUrl}/products`
            alert("Success!");
          }).catch(err => {
          alert(err.message)
          })
        }
        else{
          alert("Please fill Field!")
        }
        
      }

    return (
        <div style={{marginTop:"100px"}}>
             <Container component="main" maxWidth="xs" style={{marginBottom:"20px"}}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
              
                <Typography component="h1" variant="h5">
                 Edit Product
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label="Product Name"
                      type="name"
                      id="name"
                      defaultValue={data.name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-price"
                      name="price"
                      required
                      fullWidth
                      id="price"
                      defaultValue={data.price}
                      label="Price"
                      onChange={(e) => {
                        setPrice(e.target.value)
                      }}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Inventory Count</Typography>
                  <div>
                                
                      <ButtonGroup>
                      <h3 style={{ marginRight:"20px"}} >{count}</h3>
                      <Button
                          aria-label="reduce"
                          onClick={() => {setCount(count-1)}}
                      >
                          <RemoveIcon fontSize="small" />
                      </Button>
                      <Button
                          aria-label="increase"
                          onClick={() => {setCount(count+1)}}
                      >
                    
                          <AddIcon fontSize="small" />
                      </Button>
                      </ButtonGroup>

                  </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      defaultValue={data.description}
                      autoComplete="description"
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />
                  </Grid>
                  
                </Grid>
                  
                            
                  <Button
                    className={style.btn}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            
            </Container>
        </div>
    )

}