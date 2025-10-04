import { readItems } from "@directus/sdk";
import { getDirectusClient } from "@/server/directus-client";

import { from, defer, lastValueFrom, of } from "rxjs";
import { map, catchError, retry, timeout } from "rxjs/operators";
import {DirectusCollectionKeys, fieldsFor, Guests} from "@/lib/directus-interfaces";


export async function getDigitalGuests(): Promise<Guests[]> {
    const client = getDirectusClient();
    if (!client) return [];

    const collection = DirectusCollectionKeys.guests;

    const fieldsToReturn = fieldsFor(collection)(
        'id',
        'person.first_name',
        'person.last_name',
        'person.email',
        'person.phone',
        'person.role',
    );

    const source$ = defer(() =>
        from(
            client.request(
                readItems(collection, {
                    fields: fieldsToReturn,
                })
            )
        )
    ).pipe(
        timeout(8000),
        retry(2),
        map((items: any[]): Guests[] => {
            console.log('items', items)
            return items
        }),
        catchError(() => of<Guests[]>([]))
    );

    return lastValueFrom(source$);
}
