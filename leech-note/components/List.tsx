import styled from 'styled-components/native';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import NoteItem from './NoteItem';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 0 5px;
`;

interface NoteType {
  title: string;
  content: string;
  lastEditedAt: Date;
}

const List = () => {
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const setNote = async () => {
      const note = {
        title: 'Sample Note',
        content:
          'This is a sample note content. And Also this is a long text more than one line.',
        lastEditedAt: new Date(),
      };
      const noteKey = `note_${Date.now()}`;
      await AsyncStorage.setItem(noteKey, JSON.stringify(note));
    };
    setNote()
      .then(() => console.log('Note set successfully'))
      .catch((error) => console.error('Error setting note:', error));
  }, []);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        keys.map(async (key) => {
          const note = await AsyncStorage.getItem(key);
          if (note) {
            setAllNotes((prevNotes) => [...prevNotes, JSON.parse(note)]);
          }
        });
      } catch (error) {
        console.error('Error fetching keys from AsyncStorage:', error);
      }
    };

    getAllNotes();
  }, []);

  return (
    <Container>
      {allNotes.map((note, index) => (
        <NoteItem
          key={index}
          title={note.title}
          content={note.content}
          lastEditedAt={note.lastEditedAt}
        />
      ))}
    </Container>
  );
};

export default List;
