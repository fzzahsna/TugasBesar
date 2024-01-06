import express from "express";
import {
    getPeminjamans,
    getPeminjamanById,
    createPeminjaman,
    updatePeminjaman, 
    deletePeminjaman
} from "../controllers/Peminjamans.js";


const router = express.Router();

router.get('/peminjamans', getPeminjamans);
router.get('/peminjamans/:id', getPeminjamanById)
router.post('/peminjamans', createPeminjaman);
router.patch('/peminjamans/:id', updatePeminjaman);
router.delete('/peminjamans/:id', deletePeminjaman);

export default router;