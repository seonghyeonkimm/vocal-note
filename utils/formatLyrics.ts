export default function formatLyrics(lyrics: string) {
  return lyrics.split('').reduce((current, next, index) => {
    if (next === '\n') {
      const lastChar = current[index - 1];
      if (lastChar.text === '\n') {
        current.push({ type: 'linebreak' });
      } else {
        current.push({ type: 'enter', text: next, pause: false });
      }
      return current;
    }

    if (next === ' ') {
      current.push({ type: 'space', text: next, pause: false });
    } else {
      current.push({ type: 'text', text: next, accent: false });
    }

    return current;
  }, []);
};
