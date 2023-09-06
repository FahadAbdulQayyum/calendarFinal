React, useContext, useState and Fragment imported from react.
import React, { useContext, useState, Fragment } from 'react'
// GlobalContext file imported from GlobalContext file
import GlobalContext from './components/customContext/GlobalContext'

// Modal function starts here
const Modal = () => {
    const { addData, setModalShow, info } = useContext(GlobalContext);
    const [title, setTitle] = useState()
    const [color, setColor] = useState()

    const dataFunc = e => {
        e.preventDefault();
        // addData({title,color})
        addData([title, color])
        // addData(title)
        setModalShow(false)
    }

    return (
        <form onSubmit={dataFunc}>
            <div className='absolute'>
                <span onClick={() => setModalShow(false)}>X</span>
                <h2>{(info.start).toString().slice(0, 3)}{', '}{(info.start).toString().slice(4, 15)}</h2>
                <input placeholder={'Enter title'} required onChange={e => setTitle(e?.target?.value)} />
                <select onChange={e => setColor(e?.target?.value)}>
                    <option defaultChecked value={'black'}>Select your label (Black)</option>
                    <option value={'red'}>Red</option>
                    <option value={'blue'}>Blue</option>
                    <option value={'grey'}>Grey</option>
                    <option value={'orange'}>Orange</option>
                </select>
                <button>Save</button>
            </div>
        </form>
    )
}

export default Modal
