import React from "react";
import config from "../config.json";
import styled from "styled-components";
// import { CSSReset} from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

// Para poder quebrar a linha do return é necessário acrescentar o parenteses
function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});
 
    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => { 
                console.log(dados.data);
                // forma imutavel
                const novasPlaylists  = {...playlists};
                dados.data.forEach((TbNTube) => {
                    if(!novasPlaylists[TbNTube.playlist]) novasPlaylists[TbNTube.playlist]  = [];
                    
                    novasPlaylists[TbNTube.playlist].push(TbNTube);
                })
                setPlaylists(novasPlaylists)
            });
    }, []);

    console.log("Playlists Pronto", playlists);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                {/* Prop Driling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }
const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        
        width: 80px;
        height:80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image:url(${({ bg }) =>  bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />

            <section className="user-info">
                <img src={`http://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}


function Timeline({searchValue, ...propriedades}) {
    // console.log("Dentro do componente", propriedade.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}    
                        </div>
                        </h2>
                    </section>
                )
            })
            }
        </StyledTimeline>
    )
}