import { Alert } from "react-native";

export async function postRequest(url, data) {
  console.log("post Request", url, data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  console.log("post Request res", response, json);

  if (json.error_code == 0) {
    return json;
  } else {
    let { message } = json;
    Alert.alert(message.toString());
    throw message;
  }
}

export async function getRequest(url, id) {
  console.log("get Request", url);
  getUrl = id ? url + `?id=${id}` : url;
  const response = await fetch(getUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.token}`,
    },
  });
  const json = await response.json();

  console.log("get Request res", response, json);
  if (json.error_code == 0) {
    return json;
  } else {
    let { message } = json;
    Alert.alert(message.toString());
    throw new Error(message);
  }
}
