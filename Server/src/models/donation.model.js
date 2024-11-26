import mongoose,{Schema} from "mongoose";


const donationSchema = new Schema({
    ngoId : {
        type : Schema.Types.ObjectId,
        ref : "Ngo",
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true
    }
},
{
    timestamps: true
});
export const Donation = mongoose.model("Donation", donationSchema);