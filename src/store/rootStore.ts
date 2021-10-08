
import { create } from 'mobx-persist';

import {auth} from './auth';
// import UserStore from './UserStore.js';
// import SettingsStore from './SettingsStore.js';

const hydrate = create({
  //storage: AsyncStorage,
  jsonify: true,
});

class RootStore {
//   AuthStore = AuthStore;
//   UserStore = UserStore;
//   SettingsStore = SettingsStore;

  constructor() {
    Promise.all([
      hydrate('auth', auth),
    //   hydrate('user', this.UserStore),
    //   hydrate('settings', this.SettingsStore).then(() => this.SettingsStore.initData()),
    ])
      //.then(() => finishedLoading());
  }
};

export default new RootStore();