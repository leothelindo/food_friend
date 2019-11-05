export async function sendCreateUserQuery(email, password) {
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
  try{
    await fetch("http://localhost:4001", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });
  }catch(err){
      console.log(err)
  }
 
 
};
