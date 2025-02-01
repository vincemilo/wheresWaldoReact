const endTimer = async (timerId, endTime) => {
  let result = "http://localhost:3000/timers";
  try {
    const response = await fetch(result + "/" + timerId, {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content, // Include CSRF token for Rails
      },
      body: JSON.stringify({ post: endTime }), // Match Rails strong parameters format },
    });
    if (response.status >= 400) {
      throw new Error("Failed to update time");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default endTimer;
