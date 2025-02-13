const startTimer = async (url, setTimerId, setStartTime) => {
  let result = url;
  try {
    const response = await fetch(result, {
      mode: "cors",
      method: "POST",
      header: { "Content-Type": "application/json" },
    });
    if (response.status >= 400) {
      throw new Error("server error");
    }
    const data = await response.json();
    setTimerId(data.id);
    setStartTime(new Date() - new Date(data.start_time));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default startTimer;
