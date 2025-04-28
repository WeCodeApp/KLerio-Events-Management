export const postUserData = async (url: string, data: any) => {
  try {
    const option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, option);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Creating User", error);
  }
};

export const getUserData = async () => {
  try {
    const rawResponse = await fetch("http://localhost:3000/users");
    if (!rawResponse.ok) {
      throw new Error(`Response status: ${rawResponse.status}`);
    }

    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
