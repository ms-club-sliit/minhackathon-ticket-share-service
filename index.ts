import express from "express";
import { collection, doc, getDoc, where, query, getDocs } from "firebase/firestore";
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
        
        let teamsRef = collection(db, "teams");
        let q = query(teamsRef, where("number", "==", parseInt(id)));
        let querySnap = await getDocs(q);

        if(querySnap.empty){
            res.sendStatus(404);
            return;
        }

        let doc = querySnap.docs[0];
        
        res.render("ticket", {
            image_src: doc.get("ticket_url"),
            team_name: doc.get("team_name"),
        });
    }catch(e){
        console.error(e);
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
        
        let teamsRef = collection(db, "awareness_session");
        let q = query(teamsRef, where("number", "==", parseInt(id)));
        let querySnap = await getDocs(q);

        if(querySnap.empty){
            res.sendStatus(404);
            return;
        }

        let doc = querySnap.docs[0];
        
        res.render("awareness", {
            image_src: doc.get("ticket_url"),
        });
    }catch(e){
        res.sendStatus(500);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})