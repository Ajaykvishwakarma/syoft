import * as React from 'react';
import style from './NoticeBoard.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, deleteData } from '../../Redux/action';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
const axios = require("axios")

export const NoticeBoard = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("");
  const [count, setCount]  = useState(0);

  const navigate = useNavigate()
  
    const tokenStr = sessionStorage.getItem('token')
    const token1 = tokenStr ? JSON.parse(tokenStr) : navigate('/signin')
    const token = JSON.parse(sessionStorage.getItem('token'))
    const user = JSON.parse(localStorage.getItem('user'))



    const BaseUrl = `https://syofts.herokuapp.com`;

   const handleSubmit = async () =>  {
        if(name.length !== 0 && price.length !== 0 ) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const res1 = await axios.post(`${BaseUrl}/product`, {
            name : name,
            price : price,
            description : description,
            inventory_count : count,
      
          }, config)
          .then((res) => {  
            let url = `${BaseUrl}/products`
            dispatch(fetchData(url))
            alert("Success!")
          }).catch(err => {
          alert(err.message)
          })
        }
        else{
          alert("Please fill Field!")
        }
        
      }



      const dispatch = useDispatch()
      const { dataObj, loading } = useSelector((store) => store)
 
      
      useEffect(() => {
        let url = `${BaseUrl}/products`
        dispatch(fetchData(url))
     }, [])

    const handleDelete = (id) => {
      if(user?.role == "manager" || user?.role == "admin") {
        let url = `${BaseUrl}/product/${id}`
        dispatch(deleteData(url))
      } else {
        alert("You are not valid user")
      }

  }


    return (
      <div className={style.boardContainer}>
          <div>
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
                  Add Products
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
                      <h3 style={{ marginRight:"20px"}}>{count}</h3>
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

              { user?.role == "admin" || user?.role == "manager" ? <div className={style.post_controller}>

              {/* Loading  */}

              { loading ? <div className={style.spinner_div}>
                  <Box>
                      <CircularProgress />
                  </Box>
                  </div>
                : 
                <div>
                        {dataObj?.products?.map((el) => (
                        <div className={style.feeds}>
                            <div>
                              <div>
                             <h5 style={{marginTop:"10px"}}>Inventory Count : {el.inventory_count}</h5>
                              </div>
                            <div>
                            <Button style={{margin:"auto"}}  onClick={() => handleDelete(el._id)}>
                                  <CloseIcon />
                              </Button>
                            </div>
                            </div>
                            <div>
                             <h3>Product Name</h3>
                             <p>{el.name}</p>
                            </div>
                            <div>
                             <h3>Product Price</h3>
                             <p>Rs. {el.price}</p>
                            </div>
                            <div>
                             <h3>Product Description</h3>
                             <p>{el.description}</p>
                            </div>

                          </div>
                        ))}
                  </div>
            }
              </div>
              : ""
          }
        </div>
    )
}