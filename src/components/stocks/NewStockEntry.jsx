import React, { useState, useRef } from 'react';

// Bootstrap imports
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './NewStockEntry.css';

// MaterialUI imports
import Snackbar from '@material-ui/core/Snackbar';

// Context imports˚
import { useAuth } from '../../contexts/AuthContext';

// Component imports
import { createStockInformation } from '../api/StocksHttp';

const NewStockEntry = () => {

    const isinRef = useRef(null);
    const nameRef = useRef(null);
    const dateRef = useRef(null);
    const amountRef = useRef(null);
    const priceRef = useRef(null);
    const totalRef = useRef(null);
    const tsxRef = useRef(null);

    console.log("rendering NewStockEntry Component ...");

    /* Setting up states */
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        ISIN: '',
        Name: '',
        Date: new Date().toISOString().slice(0, 10),
        Amount: 1,
        Price: 0,
        Total: 0,
        Transaction: 0
    });

    const { currentUser } = useAuth();
    const history = useHistory();


    /**
    * Perform an http request to create a new stock table entry.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting...");

        try {
            setLoading(true);
            const responseStatus = await createStockInformation({ ...values }, currentUser.email);

            console.info(`Response of http post request: ${responseStatus}`);
            setSuccess('Toll! Deine Transaktion wurde erstellt');
            setOpen(true);
            history.push("/");
        } catch (err) {
            setError(`Failed to send data to server: ${err}`);
            setOpen(true);
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

    const onChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    
    const logRefContent = () => {
        console.log(isinRef.current.value);
        console.log(nameRef.current.value);
        console.log(dateRef.current.value);
        console.log(tsxRef.current.value);
        console.log(amountRef.current.value);
        console.log(totalRef.current.value);
        console.log(priceRef.current.value);
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-4">
                <Card className="card-bg-cm" style={{ width: '650px' }}>
                    <Card.Body style={{ width: '65%', margin: 'auto' }}>
                        <Card.Header style={{ textAlign: 'center', background: 'none', borderBottom: 'none' }}>
                            Neuer Eintrag
                        </Card.Header>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <label>ISIN</label>
                                <input key={1} name="ISIN" ref={isinRef} type="number" />
                            </Form.Group>
                            <Form.Group>
                                <label>Name</label>
                                <input key={2} name="Name" ref={nameRef} type="text" />
                            </Form.Group>
                            <Form.Group>
                                <label>Date</label>
                                <input key={3} name="Date" ref={dateRef} type="date" />
                            </Form.Group>
                            <Form.Group>
                                <label>Amount</label>
                                <input key={4}  name="Amount" ref={amountRef} type="number" />
                            </Form.Group>
                            <Form.Group>
                                <label>Price</label>
                                <input key={5} name="Price" ref={priceRef} type="number" />
                            </Form.Group>
                            <Form.Group>
                                <label>Transaction Costs</label>
                                <input key={6} name="Transaction" ref={tsxRef} type="number" />
                            </Form.Group>
                            <Form.Group>
                                <label>Total Costs</label>
                                <input key={7} name="Total" ref={totalRef} type="number" />
                            </Form.Group>
                            <Card.Footer style={{ textAlign: 'center', background: 'none', borderTop: 'none' }} >
                                <div className="d-flex align-items-center justify-content-between">
                                    <Button onClick={goBack} className="btn-w-cm btn-secondary">Zurück</Button>
                                    <Button onClick={logRefContent} disabled={loading} className="btn-w-cm" type="submit">Erstellen</Button>
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
        </>
    );
}

export default NewStockEntry;
