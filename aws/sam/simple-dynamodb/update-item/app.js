const {
  DynamoDBClient,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: { S: event.pathParameters.id } },
    UpdateExpression: 'set #data = :value',
    ExpressionAttributeNames: { '#data': 'data' },
    ExpressionAttributeValues: { ':value': { S: body.data } },
  };

  try {
    await client.send(new UpdateItemCommand(params));
    return { statusCode: 200, body: 'Item updated' };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
