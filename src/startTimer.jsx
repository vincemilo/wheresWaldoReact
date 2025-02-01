const startTimer = async (setTimerId) => {
  let result = "http://localhost:3000/timers";
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
    setTimerId(data.timer_id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default startTimer;
