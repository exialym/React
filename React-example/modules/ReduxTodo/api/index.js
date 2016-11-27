import fetch from 'isomorphic-fetch';
export const fetchTodos = (filter) => {
  try {
    //express后台中需要建立'/articles'路由，来处理请求数据
    return fetch('/db/articles')
      .then(res => res.json())
      .then((res) => {
        switch (filter) {
          case 'SHOW_ALL':
            return res;
          case 'SHOW_ACTIVE':
            return res.filter(t=>!t.completed);
          case 'SHOW_COMPLETED':
            return res.filter(t=>t.completed);
          default:
            return new Error(`Unknown filter:${filter}.`);
        }
      });
  } catch (err) {
    console.log(err);
  }
};
export const addTodo = (text) => {
  try {
    return fetch('/db/articles/add/' + text).then((res) => {
      //res.json()返回的是promise对象
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
};
export const toggleTodo = (id) => {
  try {
    return fetch('/db/articles/toggle/' + id).then((res) => {
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
};
export const removeTodo = (id) => {
  try {
    console.log('remove api')
    return fetch('/db/articles/remove/' + id).then((res) => {
      return res.json();
    });
  } catch (err) {
    console.log(err);
  }
};