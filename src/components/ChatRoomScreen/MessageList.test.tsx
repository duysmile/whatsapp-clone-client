import React from 'react';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  render,
  wait,
  fireEvent,
  getByTestId,
} from '@testing-library/react';

import MessageList from './MessageList';

describe('MessageList', () => {
  afterEach(cleanup);
  const time = new Date('1 Jan 2019 GMT');

  it('renders message data', () => {
    const messages = [
      {
        id: '1',
        content: 'foo',
        createdAt: time,
      },
      {
        id: '2',
        content: 'bar',
        createdAt: time,
      },
    ];

    let message1;
    let message2;
    {
      const { container, getAllByTestId, getByTestId } = render(
        <MessageList messages={messages} />
      );

      const match = getAllByTestId('message-item');
      message1 = match[0];
      message2 = match[1];
    }

    expect(getByTestId(message1, 'message-content')).toHaveTextContent('foo');
    expect(getByTestId(message1, 'message-date')).toHaveTextContent('07:00');

    expect(getByTestId(message2, 'message-content')).toHaveTextContent('bar');
    expect(getByTestId(message2, 'message-date')).toHaveTextContent('07:00');
  });
});
