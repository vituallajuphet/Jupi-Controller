import axios from 'axios';

export const AI_API = 'https://jupifund.online/api/get-ai-response';

export const getAIResponse = async (data: any) => {
  if (data.intents?.length > 0) {
    const intent = data.intents[0];
    if (intent.name === 'set_command' && intent.confidence > 0.8) {
      Object.keys(data.entities).forEach(key => {
        console.log('key', key);
        console.log('value', data.entities[key]);
      });
    }
  }
};

const devices = [
  'fan',
  'monitor',
  'lights',
  'tv',
  'aircon',
  'music',
  'door',
  'window',
  'curtains',
  'camera',
  'alarm',
  'microwave',
  'oven',
  'fridge',
  'dishwasher',
  'washing machine',
  'dryer',
  'robot vacuum',
  'coffee machine',
  'kettle',
  'toaster',
  'blender',
  'juicer',
  'food processor',
  'mixer',
  'grill',
  'fryer',
  'steamer',
  'slow cooker',
  'pressure cooker',
  'rice cooker',
  'bread maker',
  'ice cream maker',
  'popcorn maker',
  'waffle maker',
  'panini press',
  'sous vide',
  'scales',
];
