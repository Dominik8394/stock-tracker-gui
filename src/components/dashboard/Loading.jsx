import React from 'react'
import { Container, Alert } from "react-bootstrap";

function Loading() {
    return (
        <>
            <Container className="mt-5 d-flex align-items-center justify-content-start flex-column flex-wrap">
                <div>
                    <Alert variant="warning" className="text-center">
                        Daten werden abgerufen...
                    </Alert>
                </div>
            </Container>
        </>
    )
}

export default Loading
