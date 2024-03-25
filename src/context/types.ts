export type StateTypes = {
  user:
    | {
        auth?: any;
      }
    | undefined;
  room: {
    rooms: any[];
  };
  devices: any[];
  appState: {
    loading?: boolean;
    error?: any;
  };
};
