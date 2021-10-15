import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { ProductMany } from 'src/models/response/productMany.response';
import { DescriptionProductMany } from 'src/models/response/description.product.response';
import { Status } from 'src/models/response/status.response';
import { InformationMany } from 'src/models/response/information.response';
import { AdminLoginResponse } from 'src/models/response/admin.login.response'
import { UsernameResponse } from 'src/models/response/admin.login.response'
import { UpdateResponse } from 'src/models/response/update.response'


const { MongoClient } = require('mongodb');
var url = "mongodb://localhost:27017/mydb";

@Injectable()
export class PostService {
    async getAllProduct() { 
        const client = await MongoClient.connect(url);
        const dbo = client.db("mydb"); 
        const data = await dbo.collection('location').aggregate([
                {
                 '$lookup': {
                     'from': 'product',
                     'localField': '_id',
                     'foreignField': 'id_location',
                     'as': 'product'
                     }
                 },
                 {
                 '$lookup': {
                     'from': 'description_product',
                     'localField': 'product.id_product',
                     'foreignField': '_id',
                     'as': 'product_detail'
                     }
                 }
        ]).toArray()

        var response = MatchData(data)                 
        return response;
    }

    async locationProduct(req:any) {
        const client = await MongoClient.connect(url);
        const dbo = client.db("mydb");  
        var query = {location:req.location};
        const data = await dbo.collection('location').aggregate([
            {'$match':query},    
            {
                 '$lookup': {
                     'from': 'product',
                     'localField': '_id',
                     'foreignField': 'id_location',
                     'as': 'product'
                     }
                 },
                 {
                 '$lookup': {
                     'from': 'description_product',
                     'localField': 'product.id_product',
                     'foreignField': '_id',
                     'as': 'product_detail'
                     }
                 }
        ]).toArray()

        var response = MatchData(data)                 
        return response;
    }

    async updateProduct(req:any) {
        var ObjectId = require('mongodb').ObjectId
        const client = await MongoClient.connect(url);
        const dbo = client.db("mydb");  
        let response = new UpdateResponse();
        let date_ob = new Date();
        
        
        var myquery = { id_location: ObjectId(req.id_location),id_product:ObjectId(req.id_product) };
        var newvalues = { $set: {product_number: req.product_number,last_update:date_ob} };
        const res = await dbo.collection('product').update(myquery, newvalues)

        if (res.matchedCount === 0){
            response.code = 500
            response.description = "fail"
        }else{
            response.code = 200
            response.description = "success"
        }               
        return response;
    }

    async productLessThan() {
        const client = await MongoClient.connect(url);
        const dbo = client.db("mydb");  
        const data = await dbo.collection('location').aggregate([
                {
                 '$lookup': {
                     'from': 'product',
                     'localField': '_id',
                     'foreignField': 'id_location',
                     'as': 'product'
                     }
                 },
                 {
                 '$lookup': {
                     'from': 'description_product',
                     'localField': 'product.id_product',
                     'foreignField': '_id',
                     'as': 'product_detail'
                     }
                 }
        ]).toArray()

        var match = MatchData(data)     
        var response = checkLessthan(match)            
        return response;
    }

    async loginAdmin(req:any) {
        let response = new AdminLoginResponse();
        let usernameResponse = new UsernameResponse();
    
        const client = await MongoClient.connect(url);
        const dbo = client.db("mydb"); 
        var query = {username:req.username,password:req.password}; 
        
        const data = await dbo.collection('admin').find(query).toArray()
        
        if (Object.keys(data).length === 0){
            response.code = 401
            response.description = "fail"
            usernameResponse.username = req.username
            response.data = usernameResponse
        }else{
            response.code = 200
            response.description = "success"     
            usernameResponse.username = req.username
            response.data = usernameResponse
        }
        return response;
    }
    
}


function MatchData(data:any) {
    let response = new ProductMany();
    let status = new Status();
    let descriptionproductmany = new DescriptionProductMany();
    let arrayDescriptionProductMany: DescriptionProductMany[] = []
    let informationmany = new InformationMany
    

    if (Object.keys(data).length === 0){
        status.code = 500;
        status.description = "fail"
        response.status = status
    }else{
        for (let i=0;i<Object.keys(data).length;i++){
            for (let j=0;j<Object.keys(data[i].product_detail).length;j++){
                descriptionproductmany.location = data[i].location
                descriptionproductmany.product_name = data[i].product_detail[j].product_name
                descriptionproductmany.product_price = data[i].product_detail[j].product_price
                descriptionproductmany.product_number = data[i].product[j].product_number
                descriptionproductmany.picture = data[i].product_detail[j].picture
                descriptionproductmany.update_date = data[i].product[j].last_update
                descriptionproductmany.id_location = data[i].product[j].id_location
                descriptionproductmany.id_product = data[i].product[j].id_product
                arrayDescriptionProductMany.push({...descriptionproductmany})
            }
        } 

        status.code = 200;
        status.description = "success"
        informationmany.product = arrayDescriptionProductMany;
        response.status = status
        response.data = informationmany
    }

    return response

}


function checkLessthan(data:any){
    let response = new ProductMany();
    let status = new Status();
    let arrayDescriptionProductMany: DescriptionProductMany[] = []
    let informationmany = new InformationMany
    
    if (Object.keys(data).length === 0){
        status.code = 500;
        status.description = "fail"
        response.status = status
    }else{
        for (let i=0;i<Object.keys(data.data.product).length;i++){
            if (data.data.product[i].product_number < 10) {
                arrayDescriptionProductMany.push({...data.data.product[i]})

            }
        }
        status.code = 200;
        status.description = "success"
        informationmany.product = arrayDescriptionProductMany;
        response.status = status
        response.data = informationmany
    }
    return response

}