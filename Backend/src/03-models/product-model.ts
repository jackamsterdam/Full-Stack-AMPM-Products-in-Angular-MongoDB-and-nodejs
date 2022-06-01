import { Document, model, Schema } from "mongoose";
import { CategoryModel } from "./category-model";

//1. Model interface describing the data in the model:
export interface IProductModel extends Document {
    name: string
    price: number
    fromDate: Date
    expDate: Date
    categoryId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        match: [/^[A-Z].+$/, "Name must start with a capital letter"],
        trim: true,
        unique: true

    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]

    },
    fromDate: {
        type: Date,
        required: [true, "Missing date"],
    },
    expDate: {
        type: Date,
        required: [true, "Missing date"],
    },
    categoryId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
})

//Virtual Fields: 
ProductSchema.virtual('category', {
    ref: CategoryModel,
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const ProductModel = model<IProductModel>('ProductModel', ProductSchema, 'products')

