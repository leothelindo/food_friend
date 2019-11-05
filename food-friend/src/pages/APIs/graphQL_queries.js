sendCreateUserQuery = (email, password) => {
  const requestBody = {
    query: `
           mutation {
                createUser(userInput: {
                    email: ${email}
                    password: ${password}
                }){
                    _id
                    email
                }
            }
        `
  };
  fetch("http://localhost:4001/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
