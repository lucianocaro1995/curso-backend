//Esto lo tenía en app.js
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    const user = {
        nombre: "Maria",
        cargo: "Tutor"
    }

    const cursos = [
        { numCurso: 123, dia: "S", horario: "Mañana" },
        { numCurso: 456, dia: "MyJ", horario: "Tarde" },
        { numCurso: 789, dia: "LyM", horario: "Noche" }
    ]
    res.render('home', {
        user: user,
        css: "home.css",
        title: "Home",
        esTutor: user.cargo === "Tutor",
        cursos: cursos
    });
})

export default router;