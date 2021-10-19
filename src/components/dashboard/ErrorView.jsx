import React from 'react';

// Bootstrap imports
import { Container } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import './ErrorView.css';

const ErrorView = ({ errorMsg }) => {
    
    return(
        <React.Fragment>
                <Container className="mt-5 d-flex align-items-center 
                justify-content-start flex-column flex-wrap container-cm">
                    <div>
                        <Alert variant="warning" className="text-center">
                            Es scheint als gebe es ein Problem ({errorMsg.toString()}).
                            <br />
                            Bitte versuche es später nocheinmal!
                            
                        </Alert>
                    </div>
                </Container>
            </React.Fragment>
    );
}

export default ErrorView;