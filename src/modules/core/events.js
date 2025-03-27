export class EventBus {
  subscribers = {};

  subscribe(event, callback) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach(callback => callback(data));
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event]
      .filter(cb => cb !== callback);
  }
}

export const eventBus = new EventBus();

// Common application events
export const events = {
  // Auth events
  USER_SIGNED_IN: 'user/signed-in',
  USER_SIGNED_OUT: 'user/signed-out',
  USER_PROFILE_UPDATED: 'user/profile-updated',
  
  // Marketplace events
  PRODUCT_VIEWED: 'product/viewed',
  PRODUCT_ADDED_TO_CART: 'product/added-to-cart',
  PRODUCT_REMOVED_FROM_CART: 'product/removed-from-cart',
  
  // Payment events
  PAYMENT_STARTED: 'payment/started',
  PAYMENT_COMPLETED: 'payment/completed',
  PAYMENT_FAILED: 'payment/failed',
  
  // Wallet events
  WALLET_CONNECTED: 'wallet/connected',
  WALLET_DISCONNECTED: 'wallet/disconnected',
  WALLET_ACCOUNT_CHANGED: 'wallet/account-changed',
  
  // Cart events
  CART_UPDATED: 'cart/updated',
  CHECKOUT_STARTED: 'checkout/started',
  CHECKOUT_COMPLETED: 'checkout/completed'
};