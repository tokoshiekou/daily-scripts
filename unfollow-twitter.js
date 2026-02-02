/**
 * Goal: zero out the twitter following list
 *
 * Usage: stay on the "/Following" page
*/

(() => {
  // Set the interval between unfollow actions (in milliseconds)
  // Recommended: 1000ms - 2000ms to avoid being flagged by X's anti-spam system
  const INTERVAL = 1200; 
  let count = 0;

  const unfollowAll = setInterval(() => {
    const buttons = document.querySelectorAll('[data-testid$="-unfollow"]');
    
    if (buttons.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      
      setTimeout(() => {
        const remainingButtons = document.querySelectorAll('[data-testid$="-unfollow"]');
        if (remainingButtons.length === 0) {
          console.log("✅ Finished: No more accounts found to unfollow.");
          clearInterval(unfollowAll);
        }
      }, 2000);
      return;
    }

    buttons[0].click();

    setTimeout(() => {
      const confirmButton = document.querySelector('[data-testid="confirmationSheetConfirm"]');
      if (confirmButton) {
        confirmButton.click();
        count++;
        console.log(`Action: Unfollowed account #${count}`);
      }
    }, 500);

  }, INTERVAL);
})();