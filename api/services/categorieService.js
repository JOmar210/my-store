const faker = require('faker');

class CategoriesService{
  constructor(){
    this.categories=[];
    this.generate();
  }
  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName()
      });

    }

  }
  async create(data){
    const newCategorie={
      id:faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategorie);
    return newCategorie;
  }
  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.categories)
      },5000)
    })
    //return this.categories;
  }
  async findOne(id){
    return this.categories.find(item=>item.id===id);
  }
  async update(id,changes){
    const index = this.categories.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error('categorie not found');
    }
    const categorie = this.categories[index];
    this.categories[index]={
      ...categorie,
      ...changes
    };

    return this.categories[index];

  }
  async delete(id){
    const index = this.categories.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error('categorie not found');
    }
    this.categories.splice(index,1);
    return {id};
  }
}
module.exports=CategoriesService;
