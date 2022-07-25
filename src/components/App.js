import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import PasswordForm from './PasswordForm';

const passwordOptions = [
    {
        index: 0,
        label: 'small letters',
        chars: 'abcdefghijklmnopqrstuvwxyz',
    },
    {
        index: 1,
        label: 'capital letters',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
        index: 2,
        label: 'special characters',
        chars: '!"#$%&\'()*+,-./\\',
    },
    {
        index: 3,
        label: 'numbers',
        chars: '1234567890',
    },
];

const App = () => {
    const [length, setLength] = useState(20);
    const [options, setOptions] = useState([true, true, true, true]);
    const [password, setPassword] = useState('');

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const getRandomChar = (options) => {
        while (true) {
            let index = getRandomInt(4);
            if (options[index]) {
                const charsArray = passwordOptions[index].chars;
                return charsArray[getRandomInt(charsArray.length)];
            }
        }
    };

    const generatePassword = () => {
        let password = '';

        let ok = false;
        for (let i = 0; i < options.length; i++) {
            ok = Math.max(ok, options[i]);
        }

        if (!ok) return password;
        for (let i = 0; i < length; i++) {
            password += getRandomChar(options);
        }

        return password;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        setPassword(generatePassword());
    };

    return (
        <div>
            <Container className='mt-4'>
                <PasswordForm
                    passwordOptions={passwordOptions}
                    length={length}
                    setLength={setLength}
                    options={options}
                    setOptions={setOptions}
                    onFormSubmit={onFormSubmit}
                />
                <br />
                <h2>
                    <span>New password: </span>
                    <span
                        className='font-monospace'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigator.clipboard.writeText(password);
                        }}
                    >
                        {password}
                    </span>
                </h2>
            </Container>
        </div>
    );
};

export default App;
