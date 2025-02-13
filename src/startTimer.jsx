const startTimer = async (url) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      method: "POST",
      header: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to update time: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.log("Error in startTimer:", error);
    return { data: null, error: error.message };
  }
};

export default startTimer;
