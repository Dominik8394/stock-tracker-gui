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

    return (
        <React.Fragment>
            <Container className="d-flex align-items-center 
            justify-content-center flex-row" style={{ "maxWidth": "100%" }}>

                <div className="stocks-view">

                    <StocksTable data={stocks} />
                    {/* {
                        stocks ?
                            (
                            btn = <Link className="btn-add btn-primary btn mb-5" role="button" to="/new-entry">Hinzufügen</Link>

                    ) : (

                    )
                    } */}
                    <div className="d-flex align-items-center justify-content-between flex-row metrics-container">
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


                {/* <div>
                    <div className="w-100 text-center mt-2">
                        <Button onClick={logoutHandler}>Log Out</Button>
                        <Link className="btn btn-primary ml-2" role="button" to="/new-entry">Neuer Eintrag </Link>
                    </div>
                </div> */}
            </Container>
        </React.Fragment>
    );
}

export default DashboardContent;