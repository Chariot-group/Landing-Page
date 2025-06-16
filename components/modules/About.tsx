export function About() {
    return (
        <section className="container px-6 w-full mx-auto mt-20 mb-20" id="about">
            <h3 className="text-3xl ">{"À Propos"}</h3>
            <div className="flex flex-col gap-5 mt-6 text-lg">
                <p className="font-medium">Vous en avez marre de jongler entre différents outils pour organiser vos campagnes ?</p>
                <div className="flex flex-col gap-2">
                    <p>Découvrez CHARIOT, votre nouvel outil de gestion unique pour maître du jeu. Vivez vos campagnes plus intensément grâce à la centralisation des fonctionnalités nécessaires au bon déroulement de celles-ci.</p>
                    <p>Grâce à son interface intuitive, CHARIOT vous permet de gérer les personnages, joueurs ou non, d'accéder à leurs statistiques, d'organiser les groupes et les combats d'un simple mouvement, d'optimiser les combats avec l'initiave tracker, et de sauvegarder simplement les PV des personnages pendant et après un combat.</p>
                </div>
            </div>
        </section>
    );
}