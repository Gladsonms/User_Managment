var db=require('../config/connection')
var collection=require('../config/collection')
var ObjectId=require('mongodb').ObjectId
const bcrypt=require('bcrypt');
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })
            .catch(()=>{
                console.log("Error signup");
            })
            
        })
        
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let laginStatus=false;
            let  response={}
            console.log(userData);
              let user=await db.get().collection(collection.USER_COLLECTIONS).findOne({email:userData.email})
              console.log(user);
              if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                   if(status)
                   {
                       console.log("true");
                       response.user=user
                       response.status=true
                       resolve(response)
                   }
                   else
                   {
                       console.log("false");
                       resolve({status:false})
                   }
                }) .catch(()=>{console.log("error");})           
            }
              else
              {
                  console.log("User not found");
                  resolve({status:false})
              }
        })

    },
    getAllUsers:()=>{
            return new Promise((resolve,reject)=>{
                let user=db.get().collection(collection.USER_COLLECTIONS).find().toArray()
                resolve(user)
            })
    },
    deleteUsers:(userId)=>{
        return new Promise((resolve,reject)=>{
            console.log(ObjectId(userId));
        db.get().collection(collection.USER_COLLECTIONS).deleteOne({_id:ObjectId(userId)}).then((response)=>{
            resolve(response)
        })
        })
    }
}