import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import StocksTable from '../stocks/StocksTable';
import { Link } from 'react-router-dom';

import { getStockInformationByUser } from '../api/StocksHttp';

const Dashboard = () => {

    /* Setting up states */
    const [error, setError] = useState('');
    const [stockData, setStockData] = useState([]);
    const [pending, setPending] = useState(false);

    const { currentUser, logout } = useAuth();

    const history = useHistory();

    useEffect(async () => {
        setPending(true);
        try {
            const response = await getStockInformationByUser(currentUser.email);
            setPending(false);
            setStockData(response);
            console.log(`Response data ${JSON.stringify(response)}`);

        } catch (err) {
            setError(err);
            console.info(err);
        }

    }, []);

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            setError('Failed to log out');
        }
    }

    return (
        pending ?
            <React.Fragment>
                <Container className="d-flex align-items-center justify-content-center flex-column flex-wrap"
                    style={{ minheight: "100vh" }}>
                    <div>
                        <h2 className="text-center mb-4">Das ist das Dashboard von {currentUser.email}</h2>
                        <Alert variant="warning" className="text-center">
                            Es scheint als gebe es ein Problem ({error.toString()}).
                            <br />
                            Bitte versuche es später nocheinmal!
                        </Alert>
                    </div>
                </Container>
            </React.Fragment> :
            <React.Fragment>
                <Container className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}>
                    <div>
                        <h2 className="text-center mb-4">Das ist das Dashboard von {currentUser.email}</h2>

                        <StocksTable data={stockData} />

                        <div className="w-100 text-center mt-2">
                            <Button onClick={handleLogout}>Log Out</Button>
                            <Link className="btn btn-primary ml-2" role="button" to="/new-entry">Neuer Eintrag </Link>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
    );
}

export default Dashboard;

