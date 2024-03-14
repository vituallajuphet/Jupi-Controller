import axios from 'axios';

export const AI_API = 'https://jupifund.online/api/get-ai-response';

export const getAIResponse = async (data: any, context?: any) => {
  if (data.intents?.length > 0) {
    const intent = data.intents[0];
    if (intent.name === 'set_command' && intent.confidence > 0.8) {
      const entities = Object.entries(data.entities).map(([key, value]) => {
        return {
          entity: key,
          value: value,
        };
      });

      const toTogle = entities.find(ent =>
        ent.entity?.includes('switch_to_toggle'),
      );

      const isTurnOn = ent => {
        if (ent?.value?.length > 0) {
          return ent?.value[0].name;
        }

        return 'invalid';
      };

      const switchTo = isTurnOn(
        entities.find(
          ent =>
            ent.entity?.includes('turn_on') || ent.entity?.includes('turn_off'),
        ),
      );

      if (toTogle?.value?.length > 0) {
        const URL = context?.settings?.server;
        console.log('sname', switchTo);
        toTogle?.value?.map(val => {
          context?.settings?.switches?.map(sw => {
            if (sw.name.toLowerCase() === val.body.toLowerCase()) {
              const url =
                switchTo === 'turn_on'
                  ? `${URL}light-${sw.id}-on`
                  : `${URL}light-${sw.id}-off`;
              axios.get(url);
            }
          });
        });
      }
    } else {
      console.log('No intent found');
    }
  }
};

// const devices = [
//   'fan',
//   'monitor',
//   'lights',
//   'tv',
//   'aircon',
//   'music',
//   'door',
//   'window',
//   'curtains',
//   'camera',
//   'alarm',
//   'microwave',
//   'oven',
//   'fridge',
//   'dishwasher',
//   'washing machine',
//   'dryer',
//   'robot vacuum',
//   'coffee machine',
//   'kettle',
//   'toaster',
//   'blender',
//   'juicer',
//   'food processor',
//   'mixer',
//   'grill',
//   'fryer',
//   'steamer',
//   'slow cooker',
//   'pressure cooker',
//   'rice cooker',
//   'bread maker',
//   'ice cream maker',
//   'popcorn maker',
//   'waffle maker',
//   'panini press',
//   'sous vide',
//   'scales',
// ];
