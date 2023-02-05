const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: (data) => {


				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(data);

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
					.then(response => { if (response.ok == true) alert("Usuario creado con éxito") })
					.then(window.location.href = process.env.BASENAME)
					.catch(error => console.log('error', error));
			},
			login: (data) => {


				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(data);

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/token", requestOptions)
					.then(response => {
						if (response.ok == true) {
							alert("Usuario logueado con éxito")
							return response.json()
						}
					})
					.then(result => sessionStorage.setItem("token", result.token))
					.then(res => window.location.href = process.env.BASENAME + "private")
					.catch(error => console.log('error', error));


			},
			logout: () => {
				sessionStorage.removeItem("token")
				window.location.href = process.env.BASENAME

			}
		}
	};
};

export default getState;
