/**
 * constants.ts
 * This file contains constant values used throughout the application.
 * It stores the character data and their associated VAPI AI assistant IDs.
 */

import { Character } from './types';

// Array of available characters with their VAPI AI assistant IDs
export const CHARACTERS: Character[] = [
  {
    id: 'dayron',
    name: "Day'Ron",
    assistantId: '993224e7-9490-4c79-b65c-87bd39a9e73d',
    imagePath: '/images/dayron.png'
  },
  {
    id: 'lingling',
    name: 'Ling Ling',
    assistantId: '2f902cb4-3b46-49d2-b746-86c636972969',
    imagePath: '/images/lingling.png'
  },
  {
    id: 'rajesh',
    name: 'Rajesh',
    assistantId: '09b1d4b8-a2e0-49bd-8909-d67a09e93f60',
    imagePath: '/images/rajesh.png'
  },
  {
    id: 'miguel',
    name: 'Miguel',
    assistantId: 'a7fc29ae-57ea-4bbb-a285-8e238436bfcf',
    imagePath: '/images/miguel.png'
  },
  {
    id: 'bubba',
    name: 'Bubba',
    assistantId: '64c605c9-e6d3-43d1-b932-ffca9530a5bf',
    imagePath: '/images/bubba.png'
  },
  {
    id: 'sergei',
    name: 'Sergei',
    assistantId: '4c10b26e-a9ef-441a-bee4-07f8464baf6e',
    imagePath: '/images/sergei.png'
  }
]; 