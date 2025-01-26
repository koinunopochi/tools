const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient();

exports.handler = async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: { S: event.pathParameters.id } },
  };

  try {
    const data = await client.send(new GetItemCommand(params));
    return { statusCode: 200, body: JSON.stringify(data.Item) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
