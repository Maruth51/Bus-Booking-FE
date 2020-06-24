export function userLogin(email, pwd) {
  const url = "https://api-busbook.herokuapp.com/user/login";
  const data = {
    email,
    pwd
  };
  const config = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  };
  return new Promise((resole, reject) => {
    fetch(url, config)
      .then(response => {
        return response.ok ? response.json() : "error on network";
      })
      .then(res => {
        resole(res);
      })
      .catch(err => {
        console.log("error", err);
        reject("Internal Server Error");
      });
  });
}

export const userRegister = async user => {
  try {
    const config = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(user)
    };
    const response = await fetch(
      "https://api-busbook.herokuapp.com/user/register",
      config
    );
    if (response.ok) {
      return response.json();
    } else {
      throw Error("response failed");
    }
  } catch (err) {
    console.log(err);
  }
};
