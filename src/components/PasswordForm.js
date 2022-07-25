import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const PasswordForm = ({
    passwordOptions,
    length,
    setLength,
    options,
    setOptions,
    onFormSubmit,
}) => {
    const onOptionChange = (optionIndex) => {
        setOptions(
            options.map((item, index) => {
                if (index === optionIndex) {
                    return !item;
                }
                return item;
            })
        );
    };

    const renderedOptions = passwordOptions.map((passwordOption, index) => {
        return (
            <Form.Group as={Col} key={index}>
                <Form.Check
                    type='switch'
                    label={`Use ${passwordOption.label}`}
                    defaultChecked='true'
                    value={options[index]}
                    onChange={() => onOptionChange(index)}
                />
            </Form.Group>
        );
    });

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Row>
                    <Form.Group as={Col} md='3'>
                        <Form.Label>Password length: {length}</Form.Label>
                        <Form.Range
                            min='5'
                            max='35'
                            defaultValue={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>{renderedOptions}</Row>
                <hr />
                <Button variant='primary' type='submit'>
                    Create password
                </Button>
            </Form>
        </div>
    );
};

export default PasswordForm;
