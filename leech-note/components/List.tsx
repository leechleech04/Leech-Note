import styled from 'styled-components/native';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { FlatList } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 50px 5px;
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
    setNote();
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
      <FlatList
        data={allNotes}
        renderItem={({ item: { title, content, lastEditedAt } }) => {
          return (
            <NoteItem
              title={title}
              content={content}
              lastEditedAt={lastEditedAt}
            />
          );
        }}
      />
    </Container>
  );
};

export default List;
