import GlobalReducer from './GlobalReducer';
import GlobalContext from './GlobalContext';
import { useReducer, useState } from 'react';

const GlobalState = props => {

    const [info, setInfo] = useState()
    
    const [modalShow, setModalShow] = useState(false)
    const initialState = {
        data: [],
        fun: false
    }

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const addData = (data) => {
        dispatch({ type: 'ADD_DATA', payload: data })
    }
    const setFun = () => {
        dispatch({ type: 'SET_FUN' })
    }
    return <GlobalContext.Provider
        value={{
            dataArr: state.data,
            fun: state.fun,
            addData,
            setFun,
            modalShow,
            setModalShow,
            info,
            setInfo
        }}
    >
        {props.children}
    </GlobalContext.Provider>
}

export default GlobalState;