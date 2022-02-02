import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import ErrorView from './ErrorView';
import Loading from './Loading';
import DashboardContent from './DashboardContent';

import { getStockInformationByUser } from '../api/StocksHttp';

const Dashboard = () => {

    /* Setting up states */
    const [error, setError] = useState('');
    const [stockData, setStockData] = useState([]);
    const [pending, setPending] = useState(false);

    const { currentUser, logout } = useAuth();

    const history = useHistory();

    useEffect(() => {
        setPending(true);
        try {
            (async function fetchData() {
                const response = await getStockInformationByUser(currentUser.email);
                setPending(false);
                setStockData(response);
            })();

        } catch (err) {
            setError(err);
            console.info(err);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*
    /* The user will be logged out of the current session and
    /* routed back to the login view.
    */
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
        !pending ?
            <React.Fragment>
                <DashboardContent stocks={stockData} logoutHandler={handleLogout} />
            </React.Fragment>
            :
            error ?
                <>
                    <ErrorView errorMsg={error} />
                </>
                :
                <React.Fragment>
                    <Loading />
                </React.Fragment>
    );
}

export default Dashboard;

