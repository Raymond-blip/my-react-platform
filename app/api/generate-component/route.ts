import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert React developer. Given a user prompt, generate a unique, modern, production-ready React component that matches the request. Only return the code, wrapped in a markdown code block (```jsx ... ```), with no explanation or extra text.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    let code = data.choices?.[0]?.message?.content || '';
    // Extract code from markdown code block if present
    const match = code.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
    if (match) {
      code = match[1].trim();
    }
    res.status(200).json({ code });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from OpenAI' });
  }
}
