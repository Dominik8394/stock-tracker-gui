import React from 'react';

// Bootstrap imports
import { Alert, Container, Button } from 'react-bootstrap';
import './DashboardContent.css';

// React router imports
import { Link } from 'react-router-dom';

// Component imports
import StocksTable from '../stocks/StocksTable.js';
import BarChart from './BarChart';
import PieChart from './PieChart';

const DashboardContent = ({ stocks, logoutHandler }) => {

    let btn = null;
    let info = null;

    console.log(stocks);

    return (
        <>
            <Container className="d-flex align-items-center 
            justify-content-center flex-row" style={{ "maxWidth": "75%", "minWidth": "0%" }}>

                <div className="stocks-view">
                    <div className="container header mt-5">
                        <h3>Füge eine weitere Transaktion deinem Dashboard hinzu!</h3>
                        <Link className="btn-add btn-primary btn mb-5" style={{ maxWidth: "30%" }} role="button" to="/new-entry">Hinzufügen</Link>
                    </div>
                    <StocksTable data={stocks} />

                    <div className="d-flex align-items-center justify-content-between flex-row metrics-container mb-5">
                        <div className="d-flex align-items-center justify-content-center vis-container">
                            {
                                (stocks.length <= 0) ?
                                    (
                                        info = <Alert variant="warning" className="text-center">
                                            Leider liegen keine Daten vor.
                                        </Alert>
                                    )
                                    : <BarChart />
                            }
                        </div>

                        <div className="d-flex align-items-center justify-content-center overview-container">
                            {
                                (stocks.length <= 0) ?
                                    (
                                        info = <Alert variant="warning" className="text-center">
                                            Leider liegen keine Daten vor.
                                        </Alert>
                                    )
                                    : <PieChart stocks={stocks} />
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default DashboardContent;