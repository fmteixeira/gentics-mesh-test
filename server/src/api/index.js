const express = require("express");
var request = require("request");
const router = express.Router();
const randomName = require("node-random-name");

// API
const API_URL = "http://localhost:8080/api/v2/eda360/nodes/";

async function createClients(count) {
  const response = await Promise.all(
    [...Array(count).keys()].map(async (index) => {
      setTimeout(() => {
        var options = {
          method: "POST",
          url: "http://localhost:8080/api/v2/eda360/nodes/",
          headers: {
            "content-type": "application/json",
            //authorization: "Basic YWRtaW46YWRtaW4=",
            authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyVXVpZCI6IjJlMmY4YjAwMzgyNjQ1YWVhNjNkYjNiYzk0NDk0YzNiIiwiaWF0IjoxNTk5NjQ0MDcxLCJleHAiOjE1OTk2NDc2NzF9.I-HPEGI05EilRNNOJcoXICi3T7v7JqIVJfMLdyFUvBc",
          },
          body: {
            parentNode: { uuid: "c40b8df8f2854e53a13eacb27582dfa6" },
            schema: { name: "cliente" },
            language: "pt",
            fields: { nome: randomName(), termos: false },
          },
          json: true,
        };
        return request(options, function (error, response) {
          if (error) return new Error(error);
          else return index;
        });
      }, index * 50);
    })
  );
  return response instanceof Error ? response : `Created ${count} Clients`;
}

router.post("/generateClients", async (req, res) => {
  // Number of clients to generate
  const clientCount = req.body.count;

  if (
    !clientCount ||
    !Number.isInteger(clientCount) ||
    clientCount <= 0 ||
    clientCount > 5000
  ) {
    return res.status(400).json({
      success: false,
      error:
        "Invalid or missing 'count' parameter, an integer between 1-1000 is expected",
      count: clientCount > 1000,
    });
  } else {
    return await createClients(clientCount).then((response) => {
      res.json({
        message: `${clientCount} clients are being generated`,
        response,
      });
    });
  }
});

module.exports = router;
