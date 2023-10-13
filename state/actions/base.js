const states = ['REQUEST', 'SUCCESS', 'FAILED'];

const addPrefix = (prefix, type) => `${prefix}/${type}`;

class BaseAction {
  constructor(prefix, types, sideEffects) {
    this.prefix = prefix;
    types.forEach((type) => {
      this[type] = addPrefix(prefix, type);
    });

    this.sideEffectTypes = {};
    sideEffects.forEach((type) => {
      const prefixedType = addPrefix(prefix, type);
      this[type] = prefixedType;

      this.sideEffectTypes[prefixedType] = [];
      states.forEach((state) => {
        const sideEffectType = `${prefixedType}_${state}`;
        this[`${type}_${state}`] = sideEffectType;
        this.sideEffectTypes[prefixedType].push(sideEffectType);
      });
    });
  }

  sideEffectsFor(name) {
    return this.sideEffectTypes[name];
  }

  getSideEffectFor = (name, index) =>
    this.sideEffectTypes[name] && this.sideEffectTypes[name][index];

  requestFor = (name) => this.getSideEffectFor(name, 0);

  successFor = (name) => this.getSideEffectFor(name, 1);

  errorFor = (name) => this.getSideEffectFor(name, 2);

  actionsFor = (name) => ({
    effects: this.sideEffectsFor(name),
    name,
  });
}

export default BaseAction;
