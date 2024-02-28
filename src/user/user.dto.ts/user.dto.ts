
import {IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, } from "class-validator"

export class createUserDto{
   

    @IsNotEmpty()
    @IsString()
    username:string

   @IsString()
   @IsNotEmpty()
   @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    phone?: string

    @IsNotEmpty()
     password:string

     
    account_balance:number 

    
    account_number: number 
    
   
     register_date: Date

     
     userRef:number

     transcation:{
        SenderUsername:string
        
    
        reciverAct:string
    
        AmounttoSend:string
    
        Dsecription:string
     }[]


}

export class createLoginDto{

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    
    password:string

}


export class transfer{

  
    @IsNotEmpty()
    @IsString()
    SenderUsername:string

    
    @IsNotEmpty()
    reciverAct:string


    
    @IsNotEmpty()
    AmounttoSend:string

    Dsecription:string

}