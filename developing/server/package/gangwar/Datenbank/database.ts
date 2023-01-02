import { MongoClient, Db, Collection, Filter, OptionalUnlessRequiredId, FindOptions, WithId } from 'mongodb';
import { Server } from '../server';

export class Database {
    private _server: Server | undefined;
    private _client: MongoClient | undefined;
    private _database: Db | undefined;

    constructor(server: Server) {
        this._server = server;
    }

    public async initialize(): Promise<void> {

        const url = "mongodb://localhost:27017"; // MONGODB CONNECTION STRING
        const name = "gangwar"; // MONGODB DATABASE NAME

        /*  MONGODB COLLECTION NAMES
            @players
            @vehicles
        */

        this._client = new MongoClient(url);

        await this._client.connect(function (error, result: MongoClient): void {
            if (error) console.error(error);
        });

        this._database = this._client.db(name);

        // ERROR HANDLING
        this._client?.on('error', (err) => {
            console.error(`[MONGODB] throw error: ${err}`);
        });

        this._client?.once("open", () => {
            console.error(`[MONGODB] Connection at ${new Date()}}`);
        });
    }
    public getCollection<T>(name: string): Collection<T | any> {
        if (this._database != undefined) {
            return this._database.collection<T | any>(name);
        }
        return new Collection();
    }
    public async getDocument<T>(name: string, filter: Filter<T>, options?: FindOptions): Promise<any> {
        const collection: Collection<T | any> = this.getCollection<T>(name);

        if (collection != undefined) {
            return await collection.findOne(filter, options);
        }

        return undefined;
    }
    public async getDocuments<T>(name: string): Promise<any> {
        const collection: Collection<T | any> = this.getCollection<T>(name);

        if (collection != undefined) {
            return await collection.find({}).toArray();
        }

        return undefined;
    }
    public async updateDocument<T>(name: string, filter: Filter<T>, document: WithId<T>): Promise<void> {
        const collection: Collection<T | any> = this.getCollection<T>(name);

        if (collection != undefined) {
            await collection.replaceOne(filter, document);
        }
    }
    public async insertDocument<T>(name: string, document: OptionalUnlessRequiredId<T>): Promise<void> {
        const collection: Collection<T | any> = this.getCollection(name);

        if (collection != undefined) {
            await collection.insertOne(document);
        }
    }

    public async deleteDocument<T>(name: string, filter: Filter<T>): Promise<void> {
        const collection: Collection<T | any> = this.getCollection(name);

        if (collection != undefined) {
            await collection.deleteOne(filter);
        }
    }
}