export const loadState = () => {
  try {
    //localStorage.removeItem('state');
    const serializedState = localStorage.getItem('state');
    if (serializedState === null)
      return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    //Redux要求state是可以序列化的对象
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState);
  } catch (err) {

  }
};