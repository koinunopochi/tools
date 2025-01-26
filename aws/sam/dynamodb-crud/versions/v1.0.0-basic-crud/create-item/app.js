const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient();

exports.handler = async (event) => {
  const item = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: { S: item.id },
      data: { S: item.data },
    },
  };

  try {
    await client.send(new PutItemCommand(params));
    return { statusCode: 200, body: 'Item created' };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
