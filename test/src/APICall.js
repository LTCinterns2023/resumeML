const baseURL = "http://127.0.0.1:49152/";

const postResume = async (filePDF) => {
	let formData = new FormData();
	formData.append("pdf", filePDF);
  
	try {
	  const response = await fetch(baseURL + "resume/", {
		method: "POST",
		body: formData,
	  });
  
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
  
	  const data = await response.json();
	  console.log(data); // Log the response data
  
	  return data; // Return the data from the response
	} catch (error) {
	  console.error("Fetch error:", error);
	  throw error; // Rethrow the error to handle it higher up if needed
	}
  };
  
  export default postResume;
  