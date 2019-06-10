/*
 * ToDoApp Messages
 *
 * This contains all the text for the ToDoApp container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ToDoApp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ToDoApp container!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'TODO list example',
  },
});
