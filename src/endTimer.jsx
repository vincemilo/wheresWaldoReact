const endTimer = async (url, timerId, setElapsedTime) => {
  let result = url;
  try {
    const response = await fetch(result + "/" + timerId, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 400) {
      throw new Error("Failed to update time");
    }
    const data = await response.json();
    setElapsedTime(data.elapsed_time);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default endTimer;
