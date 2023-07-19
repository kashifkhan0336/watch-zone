import axios from 'axios';
import { Client, Notification } from 'pg';

// Define the type for your data payload
interface NotificationPayload {
  id: string;
  tenant_id: string;
  user_id: string;
  recipe_id: string;
  time_joined: number;
}

const pgClient = new Client({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'supertokens',
});

async function listenForNotifications() {
  try {
    await pgClient.connect();
    await pgClient.query('LISTEN test1');
    console.log('Listening for notifications...');

    pgClient.on('notification', (notification: Notification) => {
      // Parse the payload received from the notification
      const payload: NotificationPayload = JSON.parse(notification.payload);

      // Call your API or do whatever you need to do with the payload
      sendDataToApi(payload)
        .then((response) => {
          console.log('API Response:', response.data);
        })
        .catch((error) => {
          console.error('Error sending data to API:', error.message);
        });
    });
  } catch (error) {
    console.error('Error listening for notifications:', error.message);
  }
}

async function sendDataToApi(payload: NotificationPayload) {
  // Replace 'YOUR_API_ENDPOINT' with the actual URL of your API
  const apiUrl = 'http://localhost:3000/api/v1/verification/test';

  try {
    const response = await axios.post(apiUrl, payload);
    return response;
  } catch (error) {
    throw new Error(`Failed to send data to API: ${error.message}`);
  }
}

// Start listening for notifications
console.log("started")
listenForNotifications();