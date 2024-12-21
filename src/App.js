import './App.css'
import { useState } from 'react'

function Todo({ todoObj, delItem, editItem, changeItem }) {
  return (
    <div className='todo-container'>
      <input type='checkbox' onChange={() => { changeItem(todoObj) }}></input>
      <span className='todo-content'>{todoObj.content}</span>
      <button className='editBtn' onClick={() => { editItem(todoObj) }}>编辑</button>
      <button className='delBtn' onClick={() => { delItem(todoObj) }}>删除</button>
    </div>
  )
}

function TodoList({ itemList, delItem, editItem, changeItem }) {
  const renderList = itemList.map(item => <li key={item.uid}>
    <Todo todoObj={item} delItem={delItem} editItem={editItem} changeItem={changeItem} />
  </li>)
  return <ul>{renderList}</ul>
}


function Input({ addItem }) {
  const handleEnter = (e) => {
    if (e.target.value === '') { alert('输入不能为空') }
    if (e.key === 'Enter' && e.target.value !== '') {
      // console.log(e)
      const todoObj = {
        uid: crypto.randomUUID(),
        content: e.target.value,
        isDone: false
      }
      // 包装好todo对象后，添加进父组件中维护的数组
      addItem(todoObj)
      e.target.value = ''
    }
  }
  return (
    <input placeholder='输入todo' onKeyUp={handleEnter} />
  )
}

function Footer({ itemList }) {
  const totalLength = itemList.length
  const isDoneLength = itemList.filter(item => item.isDone === true).length
  return (
    <div>
      <input type='checkbox'></input>
      <span>已完成：{isDoneLength}/ 总计：{totalLength}</span>
    </div>)
}

function App() {
  // itemList 是公共数组，需要被多个组件使用
  const [itemList, setItemList] = useState([])
  // 更新用户的 todo 数组
  const addItem = (todoObj) => {
    setItemList([...itemList, todoObj])
  }

  const delItem = (todoObj) => {
    setItemList(itemList.filter(item => item.uid !== todoObj.uid))
  }

  const editItem = (todoObj) => { console.log(todoObj) }

  const changeItem = (todoObj) => { console.log(todoObj) }

  return (
    <div className="App">
      <Input addItem={addItem} />
      <TodoList itemList={itemList} delItem={delItem} editItem={editItem} changeItem={changeItem} />
      <Footer itemList={itemList} />
    </div>
  );
}

export default App;