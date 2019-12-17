import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, waitForDomChange } from '@testing-library/react';
import ChatList from './ChatsList';

describe('ChatList', () => {
  afterEach(cleanup);

  it('render fetched chats data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      data: {
        chats: [
          {
            id: 1,
            name: 'Foo Bar',
            picture: 'https://localhost:4000/picture.jpg',
            lastMessage: {
              id: 1,
              content: 'Hello',
              createdAt: new Date('1 Jan 2019 GMT'),
            },
          },
        ]
      }
    }));

    {
      const { container, getByTestId } = render(<ChatList />);
      await waitForDomChange({ container });

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg',
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('07:00');
    }
  });
});
