


const dotEnv = require("dotenv");

dotEnv.config();

async function searchWeb(userInput) {

    const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api_key: process.env.TAVILY_API_KEY,
            query: userInput,
            max_results: 3
        })
    });

    const data = await response.json();

    return data;   // IMPORTANT
}

module.exports = searchWeb;