import arcjet from "arcjet";
import { ARCJET_KEY } from "./env.js";
import detectBot from "arcjet/detect-bot";
import tokenBucket from "arcjet/token-bucket";

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"], // make sure you include your key
    rules: [
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"], // allowed bots
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 5,  // tokens added per interval
        interval: 10,   // seconds
        capacity: 10,   // max tokens
      }),
    ],
  });
  