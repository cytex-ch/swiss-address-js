import 'dotenv/config';

// istanbul ignore next
if (
  !(
    process.env.SWISSPOST_ADDRESS_WEB_SERVICES_USERNAME &&
    process.env.SWISSPOST_ADDRESS_WEB_SERVICES_PASSWORD
  )
) {
  // istanbul ignore next
  throw new Error('Missing environment variables');
}
const username = process.env.SWISSPOST_ADDRESS_WEB_SERVICES_USERNAME as string;
const password = process.env.SWISSPOST_ADDRESS_WEB_SERVICES_PASSWORD as string;

export {username, password};
