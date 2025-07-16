API-KEY: sk-rvapkonimrarwjzkpdiwiiqhghmvdlraemixvkfvtnjftqcs

```JavaScript
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"deepseek-ai/DeepSeek-R1-0528-Qwen3-8B","messages":[{"role":"user","content":"What opportunities and challenges will the Chinese large model industry face in 2025?"}]}'
};

fetch('https://api.siliconflow.cn/v1/chat/completions', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

```200
{
  "id": "<string>",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "<string>",
        "reasoning_content": "<string>",
        "tool_calls": [
          {
            "id": "<string>",
            "type": "function",
            "function": {
              "name": "<string>",
              "arguments": "<string>"
            }
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 123,
    "total_tokens": 123
  },
  "created": 123,
  "model": "<string>",
  "object": "chat.completion"
}
```



