import { JSDOM } from "jsdom";

const { window } = new JSDOM(
  '<!doctype html><html lang="ru"><head><title>Messenger App</title></head><body><main id="app"></main></body></html>',
);

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.XMLHttpRequest = window.XMLHttpRequest;
global.FormData = window.FormData;
