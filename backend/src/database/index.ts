const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

console.log("Database URL: ", `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);
export const dbConnection = {
	url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
};
