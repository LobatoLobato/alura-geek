const api = {
	get: async function <T>(url: string): Promise<T> {
		const response = await fetch(url);
		return response.json();
	},
	post: async function (url: string, body: unknown) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return response.body;
	},
	delete: async function (url: string) {
		const response = await fetch(url, { method: "DELETE" });
		return response.json();
	},
	address: "http://192.168.0.27:3000",
};
export default api;
