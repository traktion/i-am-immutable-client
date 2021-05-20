import { Injectable } from '@angular/core';
import {get_config} from '../../../i-am-immutable-wasm/pkg';
import {get_message_descriptors} from '../../../i-am-immutable-wasm/pkg';
import {get_message} from '../../../i-am-immutable-wasm/pkg';
import {Config} from './config';
import {MessageDescriptor} from './message-descriptor';
import {Message} from './message';

@Injectable({
  providedIn: 'root'
})
export class BlogWasmService {

  constructor() { }

  getConfig(): Config {
    return JSON.parse(get_config());
  }

  getArticleDescriptorsOld(xor: string): MessageDescriptor[] {
    console.log(get_message_descriptors(xor));
    return JSON.parse(get_message_descriptors(xor));
  }

  getArticle(url: string): Message {
    return JSON.parse(get_message(url));
  }
}
