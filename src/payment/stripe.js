// src/stripe.js

import { loadStripe } from '@stripe/stripe-js';

// Replace 'your-publishable-key' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51PWu6bRpyDZKuQjRkXPzGWsIMlEAclJj1jjzMf7HWGlxgKK4D5ajBFCw5Mpqaw2RMlNBBn4UmFyIZ9JB4b6ry8IN00ICwBDBeA');

export { stripePromise };
