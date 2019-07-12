import Vue from 'vue'
import Vuex from "vuex";
import global from '../../store/global.js'

Vue.use(Vuex);

const modules = {
  global,
};

function wrapLoading(name, action) {
  return async function (context, payload) {
    const { commit, state } = context;
    const loading = {};
    loading[name] = true;

    commit('global/saveLoading', loading, { root: true });
    try {
      await action(context, payload);
    } catch (e) {
      throw e;
    } finally {
      loading[name] = false;
      commit('global/saveLoading', loading, { root: true });
    }
  }
}

Object.keys(modules).forEach(key => {
  let module = modules[key];
  const { actions } = module;
  for (let name in actions) {
    if (actions.hasOwnProperty(name)) {
      actions[name] = wrapLoading((module.namespaced? `${key}/`: '') + `${name}`, actions[name]);
    }
  }
});

export default new Vuex.Store({
  modules
})
