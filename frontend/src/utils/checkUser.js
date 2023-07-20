const getUser = async () => {
  await axios(`http://localhost:8000/get-user/1/`);
};
