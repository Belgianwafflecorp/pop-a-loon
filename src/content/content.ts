import browser from 'webextension-polyfill';
import { Message } from '@const';
import Balloon, { balloonContainer } from '@/balloon';
import { default as BalloonGold } from '@/balloonGold';
import './style.css';

(() => {
  if (
    // Prevent running in popup
    document.body.id === 'pop-a-loon' ||
    // Prevent multiple script loads
    document.body.contains(balloonContainer)
  ) {
    return;
  }

  browser.runtime.onMessage.addListener(
    async (message: Message, sender, sendResponse) => {
      // Always call sendResponse, this is required
      sendResponse();
      // If the message is not spawnBalloon, ignore it
      if (message.action !== 'spawnBalloon') return;
      // Create a new balloon and make it rise
      const balloon = new BalloonGold();
      balloon.rise();
    }
  );

  document.body.appendChild(balloonContainer);
})();
