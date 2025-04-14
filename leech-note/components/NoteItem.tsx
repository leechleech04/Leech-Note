import { Text } from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';

const Container = styled.View`
  border: 2px solid ${colors.blue};
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
`;

const TitleText = styled.Text`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 600;
`;

const ContentText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

const LastEditedAtText = styled.Text`
  color: ${colors.gray};
  text-align: right;
  text-shadow: 0px 0px 1px ${colors.white};
`;

const NoteItem = ({
  title,
  content,
  lastEditedAt,
}: {
  title: string;
  content: string;
  lastEditedAt: Date;
}) => {
  return (
    <Container>
      <TitleText numberOfLines={1}>{title}</TitleText>
      <ContentText numberOfLines={1}>{content}</ContentText>
      <LastEditedAtText>
        가장 최근 수정된 시간: {lastEditedAt.toString()}
      </LastEditedAtText>
    </Container>
  );
};

export default NoteItem;
