export default (initialState: any) => {
  const token = localStorage.getItem('token');

  return {
    isUser: (token && initialState?.userId ? true : false),
  }
}
