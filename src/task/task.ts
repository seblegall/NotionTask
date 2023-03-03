/* eslint-disable prettier/prettier */
import {CreatePageParameters} from '@notionhq/client/build/src/api-endpoints';

export function NewTask(title: string) {
  return {
        parent: {
          type: 'database_id',
          database_id: '103270b4887b4eecbe3ad5a5964d4564',
        },
        properties: {
          Task: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          Context: {
            multi_select: [{name: '⛏ Task'}],
          },
        },
      } as CreatePageParameters;
}
