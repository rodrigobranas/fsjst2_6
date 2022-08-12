import axios from "axios";

async function run () {
	const response = await axios({
		url: "http://localhost:3002",
		method: "post",
		data: {
			query: `
				mutation ($card: CardInput) {
					saveCard (card: $card) {
					idCard
					title
					estimative
					}
			  	}
			`,
			variables: {
				card: {
					idColumn: 1,
					title: "Atividade 10",
					estimative: 3
				}
			}
		}
	});
	const card = response.data;
	console.log(card);
}

run();