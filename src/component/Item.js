import { useState } from 'react';
import { deleteItem, editItem } from '../util/localstorage';

const Item = ({ data, trigger }) => {
    const [classname, setClassname] = useState('img-hidden');
    const [isChecked, setIsChecked] = useState(false);
    const [editState, setEditState] = useState(data.task);
    const [isEdit, setIsEdit] = useState(false);
    const { flag, setFlag } = trigger;

    const deleteHandle = (id) => {
        deleteItem(id);
        setFlag(flag+1);
    }

    const editHandle = (id) => {        
        editItem(id, editState);
        setFlag(flag+1);
        setIsEdit(false);
    }

    return (
        <li 
            className="item" 
            id={data.uid} 
            onMouseOver={() => setClassname('display-block')}
            onMouseLeave={() => setClassname('img-hidden')}
        >
            <div className="task">
                <input type="checkbox" onChange={e => setIsChecked(e.target.checked)} />                
                {
                    isEdit
                    ?
                        <>
                            <input 
                                id="editTask" 
                                type="text" 
                                value={editState} 
                                onChange={e => setEditState(e.target.value)}        
                            />
                            <button 
                                type="button"
                                id="editBtn"
                                onClick={()=>editHandle(data.uid)}
                            >Set</button>
                        </>
                    :   <h4 className={isChecked ? 'font-strike' : 'no-strike'}> { data.task } </h4>                    
                }                
            </div>
            
            <div className="options">
                <img 
                    className={isEdit ? "img-hidden" :classname} 
                    src="edit.svg" 
                    alt="edit-img" 
                    title="edit"
                    onClick={ () => setIsEdit(true) }
                    />
                <img 
                    className={isEdit ? "img-hidden" :classname} 
                    src="trash.svg" 
                    alt="del-img" 
                    title="delete"
                    onClick={ () => deleteHandle(data.uid) }
                />
            </div>
        </li>
    )
}

export default Item
