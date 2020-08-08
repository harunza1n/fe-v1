import React, { useEffect, useState, useReducer } from 'react'
import { URL } from '../helper/UrlApi'
import axios from 'axios'
import { Table } from 'reactstrap'

const initialState = {
    username: '',
    password: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERNAME':
            return { ...state, username: action.payload }
        case 'PASSWORD':
            return { ...state, password: action.payload }
        default:
            return state
    }
}



function App() {

    const [data, setData] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        axios.get(`${URL}/allusers`)
        .then( response => {
            console.log(response.data)
            setData(response.data)
        })
    }, []);

    const addDataClick = () => {
        let obj = {
            username: state.username,
            password: state.password,
        }
        axios.post(`${URL}/users`, obj)
        .then( response => {
            setData(response.data)
        }).catch(error => {
            console.log(error)
            alert(error.message)
        })
    }

    const deleteDataClick = (id) => {
        axios.delete(`${URL}/users/${id}`)
        .then(response => {
            setData(response.data)
        })
    }

    const renderUser = () => {
        return data.map((val, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.username}</td>
                    <td>{val.password}</td>
                    <td>
                        <button 
                            className='btn btn-primary'
                            // onClick={}
                            >Edit</button>
                        <button 
                            className='btn btn-danger'
                            onClick={() => deleteDataClick(val.id)}
                            >Delete</button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className='mt-5 mx-5'>
            <Table striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUser()}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input 
                                type='text'   
                                placeholder='username' 
                                value={state.username} 
                                onChange={(event) => dispatch({type: 'USERNAME', payload: event.target.value})}
                                />
                        </td>
                        <td>
                            <input 
                                type='text' 
                                placeholder='password' 
                                value={state.passsword}
                                onChange={(event) => dispatch({ type: 'PASSWORD', payload: event.target.value})}
                                />
                        </td>
                        <td>
                            <button 
                                className='btn btn-success'
                                onClick={addDataClick}
                                >

                                    Add</button></td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}

export default App;