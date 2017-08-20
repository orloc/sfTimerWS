import packageActions from "./actions";
import * as q from "q";

class MessageDecoder {

  decodeMessage(buffer) {
    const data = JSON.parse(buffer.toString());

    if (!packageActions.isValidAction(data.action)){
      console.log('here');
      return q.reject(new Error(`action ${data.action} not supported`));
      console.log('there');
    }
    
    console.log(data);
    
  }
}

export default MessageDecoder;