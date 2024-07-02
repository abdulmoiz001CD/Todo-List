import React, { useState, useEffect} from 'react';
import "./style.css";


const getItems = () => {
  const list = localStorage.getItem("todolocalStorage")

  if (list) {
    return JSON.parse(list);
  } else {
    return []

  }


}




const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItemData] = useState(getItems());
  const [EditItem, SetEditItem] = useState();
  const [toggleItem, settoggleItem] = useState(false);

  const updatedValue = {
    id: new Date().getTime().toString(),
    name: inputData,

  }







  const addItem = () => {
    if (!inputData) {
      alert("Please first Fill it")
    } else if (inputData && toggleItem) {
      setItemData(item.map((CurItem) => {
        if(CurItem.id === EditItem){
          return { ...CurItem, name: inputData };
        }
       
        return CurItem;
      }));

      setInputData("");
      SetEditItem(null)
      settoggleItem(false);
    }
    else {
     const newItem = {
       id: new Date().getTime().toString(),
       name: inputData,
       };
      setItemData([...item, newItem])
      setInputData("")
    }
  }


  const deleteItem = (index) => {

    const upDatdItem = item.filter((cur) => {
      return (
        cur.id !== index)
    })

    setItemData(upDatdItem);
  }






  const removerList = () => {

    return setItemData([])
  }


  const editItem = (index) => {
    const itemToEdit = item.find((CurElm) => {
      return CurElm.id === index
    })

    SetEditItem(index);
    setInputData(itemToEdit.name);
    settoggleItem(true);
  }






  useEffect(() => {
    localStorage.setItem("todolocalStorage", JSON.stringify(item))
  }, [item])



  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleItem ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>)
              : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}

          </div>
          {/* show our items  */}
          <div className="showItems">
            {item.map((CurElm) => {
              return (
                <div className="eachItem" key={CurElm.id}>

                  <h3>{CurElm.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn" onClick={()=>editItem(CurElm.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn" onClick={() => deleteItem(CurElm.id)}
                    ></i>
                  </div>
                </div>
              )
            })}





          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All" onClick={() => removerList()}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );


}

export default TodoList
















