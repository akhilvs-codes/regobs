
const OpenAI = require("openai");
const { get_employee_info, create_support_ticket } = require("./functions");
const dotEnv = require("dotenv")
const searchWeb = require("./searchWeb")

dotEnv.config()



const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function runAgent(userInput) {
    const searchResults = await searchWeb(userInput);

    const context = searchResults.results
        .map(r => r.content)
        .join("\n\n");



    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `Use this tool when the user asks about employee details such as name, role, department, or information about a specific employee.: ${context }`
            },
            {
                role: "user",
                content: userInput
            }
        ]
        ,           //user and system

        tools: [
            {
                type: "function",
                function: {
                    name: "get_employee_info",
                    description: "Get employee details",
                    parameters: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "Employee name",
                            },
                        },
                        required: ["name"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "create_support_ticket",
                    description: "Create support ticket when My laptop is not working",
                    parameters: {
                        type: "object",
                        properties: {
                            issue: {
                                type: "string",
                                description: "Problem description",
                            },
                        },
                        required: ["issue"],
                    },
                },
            },
        ],
    });

    const message = response.choices[0].message;

    // console.log(response.choices[0]);


    if (message.tool_calls) {
        const tool = message.tool_calls[0];

        const args = JSON.parse(tool.function.arguments);

        if (tool.function.name === "get_employee_info") {
 
            return get_employee_info(args.name);
        }

        if (tool.function.name === "create_support_ticket") {
            return create_support_ticket(args.issue);
        }
    }

    return message.content;
}


module.exports = runAgent;