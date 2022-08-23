import React, { createContext, useState } from 'react';

export const LocalContext = createContext({});

export const LocalProvider = (props) => {
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    return(
        <LocalContext.Provider value={{cidade, setCidade, uf, setUf}}>
            {props.children}
        </LocalContext.Provider>
    )
}

