import { logger } from "../utils/logger";

const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

logger.info(`Database URL: mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);
export const dbConnection = {
	url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
};
