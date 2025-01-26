const {
  DynamoDBClient,
  DeleteItemCommand,
} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient();

exports.handler = async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: { S: event.pathParameters.id } },
  };

  try {
    await client.send(new DeleteItemCommand(params));
    return { statusCode: 200, body: 'Item deleted' };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
