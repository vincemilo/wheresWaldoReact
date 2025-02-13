const endTimer = async (url, timerId) => {
  try {
    const response = await fetch(`${url}/${timerId}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to update time: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.log("Error in endTimer:", error);
    return { data: null, error: error.message };
  }
};

export default endTimer;
