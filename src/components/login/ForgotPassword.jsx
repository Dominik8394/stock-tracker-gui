import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions.");
        } catch (error) {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an Account? <Link to="/signup">Sign Up</Link>
            </div>
        </React.Fragment>
    );
}

export default ForgotPassword;
