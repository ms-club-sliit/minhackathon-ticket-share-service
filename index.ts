import express from "express";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4200;

app.set("view engine", "pug");

app.get("/teams/ticket/:id", async (req, res) => {
    try{
        let id = req.params.id;

        if(id.trim().length === 0) {
            res.sendStatus(400);
            return;
        }
        
        let docRef = doc(db, "teams", id);
        let docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            res.sendStatus(404);
            return;
        }

        res.render("ticket", {
            image_src: docSnap.get("url"),
            team_name: docSnap.get("team_name"),
        });
    }catch(e){
        res.sendStatus(500);
    }
})

app.get("/awareness-session/ticket/:id", async (req, res) => {
    try{
        let id = req.params.id;

        if(id.trim().length === 0) {
            res.sendStatus(400);
            return;
        }
        
        let docRef = doc(db, "awareness_session", id);
        let docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            res.sendStatus(404);
            return;
        }

        res.render("awareness", {
            image_src: docSnap.get("url"),
        });
    }catch(e){
        res.sendStatus(500);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})