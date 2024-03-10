import React, { useRef, useState } from "react";
import "./scss/reset.scss";
import "./scss/style.scss";
import axios from "axios";

function App() {
	const [fact, setFact] = useState("Random fact:");
	const [error, setError] = useState(false);
	const [name, setName] = useState("");
	const [typeName, setTypeName] = useState("");
	const [wasName, setWasName] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [names, setNames] = useState<string[]>([]);

	const getFact = async () => {
		try {
			const { data } = await axios.get("https://catfact.ninja/fact");
			setFact(data.fact);
		} catch (err) {
			setError(true);
			getError(setError);
		}
	};

	const getAge = async (e: React.FormEvent, name: string) => {
		e.preventDefault();
		try {
			if (!names.includes(name) && typeName !== "") {
				const { data } = await axios.get(
					`https://api.agify.io?name=${name}`
				);
				setName(data.age);
				setNames([...names, name]);
				console.log(names);
			} else if (names.includes(name)) {
				getError(setWasName);
			}
		} catch (error) {
			setError(true);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getError = (func: any) => {
		func(true);
		setTimeout(() => {
			func(false);
		}, 3000);
	};
	return (
		<>
			<div className="main">
				<h1>Test Vk Application</h1>
				<div className="block">
					<input ref={inputRef} type="text" value={fact} />
					<button onClick={getFact}>Get fact</button>
				</div>
				{error && <h3>Something went wrong...</h3>}
				<div className="block">
					<form
						onSubmit={(e) => getAge(e, typeName)}
						className="form">
						<input
							type="text"
							placeholder="Type your name"
							value={typeName}
							onChange={(e) => setTypeName(e.target.value)}
						/>
						<button type="submit">Send</button>
						<div style={{ marginTop: "1rem" }}>
							Your age is: {name}
						</div>
						{wasName && (
							<p style={{ color: "red" }}>
								That name was typed before! Don't use it again.
							</p>
						)}
					</form>
				</div>
			</div>
		</>
	);
}

export default App;
