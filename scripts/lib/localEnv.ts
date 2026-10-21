import dotenv from 'dotenv';

// Existing shell/CI secrets win; local values take precedence over .env.
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
