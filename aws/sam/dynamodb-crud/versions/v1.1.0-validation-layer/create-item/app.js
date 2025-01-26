const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { validateItem } = require('validator');
const client = new DynamoDBClient();

exports.handler = async (event) => {
  try {
    const rawBody = event.body.replace(/\\"/g, '"');
    const item = JSON.parse(rawBody);

    // バリデーション実行
    const validation = validateItem(item);
    if (!validation.isValid) {
      return {
        statusCode: 422,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Validation failed',
          details: validation.errors,
        }),
      };
    }

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: item.id },
        data: { S: item.data || '' },
      },
    };

    await client.send(new PutItemCommand(params));
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Item created',
        id: item.id,
      }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Invalid request',
        message: err.message,
      }),
    };
  }
};
