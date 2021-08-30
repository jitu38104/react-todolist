const key = 'todoList';

const getItem = () => {
    return new Promise((resolve, reject) => {
        const strObj = window.localStorage.getItem(key);
        resolve(JSON.parse(strObj));
    });
}

const setItem = (value) => {
    getItem().then(res => {
        res.push(value);
        window.localStorage.setItem(key, JSON.stringify(res));
    }).catch(err => console.error(err));
}

const editItem = (id, value) => {
    getItem().then(res => {
        res.forEach((item, index) => {
            if(item.uid === id) res[index].task = value;
        });
        window.localStorage.setItem(key, JSON.stringify(res));
    })
}

const deleteItem = (id) => {
    getItem().then(res => {
        const newData = res.filter(item => {
            return item.uid !== id;
        });
        window.localStorage.setItem(key, JSON.stringify(newData));
    }).catch(err => console.error(err));
}

export {getItem, setItem, editItem, deleteItem};