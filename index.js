
const readline = require("readline-sync");

const runAgent=require("./runAgent")




async function main() {
    while (true) {
        const question = readline.question("Ask: ");

        const result = await runAgent(question);

        console.log("Response:", result);
    }
}

main();