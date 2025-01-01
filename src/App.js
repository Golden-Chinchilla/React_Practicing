// 最原始的一版写法，祖孙组件间的数据通过祖传父，父传子的方式实现

import './App.css'
import { useState } from 'react'

function Todo({ todoObj, delItem, editItem, changeItem, updateItem }) {
  return (
    <div className='todo-container'>
      <input type='checkbox' checked={todoObj.isDone} onChange={() => { changeItem(todoObj) }}></input>
      <span className='todo-content'>{!todoObj.isEdit && todoObj.content}</span>
      {/* ⚠️ */}
      {/* 这里如果用 value 属性，那么当编辑的时候，输入框里面时没有相应的，根据报错的提示，如果你要用 value，就需要绑定一个对应的 onChange 函数来处理用户的修改 */}
      {/* 有一个更好的方案，这里用 defaultValue 属性，（defaultValue 是 JavaScript DOM API 提供的属性，而不是 HTML 的原生属性，所以在查 HTML 文档的时候查不到这个属性） */}
      {/* 其中涉及的原理就是React中的受控与非受控组件：使用了 value，那这就是一个受控组件，使用了 defaultValue 拿这就是一个非受控组件 */}
      {todoObj.isEdit && <input className='todo-content' autoFocus defaultValue={todoObj.content} onBlur={(e) => { updateItem(todoObj, e) }} />}
      <button className='btn editBtn' onClick={() => { editItem(todoObj) }}>编辑</button>
      <button className='btn delBtn' onClick={() => { delItem(todoObj) }}>删除</button>
    </div>
  )
}


function TodoList({ itemList, delItem, editItem, changeItem, updateItem }) {
  const renderList = itemList.map(item => <li key={item.uid}>
    <Todo
      todoObj={item}
      delItem={delItem}
      editItem={editItem}
      changeItem={changeItem}
      updateItem={updateItem} />
  </li>)
  return <ul className='todoList'>{renderList}</ul>
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
    <input className='user-input' autoFocus placeholder='输入todo' onKeyUp={handleEnter} />
  )
}

// 逻辑参考可： https://www.bilibili.com/video/BV1Zy4y1K7SH/?p=76&share_source=copy_web&vd_source=0aea19ec4b198c37de1af0ea5c5b63fb
function Footer({ itemList, selectAllItems, clearSelectedItems, clearAllItems }) {
  const totalLength = itemList.length
  const isDoneLength = itemList.filter(item => item.isDone === true).length
  // todo项的 isDone 属性全部为 true 时触发（isDone为true的元素个数等于数组长度的时候）
  const allSelected = (itemList.filter(item => item.isDone === true).length === totalLength && totalLength !== 0)
  return (
    <div>
      <input type='checkbox' checked={allSelected} onChange={selectAllItems} />
      <span>已完成：{isDoneLength}/ 总计：{totalLength}</span>
      {/* 至少一个 todo 的 isDone 为 true 时触发，全部todo 的 isDone 为true 时，button消失*/}
      {(!itemList.every(item => item.isDone === false) && !itemList.every(item => item.isDone === true)) && <button onClick={clearSelectedItems}>清除选中的选项</button>}
      {/* 所有 todo 的 isDone 都为 true 的时候触发，同时取消上一个 button */}
      {itemList.every(item => item.isDone === true) && <button onClick={clearAllItems}>清除所有选项</button>}
    </div>)
}


function App() {
  // itemList 是公共数组，需要被多个组件使用
  const [itemList, setItemList] = useState([])
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
  const selectAllItems = () => {
    // 这里存在一个问题，就是状态数据变了
    if (itemList.every(item => item.isDone === true)) {
      setItemList(itemList.map(item => {
        item.isDone = false
        return item
      }))
    } else {
      setItemList(itemList.map(item => {
        item.isDone = true
        return item
      }))
    }
  }
  const clearSelectedItems = () => {
    setItemList(itemList.filter(item => item.isDone === false))
  }
  const clearAllItems = () => {
    setItemList([])
  }

  return (
    <div className="App">
      <Input addItem={addItem} />

      <TodoList
        itemList={itemList}
        delItem={delItem}
        editItem={editItem}
        changeItem={changeItem}
        updateItem={updateItem} />

      <Footer
        itemList={itemList}
        selectAllItems={selectAllItems}
        clearSelectedItems={clearSelectedItems}
        clearAllItems={clearAllItems} />
    </div>
  )
}

export default App;