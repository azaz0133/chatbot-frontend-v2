const axios = require("axios");

async function s() {
  while (true) {
    await axios.get("https://pnxdev.me/").then(({ data }) => {
      console.log(data);
    });
  }
}


s()