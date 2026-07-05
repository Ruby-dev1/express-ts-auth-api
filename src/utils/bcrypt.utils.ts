import bcrypt from "bcryptjs";

//* hashPassword
 export const hashPassword = async(password: string)=>{
    try{
        //salt  --> even if input got same it makes unique cz hash gives same output if multi users has same pwd
     
        const salt = await bcrypt.genSalt(10)

           // hash

         return await bcrypt.hash(password, salt);
        //    return hash;

    }
    catch(error){
        console.log(error);
        throw error;
    }

 }

 //* compare password

 export const comparePassword = async(password:string, hash:string)=>{
    try{
        return await bcrypt.compare(password,hash);

    }
    catch(error){
        throw error;
    }

 }