import React, {useEffect, useState} from "react";
import './PasswordCheck.scss'
import {TextField} from "@mui/material";

type PasswordCheckType = {}

export const PasswordCheck = (props: PasswordCheckType) => {
    const [password, setPassword] = useState('');
    const [strengthSections, setStrengthSections] = useState({
        section1: '',
        section2: '',
        section3: '',
    })

    const checkingPasswordStrength = (password: string) => {
        // const isOnlyDigits = /^\d+$/.test(password);
        // const isOnlyLetters = /^[a-zA-Z]+$/.test(password);
        // const isOnlySymbols = /^[^\w\d]+$/.test(password);

        if (!password) {
            setStrengthSections({
                section1: 'grey',
                section2: 'grey',
                section3: 'grey'
            })
        } else if (password.length >= 8) {
            if (/^(?:\d+|[a-zA-Z]+|[^\w\d]+)$/.test(password)) {
                setStrengthSections({
                    section1: 'red',
                    section2: 'grey',
                    section3: 'grey'
                })
            } else if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).*$/.test(password)) {
                setStrengthSections({
                    section1: 'green',
                    section2: 'green',
                    section3: 'green'
                })
            } else if ((/^([^\s]+|[a-zA-Z0-9]+|[0-9!_\/@#§$%^&*=±()-{}[\]<>~`'"\\|.]+)$/.test(password))) {
                setStrengthSections({
                    section1: 'yellow',
                    section2: 'yellow',
                    section3: 'grey'
                })
            } else {
                setStrengthSections({
                    section1: 'red',
                    section2: 'grey',
                    section3: 'grey'
                })
            }
        } else {
            setStrengthSections({
                section1: 'red',
                section2: 'red',
                section3: 'red'
            });
        }
    }



    useEffect(() => {
        checkingPasswordStrength(password)
    }, [password])


    return (
        <div className={'pass'}>
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={"password"}
                onChange={(e)=>{
                    setPassword(e.target.value)}}
                margin="normal"
                style={{width:'200px'}}
            />

            <div className={'passColor'}
                 style={{backgroundColor: strengthSections.section1}}></div>
            <div className={'passColor'}
                 style={{backgroundColor: strengthSections.section2}}></div>
            <div className={'passColor'}
                 style={{backgroundColor: strengthSections.section3}}></div>

        </div>
    )

};