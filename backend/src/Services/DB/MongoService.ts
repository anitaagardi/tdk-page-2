
import * as MongoClient from "mongodb";
import { DATABASE_NAME, MONGO_URL } from "../../Configuration";

class MongoService {
    constructor(private url: string, private databaseName: string) {

    }
    createDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => { console.log('DB Connected!'); db.close(); resolve(); })
                .catch(err => {
                    console.log("URL: " + this.url)
                    console.log('DB Connection Error: ${err.message}');
                    reject(err.message);
                })
        });
    }
    createCollection(collectionName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).then(db => {
                var dbo = db.db(this.databaseName);
                return dbo.createCollection(collectionName).then((result) => {
                    console.log(`Collection ${collectionName} created!`);
                    db.close();
                    resolve();
                }, (error) => {
                    throw error;
                }).catch((error) => {
                    db.close();
                    reject(error.message);
                }).finally(() => {
                    //db.close();
                })
            }, (error) => {
                console.log(error);
                reject(error.message);
            });
        });
    }
    insertOneCollection(collectionName: string, collection: any): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).insertOne(collection, {
                    }).then((collection) => {
                        if (collection.insertedCount != 1) {
                            throw new Error("Nem siker??lt a felvitel");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }
    listCollection(collectionName: string, query1: any, query2: any): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);

                    return dbo.collection(collectionName).find(query1, query2).toArray().then((collection) => {
                        db.close();
                        resolve(collection);
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }
    updateOneCollection(collectionName: string, query: any, newValues: any): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).updateOne(query, newValues).then((collection) => {

                        if (collection.modifiedCount == 0) {
                            throw new Error("Nem siker??lt a m??dos??t??s");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Error: ${err.message}`);
                        //error = err;
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }


    deleteOneCollection(collectionName: string, query: any): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).deleteOne(query).then((collection) => {
                        if (collection.deletedCount == 0) {
                            throw new Error("Nem siker??lt a t??rl??s");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }


    deleteCollection(collectionName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).drop().then((collection) => {
                        if (collection.deletedCount == 0) {
                            throw new Error("Nem siker??lt a t??rl??s");
                        }
                        db.close();
                        resolve(collection);
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }
    deleteAllDocumentsInCollection(collectionName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).deleteMany({}).then((collection) => {
                        if (collection.deletedCount == 0) {
                            throw new Error("Nem siker??lt a t??rl??s");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }

    replaceOneCollection(collectionName: string, query: any, newValues: any): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
                .then((db) => {
                    var dbo = db.db(this.databaseName);
                    return dbo.collection(collectionName).replaceOne(query, newValues).then((collection) => {

                        if (collection.modifiedCount == 0) {
                            throw new Error("Nem siker??lt a m??dos??t??s");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Error: ${err.message}`);
                        //error = err;
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        //console.log('Close DB');
                        //db.close();
                    })
                });
        });
    }
}

export let mongoService = new MongoService(MONGO_URL, DATABASE_NAME);