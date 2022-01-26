import React, { useRef, useState } from 'react';

import { Form } from 'react-bootstrap';

// MaterialUI imports
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

/**
 * Move input values to this component and pass handleSubmit method as props.
 * handleSubmit will then receive the final values set as a parameter.
 * @param {} props 
 * @param {*} param1 
 * @returns 
 */
const CustomInput = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState({
        ISIN: '',
        Name: '',
        Date: '',
        Amount: 0,
        Costs: 0,
        Total: 0,
        costs: 0
    });
    
    console.log();
    
    const { label, type, reference, ...inputProps } = props;
    const testRef = useRef(null);


    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInputBase-input': {
            color: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    });


    const testOnChange = (e) => {

        const refName = e.target.name;
        // e.target.name.current.focus();

        // console.log("new test Ref >>", testRef.current.value);
        // testRef.current.value = e.target.value;
        // console.log("new test Ref (value) >>", testRef.current.value);
        // [e.target.name + "Ref"].current.focus();
        console.log("new e Ref >>", testRef.current.value);
    }

    const onChange = (e) => {
        e.preventDefault();
        console.log("e.target.name", e.target.name);
        console.log("e.target.name", e.target.value);
        
        console.log("values", values.label);
        setValues({ ...values, [e.target.name]: e.target.value })
        // reference.current.value = e.target.value;
        // console.log("inside CustomInput onChange >>", e.target.value);
        // console.log("inside CustomInput onChange >>", reference.current.value);
    }


    // console.log("reference name >>", props.reference.current.value);

    return (
        <Form.Group>
            <CssTextField InputLabelProps={{
                style: { color: '#fff' }
            }}
                {...inputProps}
                fullWidth id="outlined-basic"
                label={label}
                name={label}
                // value={values.label}
                onChange={onChange}
                variant="outlined"
                ref={reference}
                required
                type={type}
            />

        </Form.Group>
    );
}

export default CustomInput;
