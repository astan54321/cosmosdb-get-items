const cosmos = require("@azure/cosmos")

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "cosmos endpoint";
const databaseId = process.env.COSMOS_DATABASE || "cosmos database";
const containerId = process.env.COSMOS_CONTAINER || "cosmos container";

const client = new cosmos.CosmosClient({
    endpoint: endpoint,
    key: key
})

async function run() {
    // ensuring a database & container exists for us to work with
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
  
    console.log("List items in container '" + container.id + "'");
    const { resources: itemDefList } = await container.items.readAll().fetchAll();
  
    for (const itemDef of itemDefList) {
      console.log(itemDef);
    }
}
run();