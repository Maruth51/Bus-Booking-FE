export const getResults = async query => {
  try {
    const response = await fetch(`https://9xsqm.sse.codesandbox.io/${query}`, {
      method: "GET",
      mode: "cors"
    });
    return await response.json();
  } catch (e) {
    return e;
  }
};

export const searchBus = async (from, to, date) => {
  try {
    const url = new URL("https://9xsqm.sse.codesandbox.io/bus/search");
    const params = {
      from,
      to,
      date
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      mode: "cors"
    });
    console.log(response.ok);
    if (response.ok) {
      return await response.json();
    } else throw Error;
  } catch (e) {
    return e;
  }
};
