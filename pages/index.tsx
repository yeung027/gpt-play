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

      <div className="flex flex-1 flex-col p-8">
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-4">
            <li>
              <div className="flex items-center space-x-4">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/64"
                  alt="User profile picture"
                />
                <div>
                  <p className="font-bold">John Doe</p>
                  <p>Hello!</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-4">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/64"
                  alt="User profile picture"
                />
                <div>
                  <p className="font-bold">Jane Doe</p>
                  <p>Hi there!</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 py-4">
          <input
            type="text"
            className="flex-1 border-gray-400 border-2 py-2 px-4 rounded-lg"
            placeholder="Type your message..."
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Send
          </button>
        </div>
      </div>
  );
};

export default Home;