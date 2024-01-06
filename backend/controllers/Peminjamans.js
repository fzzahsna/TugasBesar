import Peminjaman from "../models/PeminjamanModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getPeminjamans = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Peminjaman.findAll({
                attributes: ['uuid', 'tgl_pinjam', 'tgl_kembali', 'bukuId', 'anggotaId'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else{
            response = await Peminjaman.findAll({
                attributes: ['uuid', 'tgl_pinjam', 'tgl_kembali', 'bukuId', 'anggotaId'],
                where:{
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPeminjamanById = async(req, res) =>{
    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!peminjaman) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Peminjaman.findOne({
                attributes: ['uuid', 'tgl_pinjam', 'tgl_kembali', 'bukuId', 'anggotaId'],
                where: {
                    id: peminjaman.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else{
            response = await Peminjaman.findOne({
                attributes: ['uuid', 'tgl_pinjam', 'tgl_kembali', 'bukuId', 'anggotaId'],
                where:{
                    [Op.and]:[{id: peminjaman.id}, {userId:req.userId}]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPeminjaman = async(req, res) =>{
    const {tgl_pinjam, tgl_kembali, bukuId, anggotaId} = req.body;
    try {
        await Peminjaman.create({
            tgl_pinjam: tgl_pinjam,
            tgl_kembali: tgl_kembali,
            bukuId: bukuId,
            anggotaId: anggotaId
        });
        res.status(201).json({msg: "Peminjaman Sukses Ditambahkan"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePeminjaman = async(req, res) =>{
    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!peminjaman) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {tgl_pinjam, tgl_kembali, bukuId, anggotaId} = req.body;
        if(req.role === "admin"){
            await Peminjaman.update({tgl_pinjam, tgl_kembali, bukuId, anggotaId},{
                where:{
                    id: peminjaman.id
                }
            });
        } else{
            if(req.userId !== peminjaman.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Peminjaman.update({tgl_pinjam, tgl_kembali, bukuId, anggotaId},{
                where:{
                    [Op.and]:[{id: peminjaman.id}, {userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Peminjaman berhasil diperbaharui"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletePeminjaman = async(req, res) =>{
    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!peminjaman) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {tgl_pinjam, tgl_kembali, bukuId, anggotaId} = req.body;
        if(req.role === "admin"){
            await Peminjaman.destroy({
                where:{
                    id: peminjaman.id
                }
            });
        } else{
            if(req.userId !== peminjaman.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Peminjaman.destroy({
                where:{
                    [Op.and]:[{id: peminjaman.id}, {userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Peminjaman berhasil dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}