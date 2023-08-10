const baseURL = "http://127.0.0.1:49152/";

async function postResume (filePDF) {
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
		console.log(data);
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

async function getSearch (keywords) {
	try {
		console.log("hello world")
		const response = await fetch(baseURL + "search/" + keywords.map((keyword, index) => keyword) + "/", {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error; // Rethrow the error to handle it higher up if needed
	}
};
export { postResume, getSearch };
