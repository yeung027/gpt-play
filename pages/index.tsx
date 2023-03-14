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
        const response = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue('');
        // setCompletion(data.result.choices[0].text);
        setCompletion(data.result_image.data[0].url);
      }
    }, [value]);

  return (
    <div className={styles.main}>
      <div>Please type your prompt</div>
      <input value={value} onChange={handleInput} onKeyDown={handleKeyDown} />
      <div>Prompt: {prompt}</div>
      {/* <div>Completion: {completion.split('\n').map(item => <>{item}<br/></>)}</div> */}
      <div>Completion: <img src={completion}/></div>
    </div>
  );
};

export default Home;