import packageActions from "./actions";
import * as q from "q";

class MessageDecoder {
  
  constructor(){
    this.messages = [];
  }

  static decodeMessage(buffer) {
    const data = JSON.parse(buffer.toString());

    if (!packageActions.isValidAction(data.action)){
      return q.reject(new Error(`action ${data.action} not supported`));
    }
    
    data.acting_user = JSON.parse(data.acting_user);
    
    return q.resolve(data);
  }
  
  push(message){
    this.messages.push(message);
    return q.resolve();
  }
  
  dumpMessages(){
    console.log(this.messages);
  }
  
  pop(){
    return this.messages.slice(0, 1)[0]; 
  }
  
}

export default MessageDecoder;