//mengimport dependencies dan package yang akan digunakan

//Mengimpor React, useState, dan useEffect dari pustaka React. 
import React, { useState, useEffect } from "react";

//Mengimpor komponen Link dari react-router-dom untuk membuat tautan antar halaman.
import { Link } from "react-router-dom";

//Mengimpor library axios untuk melakukan HTTP requests.
import axios from "axios";

const BukuList = () => {
  const [bukus, setBukus] = useState([]);

  useEffect(() => {
    fetchBukus();
  }, []);

  const fetchBukus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bukus");
      setBukus(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBuku = async (bukuId) => {
    try {
      await axios.delete(`http://localhost:5000/bukus/${bukuId}`);
      fetchBukus(); // setelah menghapus, panggil lagi untuk memperbarui daftar
    } catch (error) {
      console.error("Error deleting buku:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Daftar Buku</h1>
      <Link to="/buku/add" className="button is-primary mb-2">
        
        Tambah Buku
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Penerbit</th>
            <th>Kategori</th>
            <th>Tahun Terbit</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bukus.map((buku, index) => (
            <tr key={buku.id}>
              <td>{index + 1}</td>
              <td>{buku.judul}</td>
              <td>{buku.penulis}</td>
              <td>{buku.penerbit}</td>
              <td>{buku.kategori}</td>
              <td>{buku.tahunTerbit}</td>
              <td>{buku.stok}</td>
              <td>
                <Link
                  to={`/buku/edit/${buku.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBuku(buku.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BukuList;
