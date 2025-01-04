// useReducer, useContext 的写法

import './App.css'
import { useReducer, useContext, createContext } from 'react'

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'add':
            return prevState + action.payload
        case 'minus':
            return prevState - action.payload
        default:
            return prevState
    }
}

const MyContext = createContext(null)

function Input(params) {

}


function TodoItem(params) {
    const ctx = useContext(MyContext)
    return (
        <div>
            <button onClick={() => { alert(ctx + 111111) }}>todo组件的button</button>
            <button onClick={() => { alert(ctx + 222222) }}>todo组件的button</button>
            <button onClick={() => { alert(ctx + 333333) }}>todo组件的button</button>
        </div>

    )
}


function TodoList(params) {
    return (
        <div>
            <TodoItem />
            <TodoItem />
            <TodoItem />
        </div>

    )
}


function Bottom(params) {

}


function App() {

    const [state, dispatch] = useReducer(reducer, 123)

    return (
        <MyContext.Provider value='我是一个上下文数据：Context'>
            <div className="App">
                <p>Count: {state}</p>
                <button onClick={() => dispatch({ type: 'add', payload: 10 })}>Click +1</button>
                <button onClick={() => dispatch({ type: 'minus', payload: 10 })}>Click -1</button>
                <hr />
                <TodoList />
            </div>
        </MyContext.Provider>
    )
}

export default App;