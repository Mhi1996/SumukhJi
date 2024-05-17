const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://localhost:8003" }); // Replace with your Elasticsearch server address

const indexProduct = async (product) => {
  try {
    const { body: result } = await elasticClient.index({
      index: "products",
      body: product,
    });
    console.log(`Indexed product with ID ${result._id}`);
  } catch (error) {
    console.error("Error indexing product:", error);
  }
};

const searchProducts = async (query) => {
  try {
    const { body } = await elasticClient.search({
      index: "products",
      body: {
        query: {
          match: query,
        },
      },
    });
    console.log("Search results:", body.hits.hits);
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

module.exports = { indexProduct, searchProducts };
