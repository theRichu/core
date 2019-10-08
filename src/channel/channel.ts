import { BaseClient } from "../client/base-client";
import { RichMessageTemplate } from "../message/template/rich-message-template";
import { UserMessage } from "../message/user-message";
import { EventEmitter } from "events";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class Channel extends EventEmitter {

    private id: string;
    
    private client: BaseClient;

    constructor(client: BaseClient, id: string) {
        super();
        
        this.client = client;
        this.id = id;
    }

    get Client() {
        return this.client;
    }

    get Id() {
        return this.id;
    }

    get IdentityId() {
        return `${this.Client.ClientId}-channel-${this.Id}`;
    }

    abstract get Name(): string;

    async sendText(text: string): Promise<UserMessage[]> {
        return this.client.sendText(text, this);
    }

    async sendRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]> {
        return this.client.sendRichTemplate(template, this);
    }

    // EventEmiiter overrides

    on(event: | 'message', listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    once(event: 'message', listener: (...args: any[]) => void): this {
        return super.once(event, listener);
    }
    
}