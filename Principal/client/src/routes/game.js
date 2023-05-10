import React from 'react';

class PhaserButton extends React.Component {
    handleClick = (jeu) => {
        let jeuPath = '';
        if (jeu === 'MINEBATTLE') {
            jeuPath = './Jeux/Mon_jeu.txt';
        }else if (jeu === 'HROOB') {
            jeuPath = './Jeux/Hroob_multi.txt';
        }
        else if (jeu === 'MINEBATTLE_ONLINE') {
            jeuPath = 'http://localhost:5004/';
        }else if (jeu === 'HARAGA') {
            jeuPath = 'http://localhost:5005/';
        }
        const newWindow = window.open(jeuPath, 'PhaserWindow', 'width=1200,height=1000');
        if (jeu === 'bagnoles') {
            newWindow.location.href = jeuPath;
        } else {
            fetch(jeuPath)
                .then(response => response.text())
                .then(htmlContent => {
                    newWindow.document.write(htmlContent); 
                    newWindow.document.close();
                })
                .catch(error => { 
                    console.error(`Erreur lors du chargement du fichier : ${error}`);
                });
        }
    };

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgb(255, 192, 203)',
                    borderRadius: '20px',
                    border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '30%',
                    width: '20%',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}
            >
                
                <button
                    onClick={() => this.handleClick('HARAGA')}
                    onMouseEnter={(event) => event.target.style.backgroundColor = 'rgb(255, 218, 227)'}
                    onMouseLeave={(event) => event.target.style.backgroundColor = 'rgb(255, 192, 203)'}
                >
                    Jouer à Haraga Online
                </button>
                <button
                    onClick={() => this.handleClick('HROOB')}
                    onMouseEnter={(event) => event.target.style.backgroundColor = 'rgb(255, 218, 227)'}
                    onMouseLeave={(event) => event.target.style.backgroundColor = 'rgb(255, 192, 203)'}
                >
                    Jouer à Hroob
                </button>
                <button
                    onClick={() => this.handleClick('MINEBATTLE')}
                    onMouseEnter={(event) => event.target.style.backgroundColor = 'rgb(255, 218, 227)'}
                    onMouseLeave={(event) => event.target.style.backgroundColor = 'rgb(255, 192, 203)'}
                >
                    Jouer à MineBattle
                </button>
                <button
                    onClick={() => this.handleClick('MINEBATTLE_ONLINE')}
                    onMouseEnter={(event) => event.target.style.backgroundColor = 'rgb(255, 218, 227)'}
                    onMouseLeave={(event) => event.target.style.backgroundColor = 'rgb(255, 192, 203)'}
                >
                    Jouer à MineBattle ONLINE 
                </button>
                
            </div>
        );
    }
}

export default PhaserButton;