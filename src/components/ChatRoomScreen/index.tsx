import React from 'react';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { History } from 'history';

import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Container = styled.div`
  background-image: url(/assets/chat-background.jpg);
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatRoomScreenParams {
  chatId: string;
  history: History;
}

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  chatId,
  history,
}) => {
  const client = useApolloClient();
  const {
    data: { chat },
  } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null;

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat',
      };

      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message),
          },
        },
      });
    },
    [chat, chatId, client]
  );

  if (!chat) {
    return null;
  }

  return (
    <Container>
      <ChatNavbar chat={chat} history={history} />
      {chat.messages && <MessageList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
