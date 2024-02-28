import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";


import { Document } from "mongoose";

export type UseDocument = user & Document
@Schema()
export class user {
    
    @Prop({unique:true, required:true, })
    username:string

    @Prop({required:true})
    name:string

    @Prop({required:true})
    email:string


    @Prop({required:true})
    phone?: string

    @Prop({required:true})
     password:string

     @Prop({required:true})
    account_balance:number

    @Prop({required:true})
    account_number: number
    
    @Prop({required:true})
     register_date: Date

     @Prop({required:false})
     userRef:number

     @Prop({required:false, type:Array})
     transcation:{
        SenderUsername:string,
        
    
        reciverAct:string
    
        AmounttoSend:string
    
        Dsecription:string
     }[]


}


export const userSchema = SchemaFactory.createForClass(user)