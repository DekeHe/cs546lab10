const mongoCollections=require('../config/mongoCollections')
const getUserCollectionF=mongoCollections.users
const validation=require('../validation')
const bcrypt=require('bcrypt')
const {ObjectId}=require('mongodb')
const saltRounds=7

const exportedMethods=
{	
	async createUser(username,password){
		
		const usernameNew=username.toLowerCase()
		username=validation.checkUsername(usernameNew,'username')
		password=validation.checkPassword(password,'password')

		const userCollection=await getUserCollectionF()
		const users=await userCollection .find({}).toArray()

		for(const v of users)
		{
			if(v.username===username)
			throw `Error:${username} already exists in the database`
		}

		const h=await bcrypt.hash(password,saltRounds)

		let newUser={
			_id:ObjectId(),
			username:username,
			password:h
		}
		
		const newInsertInformation=await userCollection.insertOne(newUser)
		if (newInsertInformation.insertedCount===0)throw 'Insert failed!'
		return {userInserted:true}
	},

	// async shortCheckUser(username,password)
	// {
	// 	username=validation.checkUsername(username,'username')
	// 	password=validation.checkPassword(password,'password')
	// 	return {authenticated:true}
	// },

	async checkUser(username,password)
	{
		const usernameNew=username.toLowerCase()

		username=validation.checkUsername(usernameNew,'username')
		password=validation.checkPassword(password,'password')

		username=username.toLowerCase()

		const userCollection=await getUserCollectionF()
		const users=await userCollection .find({}).toArray()
		let user=undefined
		for(const v of users)
		{
			if(v.username===username)
			{
				user=v
			}
		}
		if(!user)throw `Error:Either the username or password is invalid`
		const match=await bcrypt.compare(password,user.password)
		if(match)
		{
			return {authenticated:true}
		}
		else
		{
			throw `Error:Either the username or password is invalid`
		}
	}
	
}

module.exports=exportedMethods

