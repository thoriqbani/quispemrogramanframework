const connection = require('../config/db')

class Model_produk{
    static async getAll() {
        return new Promise((resolve, reject) => {
          connection.query("SELECT * FROM produk JOIN kapal ON produk.id_kapal = kapal.id_kapal ORDER BY produk.id_produk DESC", (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    static async Store(Data){
        return new Promise((resolve, reject) =>{
            connection.query('insert into produk set ?',Data,function(err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })
    }
    static async getId(id){
        return new Promise((resolve, reject) =>{
            connection.query('SELECT * FROM produk a LEFT JOIN kapal b ON b.id_kapal = a.id_kapal WHERE a.id_produk = ?', id, (err, rows) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static async Update(id, Data){
        return new Promise((resolve, reject) =>{
            connection.query('UPDATE produk SET ? WHERE id_produk = ?', [Data, id], (err, result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
    static async Delete(id){
        return new Promise((resolve, reject) =>{
            connection.query('delete from produk where id_produk ='+ id, function(err,result) {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
}
module.exports = Model_produk