const connect = require('../config/db.js')

class model_user {
    static async getAll(){
        return new Promise((resolve, reject) => {
            connect.query('select * from user order by id_user desc', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Store(Data){
        return new Promise((resolve, reject) =>{
            connect.query('insert into user set ? ', Data, function(err, result){
                if(err){
                    reject(err)
                    console.log(err)
                } else {
                    resolve(result);
                }
            })
        })
    }

    static async login(email){
        return new Promise((resolve, reject) => {
            connect.query('select * from user where email = ?', email, function(err, rows){
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async getID(id){
        return new Promise((resolve, reject) => {
            connect.query('select * from user where id_user = ?', id, function(err, rows){
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async Update(id, Data){
        return new Promise((resolve, reject) => {
        connect.query('update user set ? where id_user = '+ id, Data, function(err, result){
            if(err){
                reject(err)
            } else {
                resolve(result)
            }
            
        })
    })
    }

    static async Delete(id){
        return new Promise((resolve, reject) => {
            connect.query('delete from user where id_user = ?', id, function(err, result){
                if(err){
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

}

module.exports = model_user;