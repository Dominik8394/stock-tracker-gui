import React, { useState, useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Snackbar from '@material-ui/core/Snackbar';

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
                <Card>
                    <Card.Body>
                        <h3 className="text-center mb-4 mt-2">Erstelle eine neue Transaktion</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>ISIN</Form.Label>
                                <Form.Control type="text" ref={isinRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gekauft am</Form.Label>
                                <Form.Control type="date" ref={dateRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Anzahl</Form.Label>
                                <Form.Control type="number" ref={amountRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kurs</Form.Label>
                                <Form.Control type="number" ref={costRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Transaktionskosten</Form.Label>
                                <Form.Control type="number" ref={transactionCostRef} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gesamtinvestment</Form.Label>
                                <Form.Control type="number" ref={totalInvestRef} required />
                            </Form.Group>
                            <Button onClick={goBack} className="w-50 btn-secondary">Zurück</Button>
                            <Button disabled={loading} className="w-50" type="submit">Erstellen</Button>
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
