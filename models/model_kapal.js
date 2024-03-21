const connect = require('../config/db.js')

class model_kapal {
    static async getAll(){
        return new Promise((resolve, reject) => {
            connect.query('select id_kapal, pemilik.nama_pemilik, kapal.nama_kapal, dpi.nama_dpi, alattangkap.nama_alattangkap from kapal join pemilik on kapal.id_pemilik = pemilik.id_pemilik join dpi on kapal.id_dpi = dpi.id_dpi join alattangkap on kapal.id_alattangkap = alattangkap.id_alattangkap order by id_kapal desc', (err, rows) => {
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
            connect.query('insert into kapal set ? ', Data, function(err, result){
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
            connect.query('select * from kapal inner join pemilik on kapal.id_pemilik = pemilik.id_pemilik inner join dpi on kapal.id_dpi = dpi.id_dpi inner join alattangkap on kapal.id_alattangkap = alattangkap.id_alattangkap where id_kapal = ?', id, function(err, rows){
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
        connect.query('update kapal set ? where id_kapal = '+ id, Data, function(err, result){
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

            connect.query('delete from kapal where id_kapal = ?', id, function(err, result){
                if(err){
                    reject(err)
                } else {
                    resolve(result)
                }
                
            })
        })
    }

}

module.exports = model_kapal;