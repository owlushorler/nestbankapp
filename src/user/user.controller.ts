import { Controller , Post, Body, Get, Param, Put} from "@nestjs/common";
import { UserService } from "./user.service";;
import { createLoginDto, createUserDto, transfer } from "./user.dto.ts/user.dto";
import {ValidationPipe } from "@nestjs/common"
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(private UsersService: UserService){}

    @Post() //  /user   create  new accout
   async creacteUser(@Body(ValidationPipe) user:createUserDto ){

    
    const salt = await bcrypt.genSalt();
    const password =  user.password;
    const hash = await bcrypt.hash(password, 10);

     user.account_balance = 0
     user.password = hash
     user.account_number= Math.floor(Math.random()*100000000000)
     user.userRef=Math.floor(Math.random()*10000)
     user.register_date = new Date()
        
     return this.UsersService.create(user,user.username)
    }

    @Get() // /user login to user account
    findone(@Body(ValidationPipe) login:createLoginDto){
        return this.UsersService.findOne(login)
    }


    @Put()  // /user online transfer from one account to another
    async transfer(@Body() transfer:transfer){

        return this.UsersService.transferAct(transfer)

    }
   
    @Get("history") 
    async history(@Body() login:createLoginDto){
        return this.UsersService.history(login)
    } 

}
