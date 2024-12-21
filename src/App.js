// 最原始的一版写法，祖孙组件间的数据通过祖传父，父传孙的方式实现

import './App.css'
import { useState } from 'react'

function Todo({ todoObj, delItem, editItem, changeItem, updateItem }) {
  return (
    <div className='todo-container'>
      <input type='checkbox' onChange={() => { changeItem(todoObj) }}></input>
      <span className='todo-content'>{!todoObj.isEdit && todoObj.content}</span>
      {/* input标签中没有onChange事件，react把这里的内容变成了只读，导致后续的updateItem函数无法执行，跟Vue相比，这是一个很大的不同之处 */}
      {todoObj.isEdit && <input value={todoObj.content} onBlur={(e) => { updateItem(todoObj, e) }} />}
      <button className='editBtn' onClick={() => { editItem(todoObj) }}>编辑</button>
      <button className='delBtn' onClick={() => { delItem(todoObj) }}>删除</button>
    </div>
  )
}


function TodoList({ itemList, delItem, editItem, changeItem, updateItem }) {
  const renderList = itemList.map(item => <li key={item.uid}>
    <Todo todoObj={item} delItem={delItem} editItem={editItem} changeItem={changeItem} updateItem={updateItem} />
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
        isDone: false,
        isEdit: false
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
  const editItem = (todoObj) => {
    setItemList(itemList.map(item => {
      if (item.uid === todoObj.uid) { item.isEdit = !item.isEdit }
      return item
    }))
  }
  const updateItem = (todoObj, e) => {
    setItemList(itemList.map(item => {
      if (item.uid === todoObj.uid) {
        item.content = e.target.value
        item.isEdit = !item.isEdit
      }
      return item
    }))
  }
  // 修改数组中一个对象的属性，刚开始还是有点小难度的🤣
  const changeItem = (todoObj) => {
    setItemList(itemList.map(item => {
      if (item.uid === todoObj.uid) { item.isDone = !item.isDone }
      return item
    }))
  }
  return (
    <div className="App">
      <Input addItem={addItem} />
      <TodoList itemList={itemList} delItem={delItem} editItem={editItem} changeItem={changeItem} updateItem={updateItem} />
      <Footer itemList={itemList} />
    </div>
  );
}


export default App;