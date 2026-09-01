---
url: "https://docs.glean.com/tools/glean/wait-for-user-input"
canonical: "https://docs.glean.com/tools/glean/wait-for-user-input"
title: "Wait for user input"
description: "Pause agent execution to collect real-time user input or confirmation."
fetched_at: "2026-09-01T13:30:07.745Z"
---
On this page

### Overview[​](#overview "Direct link to Overview")

Glean’s Wait for user input tool allows agents to pause execution at any point to collect information or confirmation directly from a user. This makes it possible to build workflows that incorporate real-time human interaction, unlocking new use cases that require critical gating or decision points.

This feature is designed for agent creators and users who need their automated workflows to depend on live or asynchronous human input. For now, it is only available to run manually in the Glean app. Agents using this tool cannot be scheduled, published to Slack, used through MCP, or Glean’s APIs.

### Usage Example[​](#usage-example "Direct link to Usage Example")

The Wait for user input tool is invaluable in workflows where automation must be stopped for human input, such as:

-   A time off request agent that asks users for the dates they plan to be absent
    
-   A sales coaching agent that extracts the name of an account executive from a transcript and asks the user to confirm that it has made the correct choice
    

### Configuration[​](#configuration "Direct link to Configuration")

The **Wait for user input** step can be inserted into any part of the agent graph. When configuring the **Wait for user input** step, you set a natural language goal that describes what the agent should ask the user. You can also specify whether the questions are optional or mandatory in the instructions.

#### Writing effective goals[​](#writing-effective-goals "Direct link to Writing effective goals")

The goal determines how the agent interacts with the user and when the step marks itself as complete. Keep these guidelines in mind:

-   Keep the goal focused: A **Wait for user input** step works best when it collects one straightforward answer or a small set of closely related inputs, such as a start date and end date. Avoid goals that also try to handle branching decisions, unrelated follow-up questions, or decision logic about what should happen next.
-   Be specific about what counts as a valid answer: For example, "Ask the user for their preferred start date in YYYY-MM-DD format" is clearer than "Get the date from the user."
-   Use multiple Wait for user input steps when the conversation needs to happen in stages: If you need to gather unrelated information or ask different follow-up questions depending on the user's response, split that into separate **Wait for user input** steps.

#### Yes/no confirmation pattern[​](#yesno-confirmation-pattern "Direct link to Yes/no confirmation pattern")

To ask the user a yes-or-no question and take different actions based on their reply:

1.  Add a **Wait for user input** step with a simple goal, such as "Ask the user whether they want to proceed. Accept yes or no."
2.  Immediately after, add a **Branch** step that evaluates the user's reply and routes to the appropriate path.

This two-step pattern keeps the **Wait for user input** goal simple and uses the **Branch** step for conditional logic, which is more reliable than embedding decision making in the goal itself.

### How It Works[​](#how-it-works "Direct link to How It Works")

#### Agent Builder Experience[​](#agent-builder-experience "Direct link to Agent Builder Experience")

Use the Agent Builder to add a **Wait for user input** step anywhere in your flow and define exactly what the agent needs from the user.

1.  **Insert a Wait for user input step**: Add it at the point where downstream steps depend on user input or a decision.
    
2.  **Write the goal**: Describe in natural language what the agent should ask a user for, including constraints and examples the agent can validate against.
    
    ```
    Prompt the user to enter their PTO start date and end date. Validate the following conditions:    - The start date must be after today's date.- The end date must be after today's date.- The start date must be earlier than the end date.
    ```
    
3.  **Configure input expectations**: Specify the fields or information the agent must collect (e.g., date ranges, IDs, or approvals). The agent may ask clarifying questions until the inputs are valid.
    
    ```
    When requesting or interpreting date inputs, ensure both dates explicitly include the day, month, and year, formatted as "YYYY-MM-DD" (e.g., "2025-09-10"). If a user refers to a date using relative qualifiers (such as "next Friday" or "the week of Thanksgiving"), convert these references into specific dates and clearly present them for user confirmation. For example, respond with:  "Did you mean '2025-09-12' when you said 'next Friday'?" Always ask the user to confirm the interpreted date to avoid ambiguity.`  
    ```
    
4.  **Connect downstream usage**: Map collected values to later steps (e.g., filling tool parameters, branching decisions, or guards). You may reference the input fields collected using a similar natural language you used in the **Wait for user input** step.
    
    ```
    Downstream “Workday: Request Time Off” step Instructions: File a PTO request based on start date and end date.
    ```
    
5.  **Test your agent**: Run the agent in preview mode to ensure it works as intended, providing clear interactions that validate correctly.
    

#### Choose a memory setting[​](#choose-a-memory-setting "Direct link to Choose a memory setting")

The **Manage memory** setting controls how much prior context a Wait for user input step accesses. Select an option based on your step's requirements:

-   **All previous steps (default):** Select this when the step needs to reference data from multiple earlier steps, such as form fields or branching conditions.
-   **Only immediate previous step:** Select this when the step receives a short reply (such as "yes" or "no") and earlier steps output large amounts of data (such as a **Read document** step). Excessive context can cause the agent to misinterpret brief responses or return generic errors. Restricting memory to the prior step ensures reliable parsing.

tip

Start with the default setting. If the agent returns unexpected errors or fails to recognize valid input, switch the step to **Only immediate previous step**.

#### End User Experience[​](#end-user-experience "Direct link to End User Experience")

-   When the flow reaches the **Wait for user input** step, execution pauses and the user is prompted for input (message or form), with follow-up clarifications as needed.
-   Agents cannot be cancelled while they are waiting for user input.
-   Conversation is continuous—all prompts and responses remain in the same chat thread for context.

## FAQ[​](#faq "Direct link to FAQ")

### Can I use the Wait for user input step in scheduled agents?

No. The step requires live user input, so it cannot be used in scheduled agents.

### Can I use the wait for user input step in agents accessed through Slack, MCP, or Glean's APIs?

No. The step is only available through the Glean web app at this point.

### Is there a time limit for how long the agent waits for user input?

Yes. The agent will wait up to 30 days, aligning with conversation history retention. If chat history is disabled, the window is reduced to 2 hours.

### What happens if I update the agent or its tools while it is waiting for input?

The workflow will gracefully stop, inform the user of the error, and require a restart from the beginning.

### Can agents ask multiple clarifying questions?

Yes. The **Wait for user input** step supports dialogue loops.

### Why doesn't the step complete after the user responds?

The step completes only when it determines that the goal has been satisfied. If the goal mixes input collection with branching logic, unrelated follow-up requirements, or decision logic about what should happen next, the agent may continue asking clarifying questions instead of advancing.

Keep the goal focused on collecting the answer, then handle routing in a **Branch** step. For a common example, see **Yes/no confirmation pattern** above.

### The agent returns 'Unable to analyse goal, please try again!' — what should I do?

This message appears when the agent cannot parse the user's reply within the available context. It most often happens when earlier steps (such as **Read document**) add large outputs to memory. To fix this, open the Wait for user input step's menu, select **Manage memory**, and choose **Only immediate previous step**. Also keep the goal text concise — describe only what the step should collect.

### Can the Wait for user input step take file uploads as input?

No. File uploads are not currently supported.
