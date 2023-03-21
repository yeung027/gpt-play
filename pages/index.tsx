import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<string>('');

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setPrompt(value);
        setCompletion('Loading...');
        const response = await fetch('/api/completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue('');
        setCompletion(data.result.choices[0].text);
      }
    }, [value]);

  return (

      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-8">Chatroom</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex items-center mb-4">
            <span className="bg-green-500 rounded-full h-3 w-3 mr-2"></span>
            <p className="text-gray-700 font-medium">John Doe</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="bg-blue-500 rounded-full h-3 w-3 mr-2"></span>
            <p className="text-gray-700 font-medium">Jane Doe</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="bg-red-500 rounded-full h-3 w-3 mr-2"></span>
            <p className="text-gray-700 font-medium">Bob Smith</p>
          </div>

          <form className="flex items-center">
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 mr-4 w-full"
              placeholder="Type your message here..."
            />
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
              Send
            </button>
          </form>
        </div>
    </div>
  );
};

export default Home;