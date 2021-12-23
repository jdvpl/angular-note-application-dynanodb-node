import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotesApiService {

    constructor(private httpClient: HttpClient) {

    }

    addNote(item) {
        let endpoint = process.env.API_ROOT + '/crear/nota';
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            user_name:item.user_name
        };

        if(item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };

        return this.httpClient.post(endpoint, reqBody);
    }

    updateNote(item) {
        let endpoint = process.env.API_ROOT + '/actualizar/nota/1';
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            timestamp: parseInt(item.timestamp),
            note_id: item.note_id
        };

        if (item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };

        return this.httpClient.patch(endpoint, reqBody);
    }

    deleteNote(timestamp) {
        let endpoint = process.env.API_ROOT + '/borrarnota/' + timestamp+'/1';
        return this.httpClient.delete(endpoint);
    }

    getNotes(start?): Observable<any> {
        let endpoint = process.env.API_ROOT + '/notas?limit=5';
        if (start > 0) {
            endpoint += '&start=' + start;
        }
        return this.httpClient.get(endpoint);
    }

}