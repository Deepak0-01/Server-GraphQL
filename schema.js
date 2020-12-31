const axios = require('axios');
const {

    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLScalarType,
  
} =  require('graphql');





const customerType = new GraphQLObjectType({
    name:'Customer',

    fields:()=>({

        id:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        age:{type:GraphQLInt}



    })

    



    
});

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{

        addCustomer:{

            type:customerType,
            args:{

                id:{type: GraphQLString},
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},

                
                age:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/customers',{

                id:args.id,
                name:args.name,
                email:args.email,
                age:args.age


                })
                .then(res=>res.data);
            }
        },

        deleteCustomer:{

            type:customerType,
            args:{

                id:{type: new GraphQLNonNull(GraphQLString)},
               
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/customers/'+ args.id)
                .then(res=>res.data);
            }
        },

         editCustomer:{

            type:customerType,
            args:{

                id:{type: new GraphQLNonNull( GraphQLString)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},

                
                age:{type:GraphQLInt},
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/customers/'+args.id,args)

              
                .then(res=>res.data);
            }
        },

        
    }
})


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{

        customer:{
            type:customerType,
            args:{
                id:{type:GraphQLString}
            },

            resolve(parentValue,args){

                return axios.get(" http://localhost:3000/customers/"+args.id)
                .then(res=>res.data);

               
            }

        
        },

        customers:{
           type: new GraphQLList(customerType),
            resolve(parentValue,args){

                return customers;
            }
            
        }
    }
})


module.exports  = new GraphQLSchema({

    query:RootQuery,
    mutation


});