import { Schema, Document, model } from "mongoose"

/**
 * In Mongoose, a schema is a blueprint for a document. 
 * It defines the structure, types, and validation of the fields in the document. 
 * A document is an instance of a Mongoose model, and it represents a single MongoDB document. 
 * It has the same structure and fields as defined in the schema. 
 * A model is a constructor function that creates instances of documents. 
 * It can be used to perform CRUD operations on the documents in a MongoDB collection.
 */

/**
 * This is type for internal usage inside controller logic
 */
export interface IVolume extends Document {
	totalTransferedUsd: number,
	totalApprovedUsd: number
}

/**
 * This is "type" for usage inside of mongoBD
 */
const volumeSchema: Schema = new Schema(
	{
		totalTransferedUsd: {
			type: Number,
			required: true,
		},

		totalApprovedUsd: {
			type: Number,
			required: true,
		}
	},
	{ timestamps: true }
)
/**
 * This argument - name of collection that will be save in mongoDB with suffix s, all lowercase letters. 
 * So in this case it will be "transfers"
 */
export default model<IVolume>("volume", volumeSchema)