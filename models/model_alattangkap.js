const connect = require('../config/db.js')

class model_alattangkap {
    static async getAll(){
        return new Promise((resolve, reject) => {
            connect.query('select * from alattangkap order by id_alattangkap desc', (err, rows) => {
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
            connect.query('insert into alattangkap set ? ', Data, function(err, result){
                if(err){
                    reject(err)
                    console.log(err)
                } else {
                    resolve(result);
                }
            })
        })
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connect.query('select * from alattangkap where id_alattangkap = ?', id, function(err, rows){
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
        connect.query('update alattangkap set ? where id_alattangkap = '+ id, Data, function(err, result){
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

            connect.query('delete from alattangkap where id_alattangkap = ?', id, function(err, result){
                if(err){
                    reject(err)
                } else {
                    resolve(result)
                }
                
            })
        })
    }

}

module.exports = model_alattangkap;