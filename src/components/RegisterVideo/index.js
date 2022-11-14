import React from "react";
import { StyledRegisterVideo } from "./style";
import {createClient } from "@supabase/supabase-js"

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
                const value = evento.target.value;
                const name = evento.target.name;
                setValues({
                    ...values,
                    [name]: value,
                });
            },
            clearForm() {
                setValues({});
            }
    };
}
const PROJECT_URL = "https://athfohbzhaxkpeinthan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0aGZvaGJ6aGF4a3BlaW50aGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODE5NjMsImV4cCI6MTk4Mzg1Nzk2M30.DkAPQMir2hCHKOGeVtMi2ZDEu-Fesgc-mqbCrJNl0d8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        supabase.from("TbNTube").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((oqueveio) => {
                           console.log(oqueveio);
                        })
                        .catch((err) => {
                           console.log(err);
                        })

                        setFormVisivel(false)
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input placeholder="Titulo do video" 
                            name="titulo"
                            value={formCadastro.values.titulo} onChange={formCadastro.handleChange}  />
                            <input placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}  
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                    )
                :null}
        </StyledRegisterVideo>
    )
}