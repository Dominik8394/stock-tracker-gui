import React from 'react';

// Bootstrap imports
import { Button, Alert, Container } from 'react-bootstrap';
import './DashboardContent.css';

// React router imports
import { Link } from 'react-router-dom';

// Component imports
import StocksTable from '../stocks/StocksTable.js';

const DashboardContent = ({ stocks, logoutHandler }) => {

    let btn = null;
    let info = null;
    console.log("Stocks prop >>", stocks);

    return (
        <React.Fragment>
            <Container className="d-flex align-items-center 
            justify-content-between container-cm" style={{ "maxWidth": "100%" }}>


                <div className="d-flex align-items-center 
            justify-content-center vis-container">
                    {
                        (stocks.length <= 0) ?
                            (
                                info = <Alert variant="warning" className="text-center">
                                    Leider liegen keine Daten vor.
                                </Alert>
                            )
                            : info
                    }
                </div>

                <div className="d-flex align-items-center justify-content-center overview-container flex-column">
                    <StocksTable data={stocks} />
                    
                    {
                        stocks ?
                            (
                                btn = <Link className="btn-add btn-primary btn ml-2" role="button" to="/new-entry">Hinzufügen</Link>
                            ) : btn
                    }


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