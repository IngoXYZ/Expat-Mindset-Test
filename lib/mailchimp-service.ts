import crypto from 'crypto';

/**
 * Mailchimp Service for managing email subscriptions
 * This service handles all Mailchimp Marketing API interactions
 */

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  listId: string;
}

interface SubscribeData {
  email: string;
  firstName: string;
  status?: 'subscribed' | 'pending' | 'unsubscribed' | 'cleaned';
  tags?: string[];
  mergeFields?: Record<string, any>;
}

interface MailchimpResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Get MD5 hash of email (required by Mailchimp API)
 */
function getEmailHash(email: string): string {
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

/**
 * Get Mailchimp configuration from environment variables
 */
function getMailchimpConfig(): MailchimpConfig {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !serverPrefix || !listId) {
    throw new Error('Missing required Mailchimp configuration. Please check environment variables.');
  }

  return { apiKey, serverPrefix, listId };
}

/**
 * Subscribe a user to the Mailchimp list
 */
export async function subscribeToMailchimp(data: SubscribeData): Promise<MailchimpResponse> {
  try {
    const config = getMailchimpConfig();
    const emailHash = getEmailHash(data.email);
    
    // Prepare merge fields (custom fields in Mailchimp)
    const mergeFields = {
      FNAME: data.firstName,
      ...(data.mergeFields || {})
    };

    // Prepare the request body
    const requestBody = {
      email_address: data.email.toLowerCase(),
      status: data.status || 'subscribed', // Default to subscribed
      merge_fields: mergeFields,
      tags: data.tags || []
    };

    // Make API request to Mailchimp
    const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.listId}/members/${emailHash}`;
    
    const response = await fetch(url, {
      method: 'PUT', // PUT allows both creating new members and updating existing ones
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Handle Mailchimp API errors
      console.error('Mailchimp API Error:', responseData);
      
      // Check for specific error cases
      if (responseData.title === 'Member Exists') {
        return {
          success: true,
          message: 'Email is already subscribed',
          data: responseData
        };
      }

      return {
        success: false,
        message: responseData.detail || 'Failed to subscribe to mailing list',
        data: responseData
      };
    }

    return {
      success: true,
      message: 'Successfully subscribed to mailing list',
      data: responseData
    };

  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      data: null
    };
  }
}

/**
 * Unsubscribe a user from the Mailchimp list
 */
export async function unsubscribeFromMailchimp(email: string): Promise<MailchimpResponse> {
  try {
    const config = getMailchimpConfig();
    const emailHash = getEmailHash(email);
    
    const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.listId}/members/${emailHash}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`
      },
      body: JSON.stringify({
        status: 'unsubscribed'
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Mailchimp API Error:', responseData);
      return {
        success: false,
        message: responseData.detail || 'Failed to unsubscribe from mailing list',
        data: responseData
      };
    }

    return {
      success: true,
      message: 'Successfully unsubscribed from mailing list',
      data: responseData
    };

  } catch (error) {
    console.error('Error unsubscribing from Mailchimp:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      data: null
    };
  }
}

/**
 * Check if an email is subscribed to the list
 */
export async function checkSubscriptionStatus(email: string): Promise<MailchimpResponse> {
  try {
    const config = getMailchimpConfig();
    const emailHash = getEmailHash(email);
    
    const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.listId}/members/${emailHash}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: true,
          message: 'Email not found in list',
          data: { status: 'not_subscribed' }
        };
      }

      console.error('Mailchimp API Error:', responseData);
      return {
        success: false,
        message: responseData.detail || 'Failed to check subscription status',
        data: responseData
      };
    }

    return {
      success: true,
      message: 'Subscription status retrieved',
      data: responseData
    };

  } catch (error) {
    console.error('Error checking Mailchimp subscription:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      data: null
    };
  }
}
