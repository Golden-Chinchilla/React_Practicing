import './App.css'
import { useState } from 'react'
import { Button, DatePicker } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

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
            <button onClick={getInfo}>获取 tokenAddress</button><br />
            <Button type="primary">PRESS ME</Button><br />
            <DatePicker placeholder="select date" /><br />
            <SmileOutlined />
        </div>

    )
}

export default App;