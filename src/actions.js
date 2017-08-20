
class PackageActions {
  
  static getActions(){
    return {
      create: 'action:create',
      update: 'action:update',
      delete: 'action:delete',
    };
  }

  static isValidAction(action){
    const actions = this.getActions();
    return Object.keys(actions).map((i) => actions[i])
      .indexOf(action) >= 0;
  }
}

export default PackageActions;