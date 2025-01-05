// 通过 fetch 获取数据

import './App.css'
import { useState } from 'react'


function App() {
    const [tokenAddressList, setTokenAddressList] = useState([])

    // 返回值：[{}, {}, {}]
    const getInfo = () => {
        fetch('https://api.dexscreener.com/token-profiles/latest/v1')
            .then(response => response.json())
            .then(data => {
                setTokenAddressList(data.map(item => <li key={item.tokenAddress}>{item.tokenAddress}</li>))
            })
            .catch(err => alert(err))
    }

    return (
        <div className="App">
            <ul>{tokenAddressList}</ul>
            <button onClick={getInfo}>获取 tokenAddress</button>
        </div>

    )
}

export default App;