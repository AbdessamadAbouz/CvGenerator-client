export const getters = {
  authenticated(state) {
    return state.loggedIn;l
  },
  user(state) {
    return state.user;
  }
};

export const state = () => ({
  busy:false,
  loggedIn: false,
  strategy: 'local',
  user: false
});