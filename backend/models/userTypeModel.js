import {Schema,model} from 'mongoose';

export const cartItem=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:1
    }
}
)
export const userSchema=new Schema({

    firstName:{
        type:String,
        required:[true,"firstName is required"]
    },
    lastName:{
           type:String,
    },
   email: {
  type: String,
  required: [true, "Email is required"],
  unique: [true, "Email already exists"],
  trim: true, // removes whitespace
  lowercase: true, // always store in lowercase
  match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    "Please enter a valid email address"
  ]
},
    password:{
        type:String,
        required:[true,"Password is required"],  
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        required:[true,"{Value} is an Invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true  //whenever the user registed/login by default isActive set to true
    },
    cart:
    {
        type:[cartItem]
    },
},
{
    timestamps:true,
    strict:"throw",
    versionKey:false
});

//export the UserTypeModel schema
export const UserTypeModel=model("user",userSchema);