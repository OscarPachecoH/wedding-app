const generarCURP = (nombre, apellidoP, apellidoM, fechaN) => {
    
    if(!nombre || !apellidoP || !apellidoM || !fechaN) return '';
    
    const fecha = new Date(fechaN);

    const yy = fecha.getFullYear().toString().slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, 0);
    const dd = String(fecha.getDate() + 1).padStart(2, 0);

    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return (
        apellidoP.slice(0, 2) + apellidoM.slice(0, 1) + nombre.slice(0, 1) + yy + mm + dd + random
    ).toUpperCase();
}

export default generarCURP;