export default function About() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center text-white bg-gray-900">
            <h1 className="text-4xl font-bold mb-8">A propos</h1>
            <div className="max-w-2xl">
                <p className="text-xl mb-4">
                    Ce site a été réalisé dans le cadre de l'UE Lifprojet :{" "}
                    <a
                        href="http://cazabetremy.fr/wiki/doku.php?id=projet:presentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Site web de l'U.E.
                    </a>
                </p>
                <p className="text-xl">
                    Il a été réalisé par : Abdeldjallil Benziane, Hamani Ilyess,
                    Temirboulatov Koureich et Rezaoui Yanis.
                </p>
                <p>
                    Ce site a été réalisé avec le stack MERN (MANGO, EXPRESS, REACT, NODEJS) et utilise les technologies suivantes :{' '}
                    <a
                        href="https://tailwindcss.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-200"
                    > Tailwind CSS ,
                    </a>{' '}
                    <a
                        href="https://phaser.io/phaser3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-200"
                    >
                        Phaser 3 ,
                    </a>{' '}
                    <a
                        href="https://socket.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-200"
                    >
                        Socket.io
                    </a>{' '}
                </p>
                <p>
                    Icons by{' '}
                    <a
                        href="https://heroicons.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-200"
                    >
                        Heroicons
                    </a>{' '}
                    and{' '}
                    <a
                        href="https://react-icons.github.io/react-icons/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-gray-200"
                    >
                        React Icons
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
