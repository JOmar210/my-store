const faker = require('faker');

class UsersService{
  constructor(){
    this.users=[];
    this.generate();
  }
  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        image: faker.image.imageUrl(),
      });

    }

  }
  async create(data){
    const newUser={
      id:faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }
  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.users)
      },5000)
    })
    //return this.users;
  }
  async findOne(id){
    return this.users.find(item=>item.id===id);
  }
  async update(id,changes){
    const index = this.users.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error('User not found');
    }
    const User = this.users[index];
    this.users[index]={
      ...User,
      ...changes
    };

    return this.users[index];

  }
  async delete(id){
    const index = this.users.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error('User not found');
    }
    this.users.splice(index,1);
    return {id};
  }
}
module.exports=UsersService;
