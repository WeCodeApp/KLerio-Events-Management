export type CreateEventType = {
  id?: string;
  eventName: string;
  eventDescription: string;
  participants: string[];
  eventDate: string;
};

const URL = "http://localhost:3000/events";

export const getEventData = async () => {
  try {
    const rawResponse = await fetch("http://localhost:3000/events");
    if (!rawResponse.ok) {
      throw new Error(`Response status: ${rawResponse.status}`);
    }

    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getEventById = async (id: string) => {
  try {
    const rawResponse = await fetch(`http://localhost:3000/events/${id}`);
    if (!rawResponse.ok) {
      throw new Error(`Response status: ${rawResponse.status}`);
    }

    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postEventData = async (data: CreateEventType) => {
  try {
    const option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(URL, option);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Creating Event", error);
  }
};

export const patchEventData = async (data: CreateEventType) => {
  try {
    const option = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(URL, option);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Updating Event", error);
  }
};

export const deleteEventData = async (id: string | undefined) => {
  try {
    const rawResponse = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });
    if (!rawResponse.ok) {
      throw new Error(`Response status: ${rawResponse.status}`);
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};
