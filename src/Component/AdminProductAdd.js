import React, { useState } from 'react';
import { 
    Button, 
    TextField, 
    Grid, 
    Typography, 
    Paper,
    IconButton,
    Box
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
    },
    paper: {
        padding: theme.spacing(3),
    },
    backButton: {
        marginBottom: theme.spacing(2),
    },
}));

function AdminProductAdd() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    
    const navigate = useNavigate();

    async function onSubmitClick() {
        try {
            console.log({ name, description, price, quantity, category, imageURL });
            let item = { name, description, price, quantity, category, imageURL };
            let result = await fetch('https://localhost:7131/api/Product', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            result = await result.json();
            console.warn('result', result);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    function handleBackClick() {
        navigate('/');
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                <IconButton className={classes.backButton} onClick={handleBackClick}>
                    <ArrowBackIcon />
                </IconButton>
                Product Details
            </Typography>
            <Paper className={classes.paper} elevation={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            label="Name" 
                            variant="outlined" 
                            fullWidth 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Description" 
                            variant="outlined" 
                            fullWidth 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Price" 
                            variant="outlined" 
                            fullWidth 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Quantity" 
                            variant="outlined" 
                            fullWidth 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Category" 
                            variant="outlined" 
                            fullWidth 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Image URL" 
                            variant="outlined" 
                            fullWidth 
                            value={imageURL} 
                            onChange={(e) => setImageURL(e.target.value)} 
                        />
                    </Grid>
                </Grid>
                <br></br>
                <Box mt={3}>
                    <Button variant="contained" color="primary" onClick={onSubmitClick}>
                        Add New Product
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default AdminProductAdd;
