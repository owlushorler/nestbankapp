import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from "@nestjs/mongoose";
import { promises } from "dns";
import { Model } from "mongoose";
import { UseDocument, user } from 'src/schema/user.schema';
import { createLoginDto, createUserDto, transfer } from './user.dto.ts/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel : Model<UseDocument>) {}

    // create account
  async   create(user:createUserDto,id:string){
        const newUser = new this.userModel(user)
        const findone= await this.userModel.findOne({ username: id })
        
        if(findone ) throw new NotFoundException ("usernamer exist try another username")
        
        return newUser.save()
    }

 // login to your account
  async findOne(login:createLoginDto) {
    const findUsername= await this.userModel.findOne({ username: login.username})
    //const findPassword= await this.userModel.findOne({ username: login.password })
     if(!findUsername) throw new NotFoundException ("wrong username")
    const hash = findUsername.password
    const isMatch = await bcrypt.compare(login.password, hash);
    if(!isMatch) throw new NotFoundException ("wrong password try again")
    return findUsername
  } 
    


 // transfer from aacount to another
 async transferAct(treans:transfer){

    const findAcount = await this.userModel.findOne({username:treans.SenderUsername})
    const findReciverAcct = await this.userModel.findOne({account_number:treans.reciverAct})
    if (!findReciverAcct) throw new NotFoundException ("incorrect account number")
   if(+findAcount.account_balance < +treans.AmounttoSend) throw new NotFoundException ("insuffient balance for this transaction")

 const history : transfer = { 
    

    SenderUsername:`send from ${findAcount.username}`,
    reciverAct:`account number of the sender${findAcount.account_number}`,
    AmounttoSend:`creadited N${treans.AmounttoSend}`,
    Dsecription: treans.Dsecription,

    ...findReciverAcct.transcation
}

const historys : transfer = { 
    
    SenderUsername:`send to ${findAcount.username}`,
    reciverAct:`account number of the reciever${findAcount.account_number}`,
    AmounttoSend:`debited N${treans.AmounttoSend}`,
    Dsecription: treans.Dsecription,

    ...findAcount.transcation
} 


     await this.userModel.updateOne({username:treans.SenderUsername,account_balance:  +findAcount.account_balance-+treans.AmounttoSend, transcation: historys})
    await this.userModel.updateOne({account_number:treans.reciverAct, account_balance:  +findReciverAcct.account_balance + +treans.AmounttoSend, transcation: history})
   
     
   // await this.userModel.updateOne({username:treans.reciverAct, transcation:[ history] })
        
   return this.userModel.find()
       // return findReciverAcct.transcation
       // return  {findAcount, findReciverAcct , }
   
       //return findAcount.transcation
   
     return `${treans.AmounttoSend} has been successfully transferd to ${findReciverAcct.username}`
 }

// to get the history of the transaction
 async history(login:createLoginDto) {
    const findUsername= await this.userModel.findOne({ username: login.username})
    //const findPassword= await this.userModel.findOne({ username: login.password })
     if(!findUsername) throw new NotFoundException ("wrong username")
    const hash = findUsername.password
    const isMatch = await bcrypt.compare(login.password, hash);
    if(!isMatch) throw new NotFoundException ("wrong password try again")
    const history = findUsername.transcation
    return history
  } 


}
