import React, { useState, useRef } from 'react';

// Bootstrap imports
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './NewStockEntry.css';

// MaterialUI imports
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Context imports
import { useAuth } from '../../contexts/AuthContext';

// Component imports
import { createStockInformation } from '../api/StocksHttp';

const NewStockEntry = () => {

    /* Setting up states */
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState(false);

    const { currentUser } = useAuth();
    const history = useHistory();

    /* Setting up references */
    const isinRef = useRef();
    const nameRef = useRef();
    const dateRef = useRef();
    const amountRef = useRef();
    const transactionCostRef = useRef();
    const totalInvestRef = useRef();
    const costRef = useRef();

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInputBase-input': {
            input: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    });

    /**
    * Perform an http request to create a new stock table entry.
    */
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const isin = isinRef.current.value,
                title = nameRef.current.value,
                boughtAt = dateRef.current.value,
                amount = amountRef.current.value,
                cost = transactionCostRef.current.value,
                fee = costRef.current.value,
                totalAmount = totalInvestRef.current.value;


            const responseStatus = await createStockInformation(
                isin,
                title,
                boughtAt,
                amount,
                cost,
                fee,
                totalAmount,
                currentUser.email
            );
            console.info(`Response of http post request: ${responseStatus}`);
            setSuccess('Toll! Deine Transaktion wurde erstellt');
            setOpen(true);
            history.push("/");
        } catch (err) {
            setError(`Failed to send data to server: ${err}`);
        }

        setLoading(false);
    }

    const goBack = () => {
        history.go(-1);
    }

    // useCallBack Hook 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center mt-4">
                <Card className="card-bg-cm" style={{ width: '650px' }}>
                    <Card.Body style={{ width: '65%', margin: 'auto' }}>
                        <Card.Header as='h3' style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '1px solid white', background: 'none' }}>
                            Neuer Eintrag
                        </Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }}
                                    fullWidth id="outlined-basic" label="ISIN" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Name" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Gekauft am" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Anzahl" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Kurs" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Transaktionskosten" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <CssTextField InputLabelProps={{
                                    style: { color: '#fff' }
                                }} fullWidth id="outlined-basic" label="Gesamtinvestment" variant="outlined" ref={isinRef} required />
                            </Form.Group>
                            <Card.Footer style={{ textAlign: 'center', borderTop: '1px solid white', background: 'none' }} >
                                <div className="d-flex align-items-center justify-content-between">
                                    <Button onClick={goBack} className="btn-w-cm btn-secondary">Zurück</Button>
                                    <Button disabled={loading} className="btn-w-cm" type="submit">Erstellen</Button>
                                </div>
                            </Card.Footer>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div>
                {
                    success && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                        message={success}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                    </Snackbar>
                }
                {
                    error && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                        message={error}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                    </Snackbar>
                }

            </div>
        </React.Fragment>
    );
}

export default NewStockEntry;
