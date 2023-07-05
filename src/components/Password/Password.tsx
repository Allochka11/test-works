import React, {useEffect, useState} from "react";
import './Password.scss'
import {TextField} from "@mui/material";

type SectionsType = {
    section1: string,
    section2: string,
    section3: string
};
type StatusType = {
    default: () => void,
    easy: () => void,
    hard: () => void,
    medium: () => void
    error: () => void
};
type FilterType = {
    isOnlyDigits: RegExp,
    isOnlyLetters: RegExp,
    isOnlySymbols: RegExp,
    isOnlyLettersAndSymbols: RegExp,
    isOnlyLettersAndDigits: RegExp,
    isOnlyDigitsAndSymbols: RegExp,
    isDigitsLettersSymbols: RegExp,
    isEasyPassword: (password: string) => boolean,
    isMediumPassword: (password: string) => boolean,
    isHardPassword: (password: string) => boolean
}

export const Password = () => {
    const [password, setPassword] = useState('');
    const [strengthSections, setStrengthSections] = useState<SectionsType>({
        section1: '',
        section2: '',
        section3: '',
    });
    const [passwordLabel, setPasswordLabel] = useState('password')

    const filter: FilterType = {
        isOnlyDigits: /^\d+$/,
        isOnlyLetters: /^[a-zA-Z]+$/,
        isOnlySymbols: /^[^\w\d]+$/,
        isOnlyLettersAndSymbols: /^[^\s]+$/,
        isOnlyLettersAndDigits: /^[a-zA-Z0-9]+$/,
        isOnlyDigitsAndSymbols: /^[0-9!_\/@#§$%^&*=±()-{}[\]<>~`'"\\|.]+$/,
        isDigitsLettersSymbols: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).*$/,
        isEasyPassword: (password: string) => {
            return filter.isOnlyLetters.test(password) || filter.isOnlyDigits.test(password) || filter.isOnlySymbols.test(password)
        },
        isMediumPassword: (password) => {
            return filter.isOnlyLettersAndDigits.test(password) || filter.isOnlyLettersAndSymbols.test(password) || filter.isOnlyDigitsAndSymbols.test(password)
        },
        isHardPassword: (password: string) => {
            return filter.isDigitsLettersSymbols.test(password);
        }
    };

    const status: StatusType = {
        default: () => setStrengthSections({
            section1: 'grey',
            section2: 'grey',
            section3: 'grey'
        }),
        easy: () => setStrengthSections({
            section1: 'red',
            section2: 'grey',
            section3: 'grey'
        }),
        hard: () => setStrengthSections({
            section1: 'green',
            section2: 'green',
            section3: 'green'
        }),
        medium: () => setStrengthSections({
            section1: 'yellow',
            section2: 'yellow',
            section3: 'grey'
        }),
        error: () => setStrengthSections({
            section1: 'red',
            section2: 'red',
            section3: 'red'
        })
    };

    const checkStrength = (password: string, filter: FilterType, status: StatusType) => {

        if (!password) {
            status.default();
            return setPasswordLabel('enter password');
        }

        if (password.length < 8) {
            status.error();
            return setPasswordLabel('need more 8 characters');
        }

        if (filter.isEasyPassword(password)) {
            status.easy();
            setPasswordLabel('easy password');
            return;
        }

        if (filter.isHardPassword(password)) {
            status.hard();
            setPasswordLabel('hard password');
            return;
        }

        if (filter.isMediumPassword(password)) {
            status.medium();
            setPasswordLabel('medium password');
            return;
        }
    }

    useEffect(() => {
        checkStrength(password, filter, status)
    }, [password])

    return (
        <div className={'pass'}>
            <TextField
                id="password"
                label={passwordLabel}
                variant="outlined"
                type={"password"}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value={password}
                margin="normal"
                style={{width: '200px'}}
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