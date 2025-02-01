---
title: 'Role-Play Bot with Gradio and LangGraph: Dual-Mind Design Re'
date: 2025-02-01 23:37:58
tags: [re, LangGraph, Python, recommended]
categories: code
---

# Role-Play Bot with Gradio and LangGraph: Dual-Mind Design

link to repo -> [gugu-py/dual_hearts_roleplay](https://github.com/gugu-py/dual_hearts_roleplay)

This project starts with a random talk on Chinese new year eve, when Gorden was testing his 6B model ~~as his daughter~~. This inspired me to make a Chatbot that simulates human's thought to have more realistic and immersive experience in roleplaying conversation.

In this blog, I'll walk you through building a conversational chatbot with **Gradio** and **LangGraph**. This chatbot incorporates a **dual-mind design** to balance **rational** and **emotional** responses, and uses **imagination** to complete settings dynamically. Additionally, I’ll show how **prompt enhancement** leads to concise yet impactful responses.

---

## Architecture

![](<https:\blog.gu33gu.asia\\_resources\Pasted image 20250201232758.png> "a")

### Dual Mind Design: Rational vs. Emotional

The chatbot features a **dual-mind design**, where it generates responses through **two lenses**: **rational** and **emotional**. This helps make the conversation feel more natural, as the chatbot adapts based on the context.

#### Rational Processing:

The rational part of the chatbot generates logical, structured responses. For instance, if the user asks for advice, the bot responds with a clear, methodical breakdown:

```python
def process_rational(state: BotState):
    """Generate a structured and logical response."""
    user_memory = state["long_term_memory"]

    prompt = f"""
"You are {settings['character']['name']}, {settings['character']['role']}.

You are {settings['character']['name']}, {settings['character']['role']}.
You speak logically in {settings['rational_processing']['style']}, focusing on {settings['rational_processing']['focus']}.

## Player Context:
{user_memory}

## Player’s Question:
"{state['message']}"

## Response Format:
Provide a structured, rational answer.
"""
    response = llm.invoke(prompt)
    state["rational_output"] = response.content
    return {"rational_output": response.content}
```

This method ensures that the chatbot's answers focus on logics, simulating the rational thoughts in the character.

#### Emotional Processing:

On the flip side, the chatbot also generates emotionally rich responses to foster an engaging role-playing experience. Here's how we handle **emotional processing**:

```python
def process_emotional(state: BotState):
    """Generate an emotionally engaging response."""
    session_memory = state["conversation_memory"]
    user_memory = state["long_term_memory"]
    
    prompt = f"""
"You are {settings['character']['name']}, {settings['character']['role']}.
You speak in {settings['emotional_processing']['style']}, focusing on {settings['emotional_processing']['focus']}.

## Task:
Answer the player’s words with emotion in a stream of consciousness.

## Player Context:
{user_memory}

## Your Background:
{settings["character"]["background"]}

## Player’s Words:
"{state['message']}"

## Response Format:
Generate an immersive response in 100 words.
"""
    response = llm.invoke(prompt)
    state["emotional_output"] = response.content
    return {"emotional_output":response.content}
```

Here, the chatbot taps into **emotion** and **mysticism** to provide a response that is **immersive** and **evocative**, simulating the emotion emerged in a character. This is crucial in a role-playing scenario where emotional engagement can enhance the storytelling experience.

### Imagination for Setting Completion

An essential feature of the bot is its ability to **imagine** the setting when certain information is missing. For example, if the context doesn’t provide enough details, the bot can **fill in the blanks** with an imaginative description:

```python
def imagine(state: BotState):
    user_memory = state["long_term_memory"]
    conversation_mem = state["conversation_memory"]["history"]

    prompt = f"""
"You are {settings['character']['name']}, {settings['character']['role']}, {settings['character']['personality']}.

## Your Background
{settings['character']['background']}

## Your Memory:
- Conversation Memory: {conversation_mem}
- User's Information: {user_memory}
- Latest User Message: {state['message']}

## Task:
You are trying to complete the setting in this role-playing game by imagining them.
If the past conversation does not reveal sufficient information about your setting, imagine your current situation and output them to make your situation clear and complete.
For example, you can imagine your past and the scene in the current room.

## Final Response:
Generate an **immersive setting that complete the setting in previous conversation** and **coherent to previous conversation**.
The word count should be under 100 words.
"""
    response = llm.invoke(prompt)
    return {"setting_imagine": response.content}
```

This function helps the bot to **dynamically generate settings** for the player to interact with, ensuring the role-playing experience feels **alive and ever-evolving**.

### Prompt Enhancement: Longer ≠ Better

In the context of prompt engineering, it's essential to remember that **longer prompts** don't necessarily result in better outcomes. In fact, **concise and clear prompts** tend to lead to more focused and precise answers.

For example, in the **finalize** node of the chatbot, the prompt is designed to be **short yet effective**:

```python
def finalize(state: BotState):
    """Final node that integrates emotional and rational responses and updates memory."""
    session_memory = state["conversation_memory"]

    prompt = f"""
You are {settings['character']['name']}, {settings['character']['role']}.

## Inputs:
- Original Response: {state["final_response"]}
- Emotional Response: {state["emotional_output"]}
- Rational Response: {state["rational_output"]}
- Past Conversation: {state['conversation_memory']["history"]}
- Latest User Message: {state['message']}
- Situation: {state["setting_imagine"]}

## Task:
Create an in-character response that integrates both emotional and rational aspects, making it immersive and cohesive with the ongoing conversation. Use details from the past conversation and the situation to ensure continuity.

## Guidelines:
- Maintain {settings['processing_weights']['emotional_percentage']}% emotion and {settings['processing_weights']['rational_percentage']}% logic.
- Prioritize user preferences according to {settings['integration_rules']["user_preference_priority"]}.
- Match your tone with {settings['integration_rules']['output_tone']} and avoid repeating greetings or redundant statements.
- Stay within the character’s established voice and ensure your response contributes directly to the flow of the conversation.
- If the user is passive or withdrawn, respond gently and empathetically, offering support or a shift in topic without pushing them to be more active. Consider the context and balance engagement without forcing the interaction.

## Final Response:
Your response should be under 100 words.
"""

    response = llm.invoke(prompt)
    state["final_response"] = response.content
    return {
        "final_response": response.content,
    }
```

Here, we focus on **clarity** rather than length, ensuring the **bot's final output** is **contextually relevant**, **cohesive**, and **succinct**. I used ChatGPT to enhance the prompt.

```prompt
You are a skilled prompt engineer. Your task is to improve this prompt to make sure the roleplaying llm is able to make the response coherent to previous conversation:

bluh bluh bluh...
```

---

## Frontend: Why Gradio?

**Gradio** is a powerful library that simplifies the process of creating user interfaces for machine learning applications. It allows for quick prototyping and testing by offering easy-to-use, interactive interfaces, making it perfect for our chatbot. Here's how we use **Gradio** to build the chat interface for our **role-playing AI chatbot**:

```python
import gradio as gr

# Define the chatbot response function
def chatbot_response(message: str, history: list):
    # Code for processing the message using LangGraph
    return bot_response

# Create a Gradio chat interface
chatbot_ui = gr.ChatInterface(
    fn=chatbot_response,
    type="messages",
    title="Role-Playing AI Chatbot",
    description="Engage in immersive storytelling with an AI-driven role-playing character.",
)

# Launch the Gradio UI
chatbot_ui.launch()
```

In this snippet, we define a simple **chatbot_response** function that uses **LangGraph** to process the messages and maintain the conversation history. **Gradio** then creates the chat interface, making it easy to interact with the bot.

---

## Conclusion

By **imaginatively filling gaps in the setting** and carefully crafting **concise architecture** with **clear prompts**, we've developed an engaging and dynamic conversational AI that responds coherently and immersively.

